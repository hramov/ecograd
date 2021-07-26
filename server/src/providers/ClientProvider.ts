import { getRepository } from "typeorm";
import { Clients } from "../database/entity/Clients";
import { Orders } from "../database/entity/Order";
import { Provider } from "./Provider";

export class ClientProvider extends Provider {
  async getClients(): Promise<{ status: boolean; data: Clients[] | string }> {
    try {
      const result = await getRepository(Clients).find({
        relations: ["orders"],
      });
      return {
        status: true,
        data: result,
      };
    } catch (err: unknown) {
      return {
        status: false,
        data: String(err),
      };
    }
  }

  async sendOrder(
    order: Orders
  ): Promise<{ status: boolean; data: Orders | null }> {
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

  async getOrderForClient(
    id: number
  ): Promise<{ status: boolean; data: Orders[] }> {
    const result = await getRepository(Orders).find({
      where: [
        {
          client: id,
        },
      ],
    });
    return {
      status: true,
      data: result,
    };
  }

  async getOrdersForClientById(
    client_id: number,
    order_id: number
  ): Promise<{ status: boolean; data: Orders }> {
    const result = await getRepository(Orders).find({
      where: [
        {
          client: client_id,
          id: order_id,
        },
      ],
    });
    return {
      status: true,
      data: result[0],
    };
  }

  async addOrderFileUrl(
    order_id: number,
    url: string
  ): Promise<{ status: boolean; data: string }> {
    const result = await getRepository(Orders).update(order_id, {
      files_url: url,
    });
    return {
      status: true,
      data: "Success",
    };
  }
}
