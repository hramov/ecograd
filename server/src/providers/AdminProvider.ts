import { getRepository } from "typeorm";
import { Orders } from "../database/entity/Order";
import { Provider } from "./Provider";

export class AdminProvider extends Provider {
    
  async getOrders() {
    const result = await getRepository(Orders).find({ relations: ['client']});
    if (result.length > 0) return { status: true, data: result };
    return { status: false, data: [] };
  }

  async getSingleOrder(id: number) {
    const result = await getRepository(Orders).find({
      where: [{ id: id }],
    });
    if (result.length > 0) return { status: true, data: result };
    return { status: false, data: [] };
  }
}
