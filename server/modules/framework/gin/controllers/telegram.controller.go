package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type TelegramController struct{}

func (tc *TelegramController) Auth(c *gin.Context) {}

func (tc *TelegramController) GetNews(c *gin.Context) {
	var telegramEntity ports.TelegramEntityPort
	container.NamedResolve(&telegramEntity, "TelegramEntity")

	news, err := telegramEntity.GetNews()
	if err != nil {
		log.Println(err.Error())
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	c.JSON(200, news)
}
