package main

import (
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
)

var db *pgx.Conn

func main() {
	// Connect to PostgreSQL
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())
	db = conn

	// Set up Gin router
	r := gin.Default()

	// Define routes
	r.POST("/start", startQuiz)
	r.POST("/submit", AuthMiddleware(), submitQuiz)

	// Start server
	r.Run(":8080")
}
