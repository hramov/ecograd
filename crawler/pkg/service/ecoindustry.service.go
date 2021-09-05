package service

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
	service_core "github.com/hramov/crawler/pkg/service/core"
)

type EcoIndustryService struct {
	Ctx    context.Context
	Cancel context.CancelFunc
	Config *service_core.ServiceConfig
	Data   service_core.News
}

func (es *EcoIndustryService) Register(ctx context.Context) (*EcoIndustryService, error) {
	config, err := service_core.ParseConfig("config")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	es.Ctx, es.Cancel = chromedp.NewContext(
		ctx,
		chromedp.WithLogf(log.Printf),
	)
	es.Config, err = service_core.FindConfig(config, "ecoindustry")
	return es, nil
}

func (es *EcoIndustryService) Close() error {
	es.Cancel()
	return nil
}

func (es *EcoIndustryService) GetData() (service_core.News, error) {

	log.Println("EcoIndustryService started to collect news")

	timeStart := time.Now()

	// var title string
	// var href string
	var desc string
	var published string

	var nodes []*cdp.Node
	err := chromedp.Run(es.Ctx,
		chromedp.Navigate(es.Config.Url),
		chromedp.Nodes(es.Config.Selectors.Href, &nodes, chromedp.ByQueryAll),
	)

	for _, item := range nodes {

		var singleNews service_core.SingleNews

		chromedp.Run(es.Ctx,
			chromedp.Text(es.Config.Selectors.Desc, &desc, chromedp.FromNode(item)),
			chromedp.Text(es.Config.Selectors.Published, &published, chromedp.FromNode(item)),
		)

		singleNews.Title = item.AttributeValue("title")
		singleNews.Href = item.AttributeValue("href")
		singleNews.Desc = desc
		singleNews.Published = published

		fmt.Println(desc, published)
		es.Data = append(es.Data, singleNews)
	}
	if err != nil {
		log.Println(err)
		return nil, err
	}

	log.Printf("Time for query: %f seconds!\n", time.Since(timeStart).Seconds())

	return es.Data, err
}
