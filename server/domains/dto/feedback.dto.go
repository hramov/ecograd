package dto

import "time"

type FeedbackDto struct {
	ID        uint64
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Text      string    `json:"text"`
	CreatedAt time.Time `json:"created_at"`
}
