export const options = {
  // Параметры, которые передаются на вход puppeteer при запуске браузера
  args: [
    "--no-sandbox",
    "--unhandled-rejections=strict",
    "--disable-notifications",
  ],
  headless: true, // Графический интерфейс (true - отключен, false - включен).
  // Запуск с графическим режимом только от имени пользователя
  ignoreHTTPSErrors: true,
  ignoreDefaultArgs: ["--disable-extensions"],
};
