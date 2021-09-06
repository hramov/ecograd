package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/hramov/crawler/pkg/queue"
	"github.com/hramov/crawler/pkg/service"
	service_core "github.com/hramov/crawler/pkg/service/core"
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

	services := make(map[string]service_core.IService)

	cs := service.ConsultantService{}
	cs.Register(allocCtx)
	services["consultant"] = &cs

	es := service.EcoIndustryService{}
	es.Register(allocCtx)
	services["ecoindustry"] = &es

	for _, service := range services {
		news, err := service.Process(10)
		if err != nil {
			log.Println(err)
		}
		fmt.Println(news)

		if err != nil {
			log.Println(err.Error())
		} else {
			sender.SendMessage("news", &queue.Message{
				Queue:     "news",
				From:      "crawler",
				To:        "server",
				Body:      news,
				Published: time.Now(),
			})
		}

	}
}
