import TelegramBot from "node-telegram-bot-api";
import { AuthProvider } from "../../providers/AuthProvider";
import { addUser } from "./Utils";

export async function workerHandler(
  auth: AuthProvider,
  bot: TelegramBot,
  msg: TelegramBot.Message
) {
  let message = await bot.sendMessage(msg.chat.id, "Скажи пароль ^_^ ");
  bot.on("message", (msg) => {
    let msg_seq = msg.message_id - message.message_id;

    switch (msg_seq) {
      case 1:
        if (msg.text!.toLowerCase() === "123") {
          addUser({
            username: msg.chat.username!,
            chat_id: msg.chat.id,
            role: "admin",
            msg_counter: 2,
          });
        }
    }
  });
}
