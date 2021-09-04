package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/chromedp/chromedp"
	api "github.com/hramov/crawler/pkg/api"
	service "github.com/hramov/crawler/pkg/service"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

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
	data, err := cs.GetData()

	fmt.Println(os.Getenv("SERVER_API_URL"))
	api := api.ServerApi{Url: os.Getenv("SERVER_API_URL")}
	result, err := api.SendData(&data)

	fmt.Println(result)

}
