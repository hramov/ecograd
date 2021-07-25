import { Request, Response } from "express";
import { toConsole } from "../utils/log";
import { AuthProvider } from "../providers/AuthProvider";
import { JWT } from "../utils/jwt/index";
import { Controller } from "./Controller";

export class AuthController extends Controller {
  async getUsers(req: Request, res: Response) {
    const auth = new AuthProvider();
    const users = await auth.getUsers();
    res.status(200).json(users);
  }

  async getUser(req: Request, res: Response) {
    const auth = new AuthProvider();
    const user = await auth.singleUser(req.params.id);
    res.status(200).json(user[0]);
  }

  async formLogin(req: Request, res: Response) {
    const auth = new AuthProvider();
    const result = await auth.getUser(req.body.login, req.body.password);
    if (result.status) {
      const jwt = new JWT();
      const jwt_token = jwt.createJWT(600000, result.data!.id!, "admin");
      res.status(200).json({
        status: result.status,
        jwt_token: jwt_token,
        user: result.data
      });
      return;
    }
    res.status(401).send("Unauthenticated!");
  }

  async googleLogin() {
    /**
     * Login for login via google oauth2.0
     */
  }

  async formRegister(req: Request, res: Response) {
    const auth = new AuthProvider();
    const result = await auth.addUser({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      role: req.body.role,
      birthdate: req.body.birthdate,
      login: req.body.login,
      password: req.body.password,
      telegram_id: req.body.telegram_id,
    });
    if (result.status) {
      res.status(200).json({
        status: result.status,
        data: result.data,
      });
      return;
    }
    res.status(201).json({
      status: result.status,
      data: result.data,
    });
  }

  async formLogout(req: Request, res: Response) {
    const auth = new AuthProvider();
    const result = auth.logout(Number(req.params.id));
    res.status(200).send("OK");
  }
}