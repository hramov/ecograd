package dto

import "time"

type NewsDto struct {
	ID        uint64    `gorm:"primary_key, AUTO_INCREMENT"`
	Title     string    `json:"title"`
	Desc      string    `json:"description"`
	Href      string    `json:"href"`
	Published time.Time `json:"published"`
}
