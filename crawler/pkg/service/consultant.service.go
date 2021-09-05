package service

import (
	"context"
	"log"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
	service_core "github.com/hramov/crawler/pkg/service/core"
)

type ConsultantService struct {
	Ctx    context.Context
	Cancel context.CancelFunc
	Config *service_core.ServiceConfig
	Data   service_core.News
}

func (cs *ConsultantService) Register(ctx context.Context) (*ConsultantService, error) {
	config, err := service_core.ParseConfig("config")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	cs.Ctx, cs.Cancel = chromedp.NewContext(
		ctx,
		chromedp.WithLogf(log.Printf),
	)
	cs.Config, err = service_core.FindConfig(config, "consultant")
	return cs, nil
}

func (cs *ConsultantService) GetData() (service_core.News, error) {

	log.Println("ConsultantService started to collect news")

	timeStart := time.Now()

	var title string
	var desc string
	var published string

	var nodes []*cdp.Node
	err := chromedp.Run(cs.Ctx,
		/**/
		chromedp.Navigate(cs.Config.Url),
		chromedp.WaitVisible(cs.Config.Selectors.Item),
		chromedp.Nodes(cs.Config.Selectors.Desc, &nodes, chromedp.BySearch),
		/**/
	)
	for _, item := range nodes {
		var singleNews service_core.SingleNews
		cur := item.Attributes
		chromedp.Run(cs.Ctx,
			chromedp.Text([]cdp.NodeID{item.NodeID}, &title, chromedp.ByNodeID),
			chromedp.Text(cs.Config.Selectors.Desc, &desc, chromedp.FromNode(item)),
			chromedp.Text(cs.Config.Selectors.Published, &published, chromedp.FromNode(item)),
		)
		singleNews.Title = title
		singleNews.Href = cur[1]
		singleNews.Desc = desc
		singleNews.Published = published
		cs.Data = append(cs.Data, singleNews)
	}
	if err != nil {
		log.Println(err)
		return nil, err
	}
	log.Printf("Go's time.After example:\n%s", []byte(title))
	log.Printf("Time for query: %f seconds!\n", time.Since(timeStart).Seconds())

	return cs.Data, err
}

func (cs *ConsultantService) Close() error {
	cs.Cancel()
	return nil
}
