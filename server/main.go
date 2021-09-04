package main

import (
	"log"

	"github.com/hramov/gin_ecograd/domains/gates"
	gin "github.com/hramov/gin_ecograd/modules/framework/gin"
	"github.com/hramov/gin_ecograd/modules/ioc"
	orm "github.com/hramov/gin_ecograd/modules/orm/gorm"
	"github.com/joho/godotenv"
)

//Entry point of the app
func main() {

	godotenv.Load()

	var orm gates.IOrm = &orm.Gorm{}
	orm.Connect()
	orm.Migrate()

	if err := ioc.Register(orm.GetConnection()); err != nil {
		log.Fatal("Cannot use IoC container!")
	}

	var gin gates.FrameworkGate = &gin.Gin{}
	gin.Start()
}
