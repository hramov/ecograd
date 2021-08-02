import { Request, Response } from "express";
import { UserProvider } from "../providers/UserProvider";
import { Controller } from "./Controller";

export class UserController extends Controller {
  async takeOrderForUser(req: Request, res: Response) {
    const order = req.body.order;
    const user = req.body.user;
    const result = await new UserProvider().takeOrderForUser(order, user);
    console.log(result);
    res.status(200).json({
      status: result.status,
      data: result.data,
      error: result.error,
    });
    return;
  }
}
