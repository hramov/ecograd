package dto

type NewsDto struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageUrl    string `json:"image_url"`
	Href        string `json:"href"`
	Published   string `json:"published"`
}
