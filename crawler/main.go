package main

import (
	"context"
	"log"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/hramov/crawler/pkg/queue"
	service "github.com/hramov/crawler/pkg/service"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	sender := queue.RabbitSender{}
	sender = sender.Connect()

	receiver := queue.RabbitReceiver{}
	receiver = receiver.Connect()
	go receiver.Receive("query")

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,
		chromedp.Flag("headless", false),
	)

	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)

	config, err := service.ParseConfig("config")
	if err != nil {
		log.Fatal(err)
	}

	cs := service.ConsultantService{Ctx: allocCtx}
	cs.Ctx, cs.Cancel = chromedp.NewContext(
		allocCtx,
		chromedp.WithLogf(log.Printf),
	)
	defer cs.Cancel()
	cs.Config, err = service.FindConfig(config, "consultant")
	news, err := cs.GetData()

	sender.SendMessage("news", &queue.Message{
		Queue:     "news",
		From:      "crawler",
		To:        "server",
		Body:      news,
		Published: time.Now(),
	})
}
