package handlers

import (
	tgbotapi "github.com/Syfaro/telegram-bot-api"
	"github.com/hramov/telegram/packages/utils"
)

func Login(message tgbotapi.Message, bot *tgbotapi.BotAPI) {
	msg := utils.CreateMessage(message, "Please sign in!")
	bot.Send(msg)
	msg = utils.CreateMessage(message, "Enter your Email!")
	bot.Send(msg)
	msg.ReplyToMessageID = message.MessageID
}
