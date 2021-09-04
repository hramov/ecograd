package model

import "time"

type Feedback struct {
	ID        uint64    `gorm:"primary_key, AUTO_INCREMENT"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}
