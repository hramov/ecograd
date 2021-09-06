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

func (cs *ConsultantService) getData() (service_core.News, error) {

	timeStart := time.Now()

	var titles []*cdp.Node
	var hrefs []*cdp.Node
	var descs []*cdp.Node
	var publishes []*cdp.Node

	err := chromedp.Run(cs.Ctx,
		chromedp.Nodes(cs.Config.Selectors.Title, &titles, chromedp.BySearch),
		chromedp.Nodes(cs.Config.Selectors.Href, &hrefs, chromedp.BySearch),
		chromedp.Nodes(cs.Config.Selectors.Desc, &descs, chromedp.BySearch),
		chromedp.Nodes(cs.Config.Selectors.Published, &publishes, chromedp.BySearch),
	)

	for i := 0; i < len(titles); i++ {
		singleNews := service_core.SingleNews{}

		singleNews.Href = hrefs[i].AttributeValue("href")
		chromedp.Run(cs.Ctx,
			chromedp.Text([]cdp.NodeID{titles[i].NodeID}, &singleNews.Title, chromedp.ByNodeID),
			chromedp.Text([]cdp.NodeID{descs[i].NodeID}, &singleNews.Desc, chromedp.ByNodeID),
			chromedp.Text([]cdp.NodeID{publishes[i].NodeID}, &singleNews.Published, chromedp.ByNodeID),
		)

		cs.Data = append(cs.Data, singleNews)
	}
	if err != nil {
		log.Println(err)
		return nil, err
	}

	log.Printf("Time for query: %f seconds!\n", time.Since(timeStart).Seconds())
	return cs.Data, err
}

func (cs *ConsultantService) isNextPage() (bool, string, error) {
	var nextPages []*cdp.Node
	var nextPage *cdp.Node
	var nextPageHref string

	err := chromedp.Run(cs.Ctx,
		chromedp.Nodes(cs.Config.Selectors.NextPage, &nextPages, chromedp.ByQueryAll),
	)

	fmt.Println(len(nextPages))

	nextPage = nextPages[0]
	// for _, node := range nextPages {
	// 	fmt.Println(node)
	// }
	nextPageHref = nextPage.AttributeValue("href")
	fmt.Println(nextPageHref)
	if err != nil {
		return false, "", err
	}
	return true, nextPageHref, nil
}

func (cs *ConsultantService) close() error {
	cs.Cancel()
	return nil
}

func (cs *ConsultantService) goToPage(url string) (bool, error) {
	err := chromedp.Run(cs.Ctx,
		chromedp.Navigate(url),
	)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (cs *ConsultantService) Process(pages int) (service_core.News, error) {
	log.Println("ConsultantService started to collect news")
	// pageUrl := ""
	var serviceNews service_core.News

	for i := 0; i < pages; i++ {
		cs.goToPage(cs.Config.Url)
		news, err := cs.getData()
		if err != nil {
			log.Println(err)
			return nil, err
		}
		// _, pageUrl, err = cs.isNextPage()
		// if err != nil {
		// 	log.Println(err)
		// 	return nil, err
		// }
		// cs.Config.Url = pageUrl
		serviceNews = append(serviceNews, news...)
		cs.close()
		return serviceNews, nil
	}
	cs.close()
	return serviceNews, nil
}
