import TelegramBot from "node-telegram-bot-api";
import { ClientProvider } from "../../providers/ClientProvider";
import { IOrder } from "./../Controller"

export async function newOrderWithReply(
  user: ClientProvider,
  bot: TelegramBot,
  msg: TelegramBot.Message
) {
  const order: IOrder = {
    name: "",
    email: "",
    company: "",
    object: "",
    object_type: '',
    phone: "",
    created_at: new Date(Date.now()),
  };

  let message: TelegramBot.Message = await bot.sendMessage(
    msg.chat.id,
    "Как тебя зовут?"
  );

  bot.onReplyToMessage(message.chat.id, message.message_id, async (msg) => {
    order.name = msg.text!;
    message = await bot.sendMessage(msg.chat.id, "Ваш Email?");
    bot.onReplyToMessage(message.chat.id, message.message_id, async (msg) => {
      order.email = msg.text!;
      message = await bot.sendMessage(
        msg.chat.id,
        "Какую компанию ты представляешь?"
      );
      bot.onReplyToMessage(message.chat.id, message.message_id, async (msg) => {
        order.company = msg.text!;
        message = await bot.sendMessage(
          msg.chat.id,
          "О каком объекте идет речь?"
        );
        bot.onReplyToMessage(
          message.chat.id,
          message.message_id,
          async (msg) => {
            order.object = msg.text!;
            message = await bot.sendMessage(msg.chat.id, "Контактный телефон");
            bot.onReplyToMessage(
              message.chat.id,
              message.message_id,
              async (msg) => {
                order.phone = msg.text!;
                message = await bot.sendMessage(
                  msg.chat.id,
                  `Ваш заказ: ${order.object}. Отправить?`,
                  {
                    reply_markup: {
                      keyboard: [[{ text: "Да" }, { text: "Нет" }]],
                      resize_keyboard: true,
                      one_time_keyboard: true,
                    },
                  }
                );
                bot.onReplyToMessage(
                  message.chat.id,
                  message.message_id,
                  async (msg) => {
                    if (msg.text!.toLowerCase() == "да") {
                      await user.sendOrder(order);
                    }
                  }
                );
              }
            );
          }
        );
      });
    });
  });
}

export async function newOrderWithoutReply(
  user: ClientProvider,
  bot: TelegramBot,
  msg: TelegramBot.Message
) {
  const order: IOrder = {
    name: "",
    email: "",
    company: "",
    object: "",
    object_type: '',
    phone: "",
    created_at: new Date(Date.now()),
  };

  let message = await bot.sendMessage(msg.chat.id, "Как твое имя?");
  let isContinue = true;

  bot.on("message", async (msg) => {
    if (msg.text!.toLowerCase() == "отмена") {
      isContinue = false;
      return;
    }

    if (isContinue) {
      let msg_seq = msg.message_id - message.message_id;
      switch (msg_seq) {
        case 1:
          order.name = msg.text!;
          await bot.sendMessage(msg.chat.id, "Ваш Email?");
          break;
        case 3:
          order.email = msg.text!;
          await bot.sendMessage(
            msg.chat.id,
            "Какую компанию ты представляешь?"
          );
          break;
        case 5:
          order.company = msg.text!;
          await bot.sendMessage(msg.chat.id, "О каком объекте идет речь?");
          break;
        case 7:
          order.object = msg.text!;
          await bot.sendMessage(msg.chat.id, "Ваш телефон?");
          break;
        case 9:
          order.phone = msg.text!;
          await bot.sendMessage(
            msg.chat.id,
            `Ваш заказ: ${order.object}. Отправить?`,
            {
              reply_markup: {
                keyboard: [[{ text: "Да" }, { text: "Нет" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
          break;
        case 11:
          if (msg.text!.toLowerCase() == "да") {
            const result = await user.sendOrder(order);
            if (result.status)
              await bot.sendMessage(msg.chat.id, "Заказ успешно отправлен!");
            else await bot.sendMessage(msg.chat.id, String(result.error));
          } else {
            await bot.sendMessage(msg.chat.id, "Отмена заказа!");
          }
      }
    }
  });
}
