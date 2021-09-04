package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type FeedbackProvider interface {
	Create(feedbackDto *dto.FeedbackDto) (*dto.FeedbackDto, error)
	GetById(id uint64) (*dto.FeedbackDto, error)
	Get() ([]*dto.FeedbackDto, error)
}
