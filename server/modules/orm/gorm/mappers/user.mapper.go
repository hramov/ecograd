package mapper

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	model "github.com/hramov/gin_ecograd/modules/orm/gorm/models"
)

type UserMapper struct {
	Dto   dto.RegisterDto
	Model model.User
}

func (um *UserMapper) DtoToModel() *model.User {
	user := um.Model
	user.ID = um.Dto.ID
	user.LastName = um.Dto.LastName
	user.Name = um.Dto.Name
	user.SecondName = um.Dto.SecondName
	user.BirthDate = um.Dto.BirthDate
	user.Email = um.Dto.Email
	user.Password = um.Dto.Password
	user.Phone = um.Dto.Phone
	user.Role = um.Dto.Role
	user.Position = um.Dto.Position
	user.ImageUrl = um.Dto.ImageUrl
	user.Cert = um.Dto.Cert
	user.Directions = um.Dto.Directions
	user.Misc = um.Dto.Misc
	user.Orders = um.Dto.Orders
	user.Works = um.Dto.Works
	return &user
}

func (um *UserMapper) ModelToDto() *dto.RegisterDto {
	user := um.Dto
	user.ID = um.Model.ID
	user.LastName = um.Model.LastName
	user.Name = um.Model.Name
	user.SecondName = um.Model.SecondName
	user.BirthDate = um.Model.BirthDate
	user.Email = um.Model.Email
	user.Password = um.Model.Password
	user.Phone = um.Model.Phone
	user.Role = um.Model.Role
	user.Position = um.Model.Position
	user.ImageUrl = um.Model.ImageUrl
	user.Cert = um.Model.Cert
	user.Directions = um.Model.Directions
	user.Misc = um.Model.Misc
	user.Orders = um.Model.Orders
	user.Works = um.Model.Works
	return &user
}
