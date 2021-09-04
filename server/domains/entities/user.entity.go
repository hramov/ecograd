package entity

import (
	"fmt"

	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/jwt"
	"github.com/hramov/gin_ecograd/domains/ports"
	validator "github.com/hramov/gin_ecograd/domains/validators"
)

type UserEntity struct {
	Provider ports.UserProvider
}

func (ue *UserEntity) Register(registerDto *dto.RegisterDto) (*dto.RegisterDto, string, error) {

	registerValidator := validator.RegisterValidator{RegisterDto: registerDto}
	err := registerValidator.Validate()
	if err != nil {
		fmt.Println(err.Error())
		return nil, "", err
	}

	isUser := ue.Provider.IsUser(registerDto.Email)
	if isUser == true {
		fmt.Printf("User with email %s is already registered", registerDto.Email)
		return nil, "", fmt.Errorf("User with email %s is already registered", registerDto.Email)
	}

	user, err := ue.Provider.Create(registerDto)
	if err != nil {
		fmt.Println(err.Error())
		return nil, "", err
	}

	token, err := jwt.CreateToken(user.ID, user.Role)
	if err != nil {
		fmt.Println(err.Error())
		return nil, "", err
	}
	return user, token, nil
}

func (ue *UserEntity) Login(loginDto *dto.LoginDto) (*dto.RegisterDto, string, error) {

	loginValidator := validator.LoginValidator{LoginDto: loginDto}
	err := loginValidator.Validate()
	if err != nil {
		return nil, "", err
	}

	user, err := ue.Provider.GetByEmail(loginDto.Email)
	if err != nil {
		return nil, "", err
	}

	err = jwt.CheckPasswordHash(user.Password, loginDto.Password)
	if err != nil {
		return nil, "", err
	}
	token, err := jwt.CreateToken(user.ID, user.Role)
	if err != nil {
		return nil, "", err
	}
	return user, token, nil
}

func (ue *UserEntity) GetById(id uint64) (*dto.RegisterDto, error) {
	user, err := ue.Provider.GetById(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (ue *UserEntity) Get() ([]*dto.RegisterDto, error) {
	users, err := ue.Provider.Get()
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (ue *UserEntity) CheckJwt(token string) (bool, error) {
	status, err := jwt.CheckJwt(token, "admin")
	if err != nil {
		return false, err
	}
	return status, err
}

func (ue *UserEntity) GetExperts() ([]*dto.RegisterDto, error) {
	experts, err := ue.Provider.GetRole("expert")
	if err != nil {
		return nil, err
	}
	return experts, nil
}

func (ue *UserEntity) DeleteExpert(id uint64) (*dto.RegisterDto, error) {
	expert, err := ue.Provider.Delete(id)
	if err != nil {
		return nil, err
	}
	return expert, nil
}
