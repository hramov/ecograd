import { launch, Browser } from "puppeteer";

export class Crawler {
  private static browser: Browser;
  private static options: any;
  private static instance: Crawler;
  private static isModified: boolean;

  constructor() {
    if (!Crawler.isModified) {
      Crawler.options = {
        // Параметры, которые передаются на вход puppeteer при запуске браузера
        args: [
          "--no-sandbox",
          "--unhandled-rejections=strict",
          "--disable-notifications",
        ],
        headless: false, // Графический интерфейс (true - отключен, false - включен).
        // Запуск с графическим режимом только от имени пользователя
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ["--disable-extensions"],
      };

      Crawler.isModified = true;
      Crawler.instance = this;
    }
    return Crawler.instance;
  }

  public static async start() {
    Crawler.browser = await launch(Crawler.options);
    return Crawler.browser;
  }
}
