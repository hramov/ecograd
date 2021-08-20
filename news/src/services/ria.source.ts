import { ElementHandle } from "puppeteer";
import { PageQuery } from "../core/ports/query-to-page.port";
import { QueryService } from "../core/ports/service-to-query.port";
import { Result } from "../core/types/result.type";

export class Ria implements QueryService {
  public base_url: string = "https://ria.ru/eco/";
  public search_string: string = "";
  public nodes_selector: string = ".list-item";
  public title_selector: string = ".list-item__title";
  public href_selector: string = ".list-item__title";

  public async collect(
    page: PageQuery,
    nodes: ElementHandle<Element>[]
  ): Promise<Result[]> {
    const results: Result[] = [];

    nodes.forEach(async (node: ElementHandle<Element>) => {
      results.push({
        title: await page.getText(node),
        href: await page.getAttribute(node, "href"),
      });
    });

    return results;
  }
  public async is_next_page(): Promise<boolean> {
    return true;
  }
  public async next_page(): Promise<void> {}
}
