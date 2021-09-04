package service

type ServiceSelector struct {
	Item      string `json:"item"`
	Title     string `json:"title"`
	Href      string `json:"href"`
	Desc      string `json:"desc"`
	Published string `json:"published"`
}

type ServiceConfig struct {
	Service   string          `json:"service"`
	Url       string          `json:"url"`
	Selectors ServiceSelector `json:"selectors"`
	DataType  string          `json:"data_type"`
}

type Config []ServiceConfig

type SingleNews struct {
	Title     string `json:"title"`
	Href      string `json:"href"`
	Desc      string `json:"desc"`
	Published string `json:"published"`
}

type News []SingleNews
