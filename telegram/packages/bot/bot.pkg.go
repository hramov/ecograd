package bot

import (
	"log"
	"os"
	"reflect"

	tgbotapi "github.com/Syfaro/telegram-bot-api"
	"github.com/hramov/telegram/packages/handlers"
)

type Bot struct {
	Instance *tgbotapi.BotAPI
	Update   tgbotapi.UpdateConfig
	Token    string
	Users    []User
}

func (b *Bot) Create() *Bot {
	bot, err := tgbotapi.NewBotAPI(os.Getenv("TOKEN"))
	if err != nil {
		log.Println("Error " + err.Error())
	}
	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60
	b.Instance = bot
	b.Update = u
	return b
}

func (b *Bot) HandleQuery(updateConfig tgbotapi.UpdateConfig) {
	updates, err := b.Instance.GetUpdatesChan(updateConfig)
	if err != nil {
		log.Println(err.Error())
	}

	log.Println("Ready to accept queries!")

	for update := range updates {

		log.Printf("New query: %s, MessageID: %d", update.Message.Text, update.Message.MessageID)

		if update.Message == nil {
			continue
		}
		if reflect.TypeOf(update.Message.Text).Kind() == reflect.String && update.Message.Text != "" {
			handlers.MainSwitch(update.Message, b.Instance)
		} else {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "Use the words for search.")
			b.Instance.Send(msg)
		}
	}
}