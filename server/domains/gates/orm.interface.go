package gates

import "gorm.io/gorm"

type IOrm interface {
	Connect()
	GetConnection() *gorm.DB
	Migrate() error
}
