import { Crawler } from "./core/crawler.core"
import { Page } from "./core/page.core"

const main = async () => {
    const browser = await Crawler.start()
    const page = new Page(browser)
    await page
            .openUrl('https://google.com/news')
            //.findById('#title')
            //.text()
}

main()


// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setRequestInterception(true);
//   page.on("request", (request) => {
//     if (request.resourceType() === "image") request.abort();
//     else request.continue();
//   });
//   await page.goto("https://news.google.com/news/");
//   await page.screenshot({ path: "news.png", fullPage: true });

//   await browser.close();
// })();
