package queue

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/ports"
	"github.com/streadway/amqp"
)

func NewsHandler(message amqp.Delivery) (bool, error) {

	var newsEntity ports.NewsEntityPort
	container.NamedResolve(&newsEntity, "NewsEntity")

	var m NewsMessage
	err := json.Unmarshal(message.Body, &m)
	if err != nil {
		log.Println(err.Error())
	}

	for _, news := range m.Body {
		fmt.Println(news)
	}

	result, err := newsEntity.Store(m.Body)
	if err != nil {
		log.Println(err.Error())
		return result, err
	}
	return result, nil
}
