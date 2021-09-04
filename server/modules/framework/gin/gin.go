package framework

import (
	"fmt"
	"log"
	"os"

	// "github.com/gin-contrib/cors"

	gin "github.com/gin-gonic/gin"
	middleware "github.com/hramov/gin_ecograd/modules/framework/gin/middlewares"
)

type Gin struct{}

func (g *Gin) Start() {

	router := gin.Default()
	router.Static("/uploads", "./uploads")
	router.Use(middleware.CORSMiddleware())

	Register(router)

	err := router.Run(fmt.Sprintf(":%s", os.Getenv("APP_PORT")))
	if err != nil {
		log.Fatal(err)
	}

}
