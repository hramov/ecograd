import { Browser } from "puppeteer";

export type Url = string

export class Page {
  constructor(private readonly _browser: Browser) {}

  async openUrl(url: Url) {
    const page = await this._browser.newPage()
    await page.goto(url)
    return this
  }

  async findById(id: string) {

  }
}
