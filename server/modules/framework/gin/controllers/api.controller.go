package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
	"github.com/hramov/gin_ecograd/domains/dto"
)

type ApiController struct{}

func (ac *ApiController) StoreData(c *gin.Context) {
	newsData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}

	newsDto := []dto.NewsDto{}
	err = json.Unmarshal(newsData, &newsDto)

	fmt.Println(newsDto)
}
