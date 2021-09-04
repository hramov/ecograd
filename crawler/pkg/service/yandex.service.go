package service

import (
	"context"
)

type YandexService struct {
	Title     string            `json:"title"`
	Url       string            `json:"url"`
	Selectors map[string]string `json:"selectors"`
	DataType  string            `json:"data_type"`
	Ctx       context.Context
	Cancel    context.CancelFunc
	Data      []byte
}
