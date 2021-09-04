package framework

import (
	gin "github.com/gin-gonic/gin"
	controller "github.com/hramov/gin_ecograd/modules/framework/gin/controllers"
)

func Register(router *gin.Engine) {

	orderController := controller.OrderController{}
	userController := controller.UserController{}
	feedbackController := controller.FeedbackController{}
	telegramController := controller.TelegramController{}
	apiController := controller.ApiController{}

	auth := router.Group("/auth")
	{
		auth.GET("/users", userController.Get)
		auth.POST("/login", userController.Login)
		auth.POST("/register", userController.Register)
		auth.GET("/check-jwt", userController.CheckJwt)
	}

	expert := router.Group("/experts")
	{
		expert.GET("/", userController.GetExperts)
		expert.DELETE("/:id", userController.DeleteExpert)
	}

	order := router.Group("/orders")
	{
		order.GET("/:id", orderController.GetById)
		order.POST("/unauth", orderController.CreateUnauth)
		order.GET("/", orderController.Get)
		order.POST("/", orderController.Create)
		order.GET("/client", orderController.GetByClientId)
		order.PATCH("/expert/:order_id", orderController.GetWork)
		order.PATCH("/upload/:id", orderController.UploadDocs)
		order.PATCH("/delete/:id", orderController.DeleteDocs)
		// order.PATCH("/:id", orderController.AssingToClient)
	}

	feedback := router.Group("/feedback")
	{
		feedback.POST("/", feedbackController.Create)
		feedback.GET("/", feedbackController.Get)
		feedback.GET("/:id", feedbackController.GetById)
		// feedback.DELETE("/:id", feedbackController.Delete)
	}

	telegram := router.Group("/telegram")
	{
		telegram.GET("/auth", telegramController.Auth)
		telegram.GET("/news", telegramController.GetNews)
	}

	api := router.Group("/api")
	{
		api.POST("/", apiController.StoreData)
	}
}
