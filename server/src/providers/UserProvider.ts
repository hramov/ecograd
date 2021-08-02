import { getRepository, UpdateResult } from "typeorm";
import { Orders } from "../database/entity/Order";
import { Users } from "../database/entity/Users";
import { Provider } from "./Provider";

export class UserProvider extends Provider {
  async takeOrderForUser(
    order: Orders,
    user: Users
  ): Promise<{
    status: boolean;
    data: UpdateResult | null;
    error: string;
  }> {
    try {
      order.exec = user;
      order.status = 'work'
      const result = await getRepository(Orders).update(order.id, order);
      return {
        status: true,
        data: result,
        error: "",
      };
    } catch (err: unknown) {
      return {
        status: false,
        data: null,
        error: String(err),
      };
    }
  }
}
