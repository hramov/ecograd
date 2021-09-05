package access

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	mapper "github.com/hramov/gin_ecograd/modules/orm/mappers"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
	"gorm.io/gorm"
)

type TelegramAccess struct {
	SingleNews *model.News
	News       []*model.News
	DB         *gorm.DB
}

func (ta *TelegramAccess) Auth() {}
func (ta *TelegramAccess) GetNews() ([]*dto.NewsDto, error) {
	var newsDto []*dto.NewsDto
	ta.DB.Find(&ta.News)
	for i := 0; i < len(ta.News); i++ {
		nm := mapper.NewsMapper{Model: *ta.News[i]}
		newsDto = append(newsDto, nm.ModelToDto())
	}
	return newsDto, nil
}
