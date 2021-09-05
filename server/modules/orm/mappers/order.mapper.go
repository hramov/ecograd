package mapper

import (
	"github.com/hramov/gin_ecograd/domains/dto"
	model "github.com/hramov/gin_ecograd/modules/orm/models"
)

type OrderMapper struct {
	Dto   dto.OrderDto
	Model model.Order
}

func (om *OrderMapper) DtoToModel() *model.Order {

	order := om.Model
	order.ID = om.Dto.ID
	order.Object = om.Dto.Object
	order.Object_type = om.Dto.Object_type
	order.Address = om.Dto.Address
	order.IsDocs = om.Dto.IsDocs
	order.DocsUrl = om.Dto.DocsUrl
	order.Status = om.Dto.Status
	order.CreatedAt = om.Dto.CreatedAt
	order.ClientID = om.Dto.ClientID
	order.ExpertID = om.Dto.ExpertID
	order.Client = om.Dto.Client
	order.Expert = om.Dto.Expert
	return &order
}

func (om *OrderMapper) ModelToDto() *dto.OrderDto {

	order := om.Dto
	order.ID = om.Model.ID
	order.Object = om.Model.Object
	order.Object_type = om.Model.Object_type
	order.Address = om.Model.Address
	order.IsDocs = om.Model.IsDocs
	order.DocsUrl = om.Model.DocsUrl
	order.Status = om.Model.Status
	order.CreatedAt = om.Model.CreatedAt
	order.ClientID = om.Model.ClientID
	order.ExpertID = om.Model.ExpertID
	order.Client = om.Model.Client
	order.Expert = om.Model.Expert
	return &order
}
