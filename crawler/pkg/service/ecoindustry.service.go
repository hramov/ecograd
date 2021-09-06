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

func (es *EcoIndustryService) close() error {
	es.Cancel()
	return nil
}

func (es *EcoIndustryService) getData() (service_core.News, error) {

	timeStart := time.Now()

	var titles []*cdp.Node
	var hrefs []*cdp.Node
	var descs []*cdp.Node
	var publishes []*cdp.Node

	err := chromedp.Run(es.Ctx,
		chromedp.Nodes(es.Config.Selectors.Title, &titles, chromedp.ByQueryAll),
		chromedp.Nodes(es.Config.Selectors.Href, &hrefs, chromedp.ByQueryAll),
		chromedp.Nodes(es.Config.Selectors.Desc, &descs, chromedp.ByQueryAll),
		chromedp.Nodes(es.Config.Selectors.Published, &publishes, chromedp.ByQueryAll),
	)

	for i := 0; i < len(titles); i++ {
		singleNews := service_core.SingleNews{}
		singleNews.Title = titles[i].AttributeValue("title")
		singleNews.Href = hrefs[i].AttributeValue("href")
		singleNews.Published = publishes[i].AttributeValue("datetime")
		chromedp.Run(es.Ctx,
			chromedp.Text([]cdp.NodeID{descs[i].NodeID}, &singleNews.Desc, chromedp.ByNodeID),
		)
		es.Data = append(es.Data, singleNews)
	}
	if err != nil {
		log.Println(err)
		return nil, err
	}

	log.Printf("Time for query: %f seconds!\n", time.Since(timeStart).Seconds())
	fmt.Println(es.isNextPage())
	return es.Data, err
}

func (es *EcoIndustryService) isNextPage() (bool, string, error) {
	var nextPages []*cdp.Node
	var nextPage *cdp.Node
	var nextPageHref string

	err := chromedp.Run(es.Ctx,
		chromedp.Nodes(es.Config.Selectors.NextPage, &nextPages, chromedp.ByQueryAll),
	)
	for _, node := range nextPages {
		if len(node.Children) == 0 {
			nextPage = node
		}
	}
	nextPageHref = nextPage.AttributeValue("href")
	if err != nil {
		return false, "", err
	}
	return true, nextPageHref, nil
}

func (es *EcoIndustryService) goToPage(url string) (bool, error) {
	err := chromedp.Run(es.Ctx,
		chromedp.Navigate(url),
	)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (es *EcoIndustryService) Process(pages int) (service_core.News, error) {
	log.Println("EcoIndustryService started to collect news")
	pageUrl := ""
	var serviceNews service_core.News

	for i := 0; i < pages; i++ {
		es.goToPage(es.Config.Url)
		news, err := es.getData()
		if err != nil {
			return nil, err
		}
		_, pageUrl, err = es.isNextPage()
		if err != nil {
			return nil, err
		}
		es.Config.Url = pageUrl
		serviceNews = append(serviceNews, news...)
	}
	es.close()
	return serviceNews, nil
}
