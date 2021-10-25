package queue

import (
	"encoding/json"
	"log"

	"github.com/streadway/amqp"
)

func QueryHandler(message amqp.Delivery) {
	var m Message
	err := json.Unmarshal(message.Body, &m)
	if err != nil {
		log.Println(err.Error())
	}
	log.Println(m.Body)
}
