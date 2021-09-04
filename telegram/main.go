package main

import (
	"os"

	"github.com/hramov/telegram/packages/bot"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	bot := bot.Bot{Token: os.Getenv("TOKEN")}
	bot.Create()
	bot.HandleQuery(bot.Update)
}
