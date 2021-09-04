package controller

import (
	"encoding/json"
	"io/ioutil"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/dto"
	entity "github.com/hramov/gin_ecograd/domains/entities"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type FeedbackController struct{}

func (fc *FeedbackController) Create(c *gin.Context) {

	var feedbackEntity ports.FeedbackEntityPort
	container.NamedResolve(&feedbackEntity, "FeedbackEntity")

	feedbackData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	feedbackDto := dto.FeedbackDto{}
	err = json.Unmarshal(feedbackData, &feedbackDto)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}

	data, err := feedbackEntity.Create(&feedbackDto)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": data, "error": err})
}

func (fc *FeedbackController) Get(c *gin.Context) {
	var feedbackEntity entity.FeedbackEntity
	container.NamedResolve(&feedbackEntity, "FeedbackEntity")

	data, err := feedbackEntity.Get()
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": data, "error": err})
}

func (fc *FeedbackController) GetById(c *gin.Context) {
	var feedbackEntity entity.FeedbackEntity
	container.NamedResolve(&feedbackEntity, "FeedbackEntity")

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	data, err := feedbackEntity.GetById(id)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": data, "error": err})
}
