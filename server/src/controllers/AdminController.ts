import { Request, Response } from "express-serve-static-core";
import { AdminProvider } from "../providers/AdminProvider";
import { JWT } from "../utils/jwt";
import { Controller } from "./Controller";
/**
 * This controller is responsible for receiving the data for the dashboard section
 */
export class AdminController extends Controller {
  async getDashboard(req: Request, res: Response) {
    res.status(200).send("Hello world!");
  }

  async getOrders(req: Request, res: Response) {
    const result = await new AdminProvider().getOrders();
    res.status(200).json(result);
  }

  async getSingleOrder(req: Request, res: Response) {
    const result = await new AdminProvider().getSingleOrder(
      Number(req.params.id)
    );
    res.status(200).json(result);
  }

  checkJWT(req: Request, res: Response) {
    const token = req.body.token;
    const result = new JWT().verifyJWT("Bearer " + token, "admin");
    if (result) {
      res.status(200).send({ status: true, data: token });
      return;
    }
    res.status(401).send({ status: false, data: "Unathorized" });
  }
}
