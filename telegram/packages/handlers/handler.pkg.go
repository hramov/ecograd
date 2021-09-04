package handlers

import (
	tgbotapi "github.com/Syfaro/telegram-bot-api"
)

type Message = *tgbotapi.Message
type Bot = *tgbotapi.BotAPI

func MainSwitch(message Message, bot Bot) {
	switch message.Text {
	case "/start":
		Start(message, bot)
		break
	case "/news":
		News(message, bot)
	}
}
