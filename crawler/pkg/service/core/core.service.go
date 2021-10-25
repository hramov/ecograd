package service_core

import (
	"log"

	"github.com/chromedp/chromedp"
)

func CreateService(name string, config Config, service Service) (Service, error) {
	service.Ctx, service.Cancel = chromedp.NewContext(
		service.Ctx,
		chromedp.WithLogf(log.Printf),
	)
	defer service.Cancel()
	service.Config, _ = FindConfig(config, name)
	return service, nil
}
