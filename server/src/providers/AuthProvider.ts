import { getRepository } from "typeorm";

import { Users } from "../database/entity/Users";
import { Provider } from "./Provider";
import { isUserType, IUser } from "./../controllers/Controller";
import { sendNewMember } from "../controllers/Telegram/Messages";

export class AuthProvider extends Provider {
  async getUsers(role?: string): Promise<IUser[]> {
    if (role != "") {
      return await getRepository(Users).find({
        where: [{ role: role }],
      });
    }
    return await getRepository(Users).find();
  }

  async singleUser(id: string): Promise<IUser[]> {
    const user = await getRepository(Users).find({
      where: [{ id: id }],
    });
    return user;
  }

  async getUser(login: string, password: string): Promise<{status: boolean, data: IUser | null }> {
    const checkedLogin = this.checkParams(login);
    const checkedPassword = this.checkParams(password);
    if (checkedLogin && checkedPassword) {
      const result = await getRepository(Users).find({
        where: [{ login: login, password: password }],
      });

      if (result.length == 1) {
        return {
          status: true,
          data: result[0],
        };
      }
    }
    return {
      status: false,
      data: null,
    };
  }

  async addUser(
    user: IUser
  ): Promise<{ status: boolean; data: IUser | string }> {
    const userRepository = getRepository(Users);
    let error: string = "";
    try {
      const result = await userRepository.save(user);
      if (result.id) {
        sendNewMember(result);
        return {
          status: true,
          data: user,
        };
      }
    } catch (err: unknown) {
      error = String(err);
    }
    return {
      status: false,
      data: error,
    };
  }

  async logout(id: number): Promise<IUser> {
    const userRepository = getRepository(Users);
    const result = await userRepository.find({
      where: [{ id: id }],
    });
    return result[0];
  }
}
