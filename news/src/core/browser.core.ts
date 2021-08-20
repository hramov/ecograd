import { launch, Browser, Page } from "puppeteer";
import { options } from "../configs/browser.config";
import { BrowserPage } from "./ports/page-to-browser.port";

export class _Browser implements BrowserPage {
  private browser: Browser

  constructor() {
    this.browser = {} as Browser
  }

  public async start() {
    this.browser = await launch(options);
    return this.browser
  }

  public async newPage(): Promise<Page> {
    return await this.browser.newPage()
  }
}
