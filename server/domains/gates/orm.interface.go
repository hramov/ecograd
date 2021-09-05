package gates

import "gorm.io/gorm"

type DBConnection = *gorm.DB

type IOrm interface {
	Connect()
	GetConnection() *gorm.DB
	Migrate() error
}
