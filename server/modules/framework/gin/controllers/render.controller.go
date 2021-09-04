package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type RenderController struct{}

func (rc *RenderController) VueRenderer(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}
