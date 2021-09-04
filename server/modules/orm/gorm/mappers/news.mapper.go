package mapper

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	model "github.com/hramov/gin_ecograd/modules/orm/gorm/models"
)

type NewsMapper struct {
	Dto   dto.NewsDto
	Model model.News
}

func (nm *NewsMapper) DtoToModel() *model.News {
	news := nm.Model
	news.ID = nm.Dto.ID
	news.Title = nm.Dto.Title
	news.Description = nm.Dto.Description
	news.ImageUrl = nm.Dto.ImageUrl
	news.Href = nm.Dto.Href
	news.Published = nm.Dto.Published
	return &news
}

func (nm *NewsMapper) ModelToDto() *dto.NewsDto {
	news := nm.Dto
	news.ID = nm.Model.ID
	news.Title = nm.Model.Title
	news.Description = nm.Model.Description
	news.ImageUrl = nm.Model.ImageUrl
	news.Href = nm.Model.Href
	news.Published = nm.Model.Published
	return &news
}
