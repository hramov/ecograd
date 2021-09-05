package access

import (
	"fmt"

	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/jwt"
	mapper "github.com/hramov/gin_ecograd/modules/orm/mappers"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
	"gorm.io/gorm"
)

type UserAccess struct {
	User  *model.User
	Users []*model.User
	DB    *gorm.DB
}

type LoginDto struct {
	Email    string
	Password string
}

func (ua *UserAccess) Get() ([]*dto.RegisterDto, error) {
	ua.User = nil
	var users []*dto.RegisterDto
	ua.DB.Preload("Orders").Preload("Works").Find(&ua.Users)
	for i := 0; i < len(ua.Users); i++ {
		um := mapper.UserMapper{Model: *ua.Users[i]}
		users = append(users, um.ModelToDto())
	}
	return users, nil
}

func (ua *UserAccess) GetById(id uint64) (*dto.RegisterDto, error) {
	ua.User = nil
	ua.DB.Preload("Orders").Preload("Works").First(&ua.User, "id=?", id)
	um := mapper.UserMapper{Model: *ua.User}
	return um.ModelToDto(), nil
}

func (ua *UserAccess) Create(user *dto.RegisterDto) (*dto.RegisterDto, error) {
	ua.User = nil
	user.Password, _ = jwt.HashPassword(user.Password)
	um := mapper.UserMapper{Dto: *user}
	userModel := um.DtoToModel()
	ua.DB.Create(&userModel)
	result, err := ua.GetById(userModel.ID)
	if err != nil {
		return nil, fmt.Errorf("Cannot create user")
	}
	return result, nil
}

func (ua *UserAccess) GetByEmail(email string) (*dto.RegisterDto, error) {
	ua.User = nil
	ua.DB.Preload("Orders").Preload("Works").First(&ua.User, "email=?", email)
	if ua.User.ID == 0 {
		return nil, fmt.Errorf("Cannot find the user with email %s", email)
	}
	um := mapper.UserMapper{Model: *ua.User}
	return um.ModelToDto(), nil
}

func (ua *UserAccess) IsUser(email string) bool {
	ua.User = nil
	ua.DB.Where("email = ?", email).Preload("Orders").Preload("Works").First(&ua.User)
	if ua.User.ID == 0 {
		return false
	}
	return true
}

func (ua *UserAccess) GetRole(role string) ([]*dto.RegisterDto, error) {
	var users []*dto.RegisterDto
	ua.DB.Where("role = ?", role).Preload("Orders").Preload("Works").Find(&ua.Users)
	for i := 0; i < len(ua.Users); i++ {
		um := mapper.UserMapper{Model: *ua.Users[i]}
		users = append(users, um.ModelToDto())
	}
	return users, nil
}

func (ua *UserAccess) Delete(id uint64) (*dto.RegisterDto, error) {
	user, err := ua.GetById(id)
	if err != nil {
		return nil, err
	}

	if user.ID > 0 {
		ua.DB.Delete(&ua.User, "id=?", id)
		return user, nil
	}

	return nil, fmt.Errorf("User with id %d not found", id)

}
