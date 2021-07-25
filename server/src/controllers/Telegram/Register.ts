import TelegramBot from "node-telegram-bot-api";
import { AuthProvider } from "../../providers/AuthProvider";
import { IUser } from "../Controller";

export async function telegramRegister(
    auth: AuthProvider,
    bot: TelegramBot,
    msg: TelegramBot.Message
  ) {
    bot.sendMessage(msg.chat.id, "Скажи пароль :-)");
    bot.on("message", (msg) => {
      if (msg.text == "123") {
        bot.sendMessage(
          msg.chat.id,
          `Введи свои данные в формате:
                Имя,Фамилия,E-mail,Дата рождения (дд.мм.гггг),login,password`
        );
        bot.on("message", async (msg) => {
          const data = msg.text?.split(",");
          if (data!.length < 4) {
            bot.sendMessage(msg.chat.id, "Проверь введенные данные!");
          } else {
            const date = data![3].split(".");
            date[0], (date[2] = date[2]), date[0];
            const user: IUser = {
              name: data![0],
              last_name: data![1],
              email: data![2],
              role: "expert",
              birthdate: new Date(
                Number(date[0]),
                Number(date[1]),
                Number(date[2])
              ),
              login: data![4],
              password: data![5],
              telegram_id: msg.chat.id,
            };

            /** Some validation */

            try {
              await auth.addUser(user);
              bot.sendMessage(
                msg.chat.id,
                `Ты успешно зарегистрирован в системе! Для входа на сайт: логин: ${
                  data![4]
                }, пароль: ${data![5]}`
              );
            } catch (err: unknown) {
              bot.sendMessage(msg.chat.id, "Что-то пошло не так! " + err);
            }
          }
        });
      }
    });
  }