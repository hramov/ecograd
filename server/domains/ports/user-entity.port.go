package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type UserEntityPort interface {
	Register(registerDto *dto.RegisterDto) (*dto.RegisterDto, string, error)
	Login(loginDto *dto.LoginDto) (*dto.RegisterDto, string, error)
	GetById(id uint64) (*dto.RegisterDto, error)
	Get() ([]*dto.RegisterDto, error)
	CheckJwt(token string) (bool, error)
	GetExperts() ([]*dto.RegisterDto, error)
	DeleteExpert(id uint64) (*dto.RegisterDto, error)
	// Update(updateDto *dto.UpdateDto) (*dto.RegisterDto, error)
}
