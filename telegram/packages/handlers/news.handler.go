package handlers

import (
	"encoding/json"
	"fmt"

	"github.com/hramov/telegram/packages/bot/dto"
	"github.com/hramov/telegram/packages/utils"
)

func News(message Message, bot Bot) {
	fetch := utils.Fetch{}
	data, err := fetch.Get("http://localhost:5000/telegram/news")

	if err != nil {
		msg := utils.CreateMessage(*message, "Cannot find news :-(")
		bot.Send(msg)
		return
	}

	news := []*dto.NewsDto{}
	err = json.Unmarshal(data, &news)

	if err != nil {
		msg := utils.CreateMessage(*message, "Cannot unmarshal news :-(")
		bot.Send(msg)
		return
	}

	for i := 0; i < len(news); i++ {
		msg := utils.CreateMessage(*message, fmt.Sprintf("%s\n\n%s\n\n(%s)", news[i].Title, news[i].Href, news[i].ImageUrl))
		bot.Send(msg)
	}

}
