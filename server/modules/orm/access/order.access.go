package access

import (
	"fmt"

	"github.com/hramov/gin_ecograd/domains/dto"
	mapper "github.com/hramov/gin_ecograd/modules/orm/mappers"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
	"gorm.io/gorm"
)

type OrderAccess struct {
	Order  *model.Order
	Orders []*model.Order
	DB     *gorm.DB
}

func (os *OrderAccess) Get() ([]*dto.OrderDto, error) {
	os.Order = nil
	var orders []*dto.OrderDto
	os.DB.Preload("Client").Preload("Expert").Find(&os.Orders)
	for i := 0; i < len(os.Orders); i++ {
		um := mapper.OrderMapper{Model: *os.Orders[i]}
		orders = append(orders, um.ModelToDto())
	}
	return orders, nil
}

func (os *OrderAccess) GetById(id uint64) (*dto.OrderDto, error) {
	os.Order = nil
	os.DB.Preload("Client").Preload("Expert").First(&os.Order, "id=?", id)

	if os.Order.ID == 0 {
		return nil, fmt.Errorf("Order not found")
	}
	om := mapper.OrderMapper{Model: *os.Order}
	return om.ModelToDto(), nil
}

func (os *OrderAccess) GetByClientID(id uint64) ([]*dto.OrderDto, error) {
	var orders []*dto.OrderDto
	os.DB.Preload("Client").Preload("Expert").Find(&os.Orders, "client_id=?", id)
	for i := 0; i < len(os.Orders); i++ {
		um := mapper.OrderMapper{Model: *os.Orders[i]}
		orders = append(orders, um.ModelToDto())
	}
	return orders, nil
}

func (os *OrderAccess) GetByExpertID(id uint64) ([]*dto.OrderDto, error) {
	var orders []*dto.OrderDto
	os.DB.Preload("Client").Preload("Expert").Find(&os.Orders, "expert_id=?", id)
	for i := 0; i < len(os.Orders); i++ {
		um := mapper.OrderMapper{Model: *os.Orders[i]}
		orders = append(orders, um.ModelToDto())
	}
	return orders, nil
}

func (os *OrderAccess) Create(order *dto.OrderDto) (*dto.OrderDto, error) {
	om := mapper.OrderMapper{Dto: *order}
	orderModel := om.DtoToModel()
	os.DB.Create(&orderModel)
	result, err := os.GetById(orderModel.ID)
	if err != nil {
		return nil, fmt.Errorf("Cannot create order")
	}
	return result, nil
}

func (os *OrderAccess) Save(order *dto.OrderDto) (*dto.OrderDto, error) {
	om := mapper.OrderMapper{Dto: *order}
	orderModel := om.DtoToModel()
	os.DB.Save(orderModel)
	return order, nil
}
