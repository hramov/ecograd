package orm

import (
	"fmt"
	"os"

	model "github.com/hramov/gin_ecograd/modules/orm/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Gorm struct{}

var DB *gorm.DB = nil

func (o *Gorm) Connect() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"), os.Getenv("DB_SSL_MODE"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	}
	DB = db
}

func (o *Gorm) GetConnection() *gorm.DB {
	return DB
}

func (o *Gorm) Migrate() error {
	err := DB.AutoMigrate(&model.User{})
	err = DB.AutoMigrate(&model.Order{})
	err = DB.AutoMigrate(&model.Feedback{})
	err = DB.AutoMigrate(&model.News{})
	return err
}
