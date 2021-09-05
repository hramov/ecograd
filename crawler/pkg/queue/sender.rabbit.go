package queue

import (
	"encoding/json"
	"log"

	"github.com/streadway/amqp"
)

type RabbitSender struct {
	Connection *amqp.Connection
	Channel    *amqp.Channel
	Queue      *amqp.Queue
}

func (rs *RabbitSender) Connect() RabbitSender {
	rs.Connection, _ = getConnection()
	rs.Channel, _ = getChannel(rs.Connection)
	return *rs
}

func (rs *RabbitSender) SendMessage(queueName string, message *Message) error {

	data, _ := json.Marshal(&message)

	rs.Queue, _ = getQueue(rs.Channel, queueName)
	err := rs.Channel.Publish(
		"",            // exchange
		rs.Queue.Name, // routing key
		false,         // mandatory
		false,         // immediate
		amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "application/json",
			Body:         data,
		})
	if err != nil {
		log.Printf("Cannot send message %s: error %s\n", message, err.Error())
		return err
	}
	log.Printf("Successfully sent message %s\n", message)
	return err
}

func (rs *RabbitSender) Disconnect() error {
	log.Println("Disconnecting...")
	err := rs.Channel.Close()
	if err != nil {
		return err
	}
	err = rs.Connection.Close()
	log.Println("Disconnected")
	return err
}
