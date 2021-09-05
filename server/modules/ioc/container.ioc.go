package ioc

import (
	"log"

	"github.com/golobby/container/v3"
	entity "github.com/hramov/gin_ecograd/domains/entities"
	"github.com/hramov/gin_ecograd/domains/ports"
	"github.com/hramov/gin_ecograd/modules/orm/access"
	"github.com/hramov/gin_ecograd/modules/queue"
	"gorm.io/gorm"
)

func Register(connection *gorm.DB) error {

	log.Println("Started IoC container!")

	err := container.NamedSingleton("NewsEntity", func() ports.NewsEntityPort {

		sender := queue.RabbitSender{}
		sender = sender.Connect()

		return &entity.NewsEntity{
			Provider: &access.NewsAccess{
				DB: connection,
			},
			QueueSender: &sender,
		}
	})

	err = container.NamedSingleton("OrderEntity", func() ports.OrderEntityPort {
		return &entity.OrderEntity{
			Provider: &access.OrderAccess{
				DB: connection,
			}}
	})

	err = container.NamedSingleton("UserEntity", func() ports.UserEntityPort {
		return &entity.UserEntity{
			Provider: &access.UserAccess{
				DB: connection,
			}}
	})

	err = container.NamedSingleton("FeedbackEntity", func() ports.FeedbackEntityPort {
		return &entity.FeedbackEntity{
			Provider: &access.FeedbackAccess{
				DB: connection,
			}}
	})

	err = container.NamedSingleton("TelegramEntity", func() ports.TelegramEntityPort {
		return &entity.TelegramEntity{
			Provider: &access.TelegramAccess{
				DB: connection,
			}}
	})

	if err != nil {
		return err
	}
	return nil
}
