import { ElementHandle, HTTPResponse } from "puppeteer";
import { Url } from "../page.core";

export interface PageQuery {
  goto(url: Url): Promise<HTTPResponse>;
  hover(id: string): Promise<void>;
  click(id: string): Promise<void>;
  waitForNode(id: string): Promise<ElementHandle<Element> | null>;
  waitForNavigation(): Promise<HTTPResponse | null>;
  findOne(id: string): Promise<ElementHandle<Element> | null>;
  findAll(id: string): Promise<ElementHandle<Element>[]>;
  getText(node: ElementHandle<Element>): Promise<any>;
  getAttribute(node: ElementHandle<Element>, attr: string): Promise<any>;
}
