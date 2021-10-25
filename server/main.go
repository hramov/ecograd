package main

import (
	"log"

	"github.com/hramov/gin_ecograd/domains/gates"
	gin "github.com/hramov/gin_ecograd/modules/framework/gin"
	"github.com/hramov/gin_ecograd/modules/ioc"
	orm "github.com/hramov/gin_ecograd/modules/orm"
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

	// rabbitReceiver := queue.RabbitReceiver{}
	// rabbitReceiver = rabbitReceiver.Connect()
	// go rabbitReceiver.Receive("news")

	var gin gates.FrameworkGate = &gin.Gin{}
	gin.Start()
}
