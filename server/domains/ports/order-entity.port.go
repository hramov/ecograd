package ports

import (
	"mime/multipart"

	"github.com/hramov/gin_ecograd/domains/dto"
)

type OrderEntityPort interface {
	Get() ([]*dto.OrderDto, error)
	GetByID(id uint64) (*dto.OrderDto, error)
	GetByExpertID(id uint64) ([]*dto.OrderDto, error)
	GetByClientID(id uint64) ([]*dto.OrderDto, error)
	Create(*dto.OrderDto) (*dto.OrderDto, error)
	CreateOrderUnauthorized(ordeUnauthDto *dto.OrderUnauthDto) (string, *dto.RegisterDto, *dto.OrderDto, error)
	AssignToExpert(id, expert_id uint64) (*dto.OrderDto, error)
	UploadDocs(id uint64, address string, form *multipart.Form) (*dto.OrderDto, error)
	DeleteDocs(id uint64) (*dto.OrderDto, error)
	// Delete(id uint64) (*dto.OrderDto, error)
}
