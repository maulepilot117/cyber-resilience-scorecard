package main

import (
	"log"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func sendResultEmail(email string, overallScore int, subscores []Subscore) {
	from := mail.NewEmail("Quiz App", "no-reply@quizapp.com")
	to := mail.NewEmail("", email)
	subject := "Your Quiz Results"
	body := "Congratulations!\n\nYour overall score is " + strconv.Itoa(overallScore) + ".\n\nSection scores:\n"
	for _, ss := range subscores {
		body += ss.Name + ": " + strconv.Itoa(ss.Score) + "\n"
	}
	body += "Visit our site for more details."
	content := mail.NewContent("text/plain", body)
	m := mail.NewV3MailInit(from, subject, to, content)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	if _, err := client.Send(m); err != nil {
		log.Printf("Failed to send email: %v", err)
	}
}

func createToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 1).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
