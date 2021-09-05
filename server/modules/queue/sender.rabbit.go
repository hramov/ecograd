package queue

import (
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

func (rs *RabbitSender) SendMessage(queueName string, message []byte) error {
	rs.Queue, _ = getQueue(rs.Channel, queueName)
	err := rs.Channel.Publish(
		"",            // exchange
		rs.Queue.Name, // routing key
		false,         // mandatory
		false,         // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        message,
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
