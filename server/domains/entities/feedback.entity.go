package entity

import (
	"time"

	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type FeedbackEntity struct {
	Provider ports.FeedbackProvider
}

func (fe *FeedbackEntity) Create(feedbackDto *dto.FeedbackDto) (*dto.FeedbackDto, error) {
	feedbackDto.CreatedAt = time.Now()
	order, err := fe.Provider.Create(feedbackDto)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (fe *FeedbackEntity) Get() ([]*dto.FeedbackDto, error) {
	orders, err := fe.Provider.Get()
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (fe *FeedbackEntity) GetById(id uint64) (*dto.FeedbackDto, error) {
	//validation
	//
	order, err := fe.Provider.GetById(id)
	if err != nil {
		return nil, err
	}
	return order, nil
}
