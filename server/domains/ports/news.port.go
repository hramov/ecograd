package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type NewsProvider interface {
	Create(news []*dto.NewsDto) (bool, error)
	GetUnseen() ([]*dto.NewsDto, error)
}
