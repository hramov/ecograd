package entity

import (
	"archive/zip"
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"time"

	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type OrderEntity struct {
	Provider ports.OrderProvider
}

func (oe *OrderEntity) Get() ([]*dto.OrderDto, error) {
	result, err := oe.Provider.Get()
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (oe *OrderEntity) GetByID(order_id uint64) (*dto.OrderDto, error) {
	order, err := oe.Provider.GetById(order_id)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (oe *OrderEntity) GetByClientID(id uint64) ([]*dto.OrderDto, error) {
	orders, err := oe.Provider.GetByClientID(id)
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (oe *OrderEntity) GetByExpertID(id uint64) ([]*dto.OrderDto, error) {
	orders, err := oe.Provider.GetByExpertID(id)
	if err != nil {
		return nil, err
	}
	return orders, nil
}

func (oe *OrderEntity) Create(orderDto *dto.OrderDto) (*dto.OrderDto, error) {
	// orderValidator := validator.OrderValidator{OrderDto: orderDto}
	// err := orderValidator.Validate()
	// if err != nil {
	// 	return nil, "", err
	// }

	orderDto.Status = "new"
	orderDto.CreatedAt = time.Now().UTC()
	order, err := oe.Provider.Create(orderDto)
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (oe *OrderEntity) CreateOrderUnauthorized(ordeUnauthDto *dto.OrderUnauthDto) (string, *dto.RegisterDto, *dto.OrderDto, error) {

	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	fmt.Println(ordeUnauthDto)
	var clientDto dto.RegisterDto = *ordeUnauthDto.Client
	clientDto.Password = os.Getenv("CLIENT_DEFAULT_PASSWORD")
	clientDto.Role = "client"
	client, token, err := userEntity.Register(&clientDto)
	if err != nil {
		return "", nil, nil, err
	}

	var orderDto dto.OrderDto = *ordeUnauthDto.Order
	orderDto.Status = "new"
	orderDto.ClientID = &client.ID
	orderDto.CreatedAt = time.Now().UTC()

	order, err := oe.Provider.Create(&orderDto)
	if err != nil {
		return "", nil, nil, err
	}

	client.Password = os.Getenv("CLIENT_DEFAULT_PASSWORD")
	return token, client, order, err
}

func (oe *OrderEntity) AssignToExpert(id, expert_id uint64) (*dto.OrderDto, error) {
	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	order, err := oe.Provider.GetById(id)
	if err != nil {
		return nil, err
	}

	order.ExpertID = &expert_id
	order.Status = "taken"
	order, err = oe.Provider.Save(order)
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (oe *OrderEntity) UploadDocs(id uint64, address string, form *multipart.Form) (*dto.OrderDto, error) {
	order, err := oe.GetByID(id)
	if err != nil {
		return nil, err
	}
	if order.ID != id {
		return nil, fmt.Errorf("Order with id %d not found\n", id)
	}
	filesPath := fmt.Sprintf("uploads/docs/%d.zip", id)
	files := form.File["files"]
	os.Remove(filesPath)
	outFile, err := os.Create(filesPath)
	w := zip.NewWriter(outFile)
	if err != nil {
		return nil, err
	}
	defer outFile.Close()
	for _, file := range files {
		f, err := w.Create(file.Filename)

		src, _ := file.Open()
		defer src.Close()

		buf := bytes.NewBuffer(nil)
		_, err = io.Copy(buf, src)
		_, err = f.Write([]byte(buf.Bytes()))
		if err != nil {
			return nil, err
		}
	}
	err = w.Close()
	if err != nil {
		return nil, err
	}
	order.Address = address
	order.IsDocs = true
	order.DocsUrl = filesPath
	order, err = oe.Provider.Save(order)
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (oe *OrderEntity) DeleteDocs(id uint64) (*dto.OrderDto, error) {
	order, err := oe.GetByID(id)
	if err != nil {
		return nil, err
	}

	err = os.Remove(order.DocsUrl)
	if err != nil {
		return nil, err
	}

	order.IsDocs = false
	order.DocsUrl = ""

	order, err = oe.Provider.Save(order)
	if err != nil {
		return nil, err
	}

	return order, nil
}
