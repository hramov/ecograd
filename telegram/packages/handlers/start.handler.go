package handlers

import (
	"log"

	"github.com/hramov/telegram/packages/utils"
)

func Start(message Message, bot Bot) {
	msg := utils.CreateMessage(*message, "Hello!")
	msg.ReplyToMessageID = message.MessageID
	log.Println(msg.ReplyToMessageID)
	bot.Send(msg)
}
