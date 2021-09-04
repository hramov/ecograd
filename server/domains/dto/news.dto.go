package dto

import "time"

type NewsDto struct {
	ID          uint64    `gorm:"primary_key, AUTO_INCREMENT"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	ImageUrl    string    `json:"image_url"`
	Href        string    `json:"href"`
	Published   time.Time `json:"published"`
}
