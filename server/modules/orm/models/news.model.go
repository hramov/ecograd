package model

type News struct {
	ID          uint64 `gorm:"primary_key, AUTO_INCREMENT"`
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageUrl    string `json:"image_url"`
	Href        string `gorm:"unique" json:"href"`
	Published   string `json:"published"`
	Seen        bool   `json:"seen"`
}
