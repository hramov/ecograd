package entity

import (
	"encoding/json"

	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/ports"
	"github.com/hramov/gin_ecograd/modules/queue"
)

type NewsEntity struct {
	Provider    ports.NewsProvider
	QueueSender *queue.RabbitSender
}

func (ne *NewsEntity) Store(news []*dto.NewsDto) (bool, error) {
	result, err := ne.Provider.Create(news)
	if err != nil {
		return result, err
	}
	return result, nil
}

func (ne *NewsEntity) GetUnseen() ([]*dto.NewsDto, error) {

	news, err := ne.Provider.GetUnseen()
	if err != nil {
		return nil, err
	}

	data, err := json.Marshal(news)
	ne.QueueSender.SendMessage("telegram_news", data)

	return news, nil
}
