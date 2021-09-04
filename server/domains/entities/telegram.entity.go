package entity

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type TelegramEntity struct {
	Provider ports.TelegramProvider
}

func (te *TelegramEntity) Auth() {}
func (te *TelegramEntity) GetNews() ([]*dto.NewsDto, error) {
	news, err := te.Provider.GetNews()
	return news, err
}
