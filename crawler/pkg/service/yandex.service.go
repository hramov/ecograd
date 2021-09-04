package service

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/hramov/crawler/pkg/utils"
)

type YandexService struct {
	Title     string            `json:"title"`
	Url       string            `json:"url"`
	Selectors map[string]string `json:"selectors"`
	DataType  string            `json:"data_type"`
	Ctx       context.Context
	Cancel    context.CancelFunc
	Data      []byte
}

var data = make([]byte, 1000)

func (ys *YandexService) ParseConfig(fileName string) {
	rawData, err := os.Open(fmt.Sprintf("data/%s.json", fileName))
	defer rawData.Close()
	utils.Check(err)
	fmt.Printf("Successfully opened %s.json\n", fileName)
	n, err := rawData.Read(data)
	utils.Check(err)
	data = data[:n]
	json.Unmarshal([]byte(data), ys)
}

func (ys *YandexService) GetData() {
	timeStart := time.Now()
	var value string
	err := chromedp.Run(ys.Ctx,
		chromedp.Navigate(ys.Url),
		chromedp.WaitVisible(ys.Selectors["footer"]),
		chromedp.Click(ys.Selectors["click"], chromedp.NodeVisible),
		chromedp.Value(ys.Selectors["value"], &value),
	)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Go's time.After example:\n%s", []byte(value))
	log.Printf("Time for query: %f seconds!\n", time.Since(timeStart).Seconds())
}
