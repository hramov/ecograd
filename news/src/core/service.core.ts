import { QueryService } from "./ports/service-to-query.port";

export class Service {
  private static services: QueryService[] = [];

  public static register(service: QueryService) {
    Service.services.push(service);
  }

  public static getServices() {
    return Service.services;
  }
}
