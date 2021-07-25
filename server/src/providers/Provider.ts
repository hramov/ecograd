import { Orders } from "../database/entity/Order";

export interface LandingProviderResponse {
  status: boolean;
  data: any[];
}

export abstract class Provider {
  constructor() {}

  protected checkParams(param: string): boolean {
    param.split("").map((letter) => {
      if (letter == "'" || letter == " ") {
        return false;
      }
    });
    return true;
  }
}
