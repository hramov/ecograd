import { getRepository } from "typeorm";
import { IOrder } from "../controllers/Controller";
import { Orders } from "../database/entity/Order";
import { Provider } from "./Provider";

export class UserProvider extends Provider {
  async sendOrder(order: IOrder): Promise<{ status: boolean; error: unknown }> {
    try {
      await getRepository(Orders).save(order);
    } catch (err: unknown) {
      return {
        status: false,
        error: err,
      };
    }
    return {
      status: true,
      error: null,
    };
  }
}
