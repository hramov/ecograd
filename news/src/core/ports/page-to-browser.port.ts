import { Browser, Page } from "puppeteer";

export interface BrowserPage {
  start(): Promise<Browser>
  newPage(): Promise<Page>;
}
