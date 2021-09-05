package api

type ServerApi struct {
	Url string
}

// func (sa *ServerApi) SendData(news *service_core.News) (*http.Response, error) {
// 	rawData, err := json.Marshal(news)
// 	if err != nil {
// 		return nil, err
// 	}

// 	res, err := http.Post(sa.Url, "application/json", bytes.NewBuffer(rawData))
// 	if err != nil {
// 		return nil, err
// 	}
// 	return res, nil
// }
