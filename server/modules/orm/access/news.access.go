package access

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	mapper "github.com/hramov/gin_ecograd/modules/orm/mappers"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
	"gorm.io/gorm"
)

type NewsAccess struct {
	SingleNews *model.News
	News       []*model.News
	DB         *gorm.DB
}

func (na *NewsAccess) Create(newsDto []*dto.NewsDto) (bool, error) {
	for _, news := range newsDto {
		news.Seen = false
		nm := mapper.NewsMapper{Dto: *news}
		newsModel := nm.DtoToModel()
		na.DB.Create(newsModel)
	}
	return true, nil
}

func (na *NewsAccess) GetUnseen() ([]*dto.NewsDto, error) {
	na.News = nil
	na.DB.Find(&na.News)
	var news []*dto.NewsDto

	for _, singleNews := range na.News {
		if singleNews.Seen == false {
			singleNews.Seen = true
			nm := mapper.NewsMapper{Model: *singleNews}
			news = append(news, nm.ModelToDto())
		}
	}
	return news, nil
}
