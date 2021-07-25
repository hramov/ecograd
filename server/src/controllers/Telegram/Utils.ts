import { ITelegramUser } from "../Controller";
import { TelegramController } from "./TelegramController";

export function getUserById(username: string): (ITelegramUser | undefined)[] {
  return TelegramController.users.map((user) => {
    if (user.username == username) return user;
  });
}

export function addUser(user: ITelegramUser) {
  TelegramController.users.push(user);
}

export function editUserMessageCounter(user: ITelegramUser, msg_count: number) {
  TelegramController.users.map((user) => {
    user.msg_counter += msg_count;
  });
}

export function emit(message: string, group: string) {
  TelegramController.users.forEach(async (user) => {
    if (user.role == group || group == "all") {
      await TelegramController.bot.sendMessage(user.chat_id, message);
    }
  });
}
