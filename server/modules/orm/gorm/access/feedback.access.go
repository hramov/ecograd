package access

import (
	"fmt"

	"github.com/hramov/gin_ecograd/domains/dto"
	mapper "github.com/hramov/gin_ecograd/modules/orm/gorm/mappers"
	model "github.com/hramov/gin_ecograd/modules/orm/gorm/models"
	"gorm.io/gorm"
)

type FeedbackAccess struct {
	Feedback  *model.Feedback
	Feedbacks []*model.Feedback
	DB        *gorm.DB
}

func (fa *FeedbackAccess) Create(feedbackDto *dto.FeedbackDto) (*dto.FeedbackDto, error) {
	fm := mapper.FeedbackMapper{Dto: *feedbackDto}
	feedbackModel := fm.DtoToModel()
	fa.DB.Create(&feedbackModel)
	result, err := fa.GetById(feedbackModel.ID)
	if err != nil {
		return nil, fmt.Errorf("Cannot create order")
	}
	return result, nil
}

func (fa *FeedbackAccess) GetById(id uint64) (*dto.FeedbackDto, error) {
	fa.DB.First(&fa.Feedback, "id=?", id)
	fm := mapper.FeedbackMapper{Model: *fa.Feedback}
	feedbackDto := fm.ModelToDto()
	return feedbackDto, nil
}

func (fa *FeedbackAccess) Get() ([]*dto.FeedbackDto, error) {
	return nil, nil
}
