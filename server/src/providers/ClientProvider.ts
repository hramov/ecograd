import { getRepository } from "typeorm";
import { IOrder } from "../controllers/Controller";
import { Orders } from "../database/entity/Order";
import { Provider } from "./Provider";

export class ClientProvider extends Provider {
  async sendOrder(order: IOrder): Promise<{ status: boolean; data: IOrder | null }> {
    try {
      const result = await getRepository(Orders).save(order);
      return {
        status: false,
        data: result,
      };
    } catch (err: unknown) {
      return {
        status: false,
        data: null,
      };
    }
  }
}
