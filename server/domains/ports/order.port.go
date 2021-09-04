package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type OrderProvider interface {
	Get() ([]*dto.OrderDto, error)
	GetById(id uint64) (*dto.OrderDto, error)
	Create(data *dto.OrderDto) (*dto.OrderDto, error)
	Save(order *dto.OrderDto) (*dto.OrderDto, error)
	GetByExpertID(id uint64) ([]*dto.OrderDto, error)
	GetByClientID(id uint64) ([]*dto.OrderDto, error)
	// Delete(id uint64) (*dto.OrderDto, error)
}
