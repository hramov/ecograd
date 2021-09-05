package dto

import (
	"time"

	model "github.com/hramov/gin_ecograd/modules/orm/models"
)

type OrderDto struct {
	ID          uint64    `json:"id"`
	Object      string    `json:"object"`
	Object_type int       `json:"object_type"`
	Address     string    `json:"address"`
	IsDocs      bool      `json:"is_docs"`
	DocsUrl     string    `json:"docs_url"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	ClientID    *uint64   `json:"client_id"`
	Client      *model.User
	ExpertID    *uint64 `json:"expert_id"`
	Expert      *model.User
}
