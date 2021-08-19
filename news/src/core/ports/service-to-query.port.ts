import { ElementHandle } from "puppeteer";
import { Result } from "../types/result.type";
import { PageQuery } from "./query-to-page.port";

export interface QueryService {
    base_url: string;
    search_string?: string;
    nodes_selector: string;
    title_selector: string;
    href_selector: string;
    image_selector?: string;
    description_selector?: string;
    text_selector?: string;
    collect(page: PageQuery, nodes: ElementHandle<Element>[]): Promise<Result[]>;
    is_next_page(): Promise<boolean>;
    next_page(): Promise<void>;
  }