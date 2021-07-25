import { Controller, ITelegramUser } from "../Controller";
import TelegramBot from "node-telegram-bot-api";
import { AuthProvider } from "../../providers/AuthProvider";
import { ClientProvider } from "../../providers/ClientProvider";
import { newOrderWithoutReply } from "./Order";
import { workerHandler } from "./WorkerHandler";
import { clientHandler } from "./ClientHandler";
import { greeting } from "./Greeting";

export class TelegramController extends Controller {
  private static readonly TOKEN = process.env.TOKEN;
  private static readonly BOT_NAME = process.env.BOT_NAME;
  public static bot: TelegramBot;

  // private static readonly nID = 666845778;
  // private static CHAT_ID = 174055421;
  
  public static users: ITelegramUser[] = new Array();

  private static instance: TelegramController;
  constructor() {
    if (!TelegramController.instance) {
      super();
      TelegramController.bot = new TelegramBot(TelegramController.TOKEN!, {
        polling: true,
      });
      TelegramController.instance = this;
      return TelegramController.instance;
    }
    return TelegramController.instance;
  }

  listen() {
    const auth = new AuthProvider();
    const user = new ClientProvider();
    const bot = TelegramController.bot;

    bot.on("message", async (msg) => {
      switch (msg.text!.toLowerCase()) {
        case "/start":
          await greeting(auth, bot, msg);
          break;
        case "/order":
          await newOrderWithoutReply(user, bot, msg);
          break;
        case "/client":
          await clientHandler(auth, bot, msg);
          break;
        case "/worker":
          await workerHandler(auth, bot, msg);
          break;
      }
    });
  }
}
