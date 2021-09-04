package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type TelegramEntityPort interface {
	GetNews() ([]*dto.NewsDto, error)
	Auth()
}
