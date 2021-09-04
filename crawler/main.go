package main

import (
	"context"
	"log"

	"github.com/chromedp/chromedp"
	service "github.com/hramov/crawler/pkg/service"
)

func main() {

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,
		chromedp.Flag("headless", true),
	)

	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)

	ys := service.YandexService{Ctx: allocCtx}
	ys.Ctx, ys.Cancel = chromedp.NewContext(
		allocCtx,
		chromedp.WithLogf(log.Printf),
	)
	defer ys.Cancel()

	ys.ParseConfig("config")
	ys.GetData()
}
