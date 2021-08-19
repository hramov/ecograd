import { _Browser } from "./core/browser.core";
import { _Page } from "./core/page.core";
import { BrowserPage } from "./core/ports/page-to-browser.port";
import { PageQuery } from "./core/ports/query-to-page.port";
import { Query } from "./core/query.core";
import { Service } from "./core/service.core";
import { Ria } from "./services/ria.source";

const main = async () => {
  const browser: BrowserPage = new _Browser();
  const page: PageQuery = new _Page(await (await browser.start()).newPage());
  Service.register(new Ria());

  const services = Service.getServices()
  services.forEach(async service => {
    const query = new Query(page, service)
    await query.search()
  })

};

main();
