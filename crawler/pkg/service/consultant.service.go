package service

import (
	"context"
	"log"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

type ConsultantService struct {
	Ctx    context.Context
	Cancel context.CancelFunc
	Config *ServiceConfig
	Data   News
}

func (cs *ConsultantService) GetData() (News, error) {
	timeStart := time.Now()

	var title string
	var desc string
	var published string

	var nodes []*cdp.Node
	err := chromedp.Run(cs.Ctx,
		/**/
		chromedp.Navigate(cs.Config.Url),
		chromedp.WaitVisible(cs.Config.Selectors.Item),
		chromedp.Nodes(cs.Config.Selectors.Title, &nodes, chromedp.ByQueryAll),
		/**/
	)
	for _, item := range nodes {
		var singleNews SingleNews
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
