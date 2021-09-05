package queue

import (
	"log"

	"github.com/streadway/amqp"
)

type RabbitReceiver struct {
	Connection *amqp.Connection
	Channel    *amqp.Channel
	Queue      *amqp.Queue
}

func (rr *RabbitReceiver) Connect() RabbitReceiver {
	rr.Connection, _ = getConnection()
	rr.Channel, _ = getChannel(rr.Connection)
	return *rr
}

func (rr *RabbitReceiver) Receive(queueName string) {
	rr.Queue, _ = getQueue(rr.Channel, queueName)
	msgs, err := rr.Channel.Consume(
		rr.Queue.Name, // queue
		"",            // consumer
		false,         // auto-ack
		false,         // exclusive
		false,         // no-local
		false,         // no-wait
		nil,           // args
	)

	if err != nil {
		log.Println(err.Error())
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a new message")
			TestHandler(d)
			d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
