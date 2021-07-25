import { NextFunction, Request, Response } from "express";
import { JWT } from "../utils/jwt";
import { Middleware } from "./Middleware";

export class AdminMiddleware extends Middleware {
  check(req: Request, res: Response, next: NextFunction) {
    const jwt_token = req.get("Authorization");
    console.log(jwt_token)
    if (jwt_token) {
      const jwt = new JWT();
      if (jwt.verifyJWT(jwt_token, "admin")) {
        next();
        return;
      }
    }
    res.json({
        status: false,
        data: 'Cannot get Authorization token'
    })
  }
}