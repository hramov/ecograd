import { Browser, ElementHandle, Page } from "puppeteer";
import { PageQuery } from "./ports/query-to-page.port";

export class _Page implements PageQuery {
  constructor(private readonly page: Page) {}

  public async goto(url: string) {
    return await this.page.goto(url);
  }

  public async hover(id: string) {
    return await this.page.hover(id);
  }

  public async click(id: string) {
    return await this.page.click(id);
  }

  public async waitForNode(id: string) {
    return await this.page.waitForSelector(id);
  }

  public async waitForNavigation() {
    return await this.page.waitForNavigation();
  }

  public async findOne(id: string) {
    return await this.page.$(id);
  }

  public async findAll(id: string) {
    return await this.page.$$(id);
  }

  public async getText(node: ElementHandle<Element>) {
    return await this.page.evaluate((el) => el.textContent, node);
  }

  public async getAttribute(node: ElementHandle<Element>, attr: string) {
    return await this.page.evaluate((el) => el.getAttribute("href"), node);
  }
}
