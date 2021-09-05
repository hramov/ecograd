package ports

import (
	"github.com/hramov/gin_ecograd/domains/dto"
)

type NewsEntityPort interface {
	Store([]*dto.NewsDto) (bool, error)
	GetUnseen() ([]*dto.NewsDto, error)
}
