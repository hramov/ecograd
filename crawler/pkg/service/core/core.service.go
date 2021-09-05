package service_core

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/chromedp/chromedp"
)

func ParseConfig(fileName string) (Config, error) {
	data := make([]byte, 1000)
	config := Config{}
	rawData, err := os.Open(fmt.Sprintf("data/%s.json", fileName))
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer rawData.Close()
	log.Printf("Successfully opened %s.json\n", fileName)
	n, err := rawData.Read(data)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	data = data[:n]
	json.Unmarshal(data, &config)
	return config, nil
}

func FindConfig(config Config, service string) (*ServiceConfig, error) {
	for i := 0; i < len(config); i++ {
		if config[i].Service == service {
			return &config[i], nil
		}
	}
	return nil, fmt.Errorf("No such service in the config")
}

func CreateService(name string, config Config, service Service) (Service, error) {
	service.Ctx, service.Cancel = chromedp.NewContext(
		service.Ctx,
		chromedp.WithLogf(log.Printf),
	)
	defer service.Cancel()
	service.Config, _ = FindConfig(config, name)
	return service, nil
}

func CountPages() {}
func IsNextPage() {}
func NextPage()   {}
