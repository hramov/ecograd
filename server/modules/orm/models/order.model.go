package model

import "time"

type Order struct {
	ID          uint64    `gorm:"primary_key, AUTO_INCREMENT"`
	Object      string    `json:"object"`
	Object_type int       `json:"object_type"`
	Address     string    `json:"address"`
	IsDocs      bool      `json:"is_docs"`
	DocsUrl     string    `json:"docs_url"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	ExpertID    *uint64   `gorm:"column:expert_id"`
	Expert      *User
	ClientID    *uint64 `gorm:"column:client_id"`
	Client      *User
}
