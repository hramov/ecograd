package ports

import "github.com/hramov/gin_ecograd/domains/dto"

type FeedbackEntityPort interface {
	Get() ([]*dto.FeedbackDto, error)
	GetById(id uint64) (*dto.FeedbackDto, error)
	Create(feedbackDto *dto.FeedbackDto) (*dto.FeedbackDto, error)
}
