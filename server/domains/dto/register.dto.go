package dto

import model "github.com/hramov/gin_ecograd/modules/orm/gorm/models"

type RegisterDto struct {
	ID         uint64 `json:"id"`
	LastName   string `json:"last_name"`
	Name       string `json:"name"`
	SecondName string `json:"second_name"`
	BirthDate  string `json:"birth_date"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Phone      string `json:"phone"`
	Role       string `json:"role"`
	Position   string `json:"position"`
	ImageUrl   string `json:"image_url"`
	Cert       string `json:"cert"`
	Directions string `json:"directions"`
	Misc       string `json:"misc"`
	Orders     []*model.Order
	Works      []*model.Order
}
