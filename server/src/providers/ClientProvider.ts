import { getRepository } from "typeorm";
import { Clients } from "../database/entity/Clients";
import { Orders } from "../database/entity/Order";
import { Provider } from "./Provider";

export class ClientProvider extends Provider {

  async getExperts(): Promise<{status: boolean, data: Clients[] | string }> {
    try {
      const result = await getRepository(Clients).find({ 
        relations: ["orders"] 
      })
      return {
        status: true,
        data: result
      }
    } catch(err: unknown) {
      return {
        status: false,
        data: String(err)
      }
    }
  }

  async sendOrder(order: Orders): Promise<{ status: boolean; data: Orders | null }> {
    try {
      const result = await getRepository(Orders).save(order);
      return {
        status: true,
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
