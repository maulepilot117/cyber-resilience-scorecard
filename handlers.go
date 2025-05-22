package main

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func startQuiz(c *gin.Context) {
	email := c.PostForm("email")
	var userID int
	err := db.QueryRow(context.Background(),
		"INSERT INTO users (email) VALUES ($1) RETURNING id", email).Scan(&userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	sections, err := getQuizSections()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch quiz structure"})
		return
	}

	token, err := createToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":    token,
		"sections": sections,
	})
}

type SubmitRequest struct {
	Responses []struct {
		QuestionID int `json:"question_id"`
		OptionID   int `json:"option_id"`
	} `json:"responses"`
}

func submitQuiz(c *gin.Context) {
	userID := c.GetInt("userID")
	var input SubmitRequest
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	tx, err := db.Begin(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}
	defer tx.Rollback(context.Background())

	// Check if already completed
	var completedAt *time.Time
	err = tx.QueryRow(context.Background(),
		"SELECT completed_at FROM users WHERE id = $1", userID).Scan(&completedAt)
	if err != nil || completedAt != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Quiz already completed"})
		return
	}

	// Store responses
	for _, resp := range input.Responses {
		_, err = tx.Exec(context.Background(),
			"INSERT INTO responses (user_id, question_id, option_id) VALUES ($1, $2, $3)",
			userID, resp.QuestionID, resp.OptionID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store responses"})
			return
		}
	}

	// Calculate subscores
	_, err = tx.Exec(context.Background(), `
		INSERT INTO user_section_scores (user_id, section_id, score)
		SELECT $1, q.section_id, SUM(o.score)
		FROM responses r
		JOIN questions q ON r.question_id = q.id
		JOIN options o ON r.option_id = o.id
		WHERE r.user_id = $1
		GROUP BY q.section_id
	`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate subscores"})
		return
	}

	// Calculate overall score
	var overallScore int
	err = tx.QueryRow(context.Background(),
		"SELECT SUM(score) FROM user_section_scores WHERE user_id = $1", userID).Scan(&overallScore)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate overall score"})
		return
	}

	// Update user
	_, err = tx.Exec(context.Background(),
		"UPDATE users SET overall_score = $1, completed_at = $2 WHERE id = $3",
		overallScore, time.Now(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	if err = tx.Commit(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	// Fetch subscores
	var subscores []Subscore
	rows, err := db.Query(context.Background(), `
		SELECT s.name, uss.score
		FROM user_section_scores uss
		JOIN sections s ON uss.section_id = s.id
		WHERE uss.user_id = $1
	`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch subscores"})
		return
	}
	defer rows.Close()
	for rows.Next() {
		var ss Subscore
		if err = rows.Scan(&ss.Name, &ss.Score); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan subscores"})
			return
		}
		subscores = append(subscores, ss)
	}

	// Fetch email
	var email string
	err = db.QueryRow(context.Background(),
		"SELECT email FROM users WHERE id = $1", userID).Scan(&email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch email"})
		return
	}

	go sendResultEmail(email, overallScore, subscores)
	c.JSON(http.StatusOK, gin.H{
		"overall_score": overallScore,
		"subscores":     subscores,
	})
}
