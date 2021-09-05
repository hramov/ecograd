package main

import (
	"encoding/json"
	"log"
	"time"

	"github.com/hramov/gin_ecograd/domains/gates"
	gin "github.com/hramov/gin_ecograd/modules/framework/gin"
	"github.com/hramov/gin_ecograd/modules/ioc"
	orm "github.com/hramov/gin_ecograd/modules/orm"
	"github.com/hramov/gin_ecograd/modules/queue"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	var orm gates.IOrm = &orm.Gorm{}
	orm.Connect()
	orm.Migrate()

	if err := ioc.Register(orm.GetConnection()); err != nil {
		log.Fatal("Cannot use IoC container!")
	}

	rabbitSender := queue.RabbitSender{}
	rabbitSender = rabbitSender.Connect()

	rabbitReceiver := queue.RabbitReceiver{}
	rabbitReceiver = rabbitReceiver.Connect()
	go rabbitReceiver.Receive("hello")

	message, err := json.Marshal(&queue.Message{
		Queue:     "hello",
		From:      "Sender",
		To:        "Receiver",
		Body:      "Test message",
		Published: time.Now(),
	})
	if err == nil {
		for i := 0; i < 5; i++ {
			go rabbitSender.SendMessage("hello", message)
			time.Sleep(1 * time.Second)
		}
	}

	var gin gates.FrameworkGate = &gin.Gin{}
	gin.Start()
}
