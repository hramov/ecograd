import TelegramBot from "node-telegram-bot-api";
import { AuthProvider } from "../../providers/AuthProvider";
import { addUser } from "./Utils";
export async function greeting(
    auth: AuthProvider,
    bot: TelegramBot,
    msg: TelegramBot.Message
  ) {
    addUser({
      username: msg.chat.username!,
      chat_id: msg.chat.id,
      role: "user",
      msg_counter: 1,
    });

    bot.sendPhoto(
      msg.chat.id,
      "https://animalfriendsofthevalleys.com/wp-content/uploads/2015/12/welcome.jpg"
    );
    bot.sendMessage(
      msg.chat.id,
      `Привет, давай знакомиться! Я - бот ЭкоГрадЪ и создан, чтобы помочь тебе упростить процесс работы с компанией. Скажи, ты - клиент или работник?`,
      {
        reply_markup: {
          keyboard: [[{ text: "/client" }, { text: "/worker" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
  }