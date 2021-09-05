package mapper

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
)

type FeedbackMapper struct {
	Dto   dto.FeedbackDto
	Model model.Feedback
}

func (fm *FeedbackMapper) DtoToModel() *model.Feedback {
	feedback := fm.Model
	feedback.ID = fm.Dto.ID
	feedback.Name = fm.Dto.Name
	feedback.Email = fm.Dto.Email
	feedback.Message = fm.Dto.Text
	feedback.CreatedAt = fm.Dto.CreatedAt
	return &feedback
}

func (fm *FeedbackMapper) ModelToDto() *dto.FeedbackDto {
	feedback := fm.Dto
	feedback.ID = fm.Model.ID
	feedback.Name = fm.Model.Name
	feedback.Email = fm.Model.Email
	feedback.Text = fm.Model.Message
	feedback.CreatedAt = fm.Model.CreatedAt
	return &feedback
}
