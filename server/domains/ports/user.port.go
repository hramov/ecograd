package ports

import (
	"github.com/hramov/gin_ecograd/domains/dto"
)

type UserProvider interface {
	Get() ([]*dto.RegisterDto, error)
	GetById(id uint64) (*dto.RegisterDto, error)
	Create(data *dto.RegisterDto) (*dto.RegisterDto, error)
	GetByEmail(email string) (*dto.RegisterDto, error)
	GetRole(role string) ([]*dto.RegisterDto, error)
	IsUser(email string) bool
	Delete(id uint64) (*dto.RegisterDto, error)
}
