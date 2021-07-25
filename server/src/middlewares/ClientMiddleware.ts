import { NextFunction, Request, Response } from "express";
import { JWT } from "../utils/jwt";
import { Middleware } from "./Middleware";

export class ClientMiddleware extends Middleware {

    check(req: Request, res: Response, next: NextFunction) {
        const jwt_token = req.get("Authorization")
        if (jwt_token) {
            const jwt = new JWT()
            if (jwt.verifyJWT(jwt_token)) {
                next()
                return
            }
        }
        // res.redirect('/api/v1/login')
    }
}