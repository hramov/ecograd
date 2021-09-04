package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type TelegramProvider interface {
	GetNews() ([]*dto.NewsDto, error)
	Auth()
}
