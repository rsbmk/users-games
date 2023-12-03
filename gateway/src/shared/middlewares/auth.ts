import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Controller } from "../controllers";

export class AuthMiddleware extends Controller {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = this.getToken(req);

    if (!token) {
      return this.error({}, res, { message: "No token provided", req, status: 403 });
    }

    const secret = process.env.SECRET;
    if (!secret) return this.error({}, res, { message: "Secret not found", req, status: 500 });

    try {
      const decoded = jwt.verify(token, secret);
      req.headers["user"] = JSON.stringify(decoded);
      next();
    } catch (err) {
      return this.catchError(err, res, { message: "Invalid token", req, status: 401 });
    }
  }

  private getToken(req: Request) {
    return req.headers["authorization"]?.split(" ")[1];
  }
}
