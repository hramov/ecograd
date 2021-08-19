import { PageQuery } from "./ports/query-to-page.port";
import { QueryService } from "./ports/service-to-query.port";
import { Result } from "./types/result.type";

export class Query {
  constructor(
    private readonly page: PageQuery,
    private readonly queryData: QueryService
  ) {}

  public async search() {
    const results: Result[] = [];

    await this.page.goto(this.queryData.base_url);

    // while (!this.queryData.is_next_page()) {
    await this.page.waitForNode(this.queryData.nodes_selector);
    const nodes = await this.page.findAll(this.queryData.nodes_selector);
    results.push(...(await this.queryData.collect(this.page, nodes)));
    await this.queryData.next_page();
    // }
  }
}
