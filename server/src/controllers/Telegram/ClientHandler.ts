import TelegramBot from "node-telegram-bot-api";
import { AuthProvider } from "../../providers/AuthProvider";

export async function clientHandler(
    auth: AuthProvider,
    bot: TelegramBot,
    msg: TelegramBot.Message
  ) {
    return;
  }