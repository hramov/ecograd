package queue

import (
	"fmt"
	"log"
	"os"
	"time"

	service_core "github.com/hramov/crawler/pkg/service/core"
	"github.com/streadway/amqp"
)

type Message struct {
	Queue     string            `json:"queue"`
	From      string            `json:"from"`
	To        string            `json:"to"`
	Body      service_core.News `json:"body"`
	Published time.Time         `json:"published"`
}

var Services map[string]service_core.IService
var Sender *RabbitSender
var Receiver *RabbitReceiver

func getConnection() (*amqp.Connection, error) {
	conn, err := amqp.Dial(fmt.Sprintf("amqp://%s:%s@%s:%s/", os.Getenv("RABBIT_USER"), os.Getenv("RABBIT_PASSWORD"), os.Getenv("RABBIT_HOST"), os.Getenv("RABBIT_PORT")))
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
	// err := ch.Qos(1, 0, false)
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
