package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/jwt"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type OrderController struct{}

func (oc *OrderController) Get(c *gin.Context) {

	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	data, err := orderEntity.Get()
	c.JSON(200, gin.H{"data": data, "error": err})
}

func (oc *OrderController) Create(c *gin.Context) {

	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	orderData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	orderDto := &dto.OrderDto{}
	err = json.Unmarshal(orderData, &orderDto)
	orderDto.ExpertID = nil
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	data, err := orderEntity.Create(orderDto)
	c.JSON(200, gin.H{"data": data, "error": err})
}

func (oc *OrderController) CreateUnauth(c *gin.Context) {

	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	orderData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	orderDto := &dto.OrderUnauthDto{}
	err = json.Unmarshal(orderData, &orderDto)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	token, client, order, err := orderEntity.CreateOrderUnauthorized(orderDto)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	c.JSON(200, gin.H{"data": gin.H{
		"token":  token,
		"client": client,
		"order":  order,
	}, "error": err})
}

func (oc *OrderController) GetWork(c *gin.Context) {
	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	order_id, err := strconv.ParseUint(c.Param("order_id"), 10, 64)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	token, err := jwt.GetTokenFromHeader(c.Request.Header.Get("Authorization"))
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	expert_id, err := jwt.GetIDFromJWT(token)

	order, err := orderEntity.AssignToExpert(order_id, expert_id)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	c.JSON(200, gin.H{"data": gin.H{
		"order": order,
	}, "error": err})
}

func (oc *OrderController) GetByClientId(c *gin.Context) {
	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	token, err := jwt.GetTokenFromHeader(c.Request.Header.Get("Authorization"))
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	client_role, err := jwt.GetRoleFromJWT(token)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	if client_role != "client" {
		Abort(c.AbortWithStatusJSON, fmt.Errorf("You should be a client to see this page!"))
		return
	}

	client_id, err := jwt.GetIDFromJWT(token)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	orders, err := orderEntity.GetByClientID(client_id)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	c.JSON(200, gin.H{"data": gin.H{
		"orders": orders,
	}, "error": err})
}

func (oc *OrderController) GetById(c *gin.Context) {
	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	order, err := orderEntity.GetByID(id)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	c.JSON(200, gin.H{"data": gin.H{
		"order": order,
	}, "error": err})
}

func (oc *OrderController) UploadDocs(c *gin.Context) {

	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	id, err := GetID(c)
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
	}

	form, err := c.MultipartForm()
	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
		return
	}

	address := c.Request.FormValue("address")
	order, err := orderEntity.UploadDocs(id, address, form)

	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
	}

	c.JSON(200, gin.H{"data": gin.H{
		"order": order,
	}, "error": err})
}

func (oc *OrderController) DeleteDocs(c *gin.Context) {

	var orderEntity ports.OrderEntityPort
	container.NamedResolve(&orderEntity, "OrderEntity")

	id, err := GetID(c)

	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
	}

	order, err := orderEntity.DeleteDocs(id)

	if err != nil {
		Abort(c.AbortWithStatusJSON, err)
	}

	c.JSON(200, gin.H{"data": gin.H{
		"order": order,
	}, "error": err})

}
