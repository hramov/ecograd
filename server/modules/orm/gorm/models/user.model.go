package model

type User struct {
	ID         uint64   `gorm:"primary_key, AUTO_INCREMENT"`
	LastName   string   `json:"last_name"`
	Name       string   `json:"name"`
	SecondName string   `json:"second_name"`
	BirthDate  string   `json:"birth_date"`
	Email      string   `json:"email"`
	Password   string   `json:"password"`
	Phone      string   `json:"phone"`
	Role       string   `json:"role"`
	Position   string   `json:"position"`
	ImageUrl   string   `json:"image_url"`
	Cert       string   `json:"cert"`
	Directions string   `json:"directions"`
	Misc       string   `json:"misc"`
	Works      []*Order `binding:"required" gorm:"foreignkey:ExpertID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Orders     []*Order `binding:"required" gorm:"foreignkey:ClientID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
