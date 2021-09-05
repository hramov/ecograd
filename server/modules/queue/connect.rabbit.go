package queue

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/streadway/amqp"
)

type NewsMessage struct {
	Queue     string         `json:"queue"`
	From      string         `json:"from"`
	To        string         `json:"to"`
	Body      []*dto.NewsDto `json:"body"`
	Published time.Time      `json:"published"`
}

func getConnection() (*amqp.Connection, error) {
	conn, err := amqp.Dial(fmt.Sprintf("amqp://%s:%s@localhost:5672/", os.Getenv("RABBIT_USER"), os.Getenv("RABBIT_PASSWORD")))
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	log.Println("Connected to RabbitMQ server")
	return conn, nil
}

func getChannel(conn *amqp.Connection) (*amqp.Channel, error) {
	ch, err := conn.Channel()
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	log.Println("Connected to channel")
	return ch, nil
}

func getQueue(ch *amqp.Channel, queueName string) (*amqp.Queue, error) {
	q, err := ch.QueueDeclare(
		queueName, // name
		false,     // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	log.Printf("Connected to %s queue\n", queueName)
	return &q, nil
}
