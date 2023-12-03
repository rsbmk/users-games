import type { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { Controller } from "../controller";

type User = {
  id: number;
  ege: number;
  name: string;
  email: string;
  username: string;
  password: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface AuthRequest<P = ParamsDictionary, ResBody = unknown, ReqBody = unknown, ReqQuery = qs.ParsedQs, Locals extends Record<string, unknown> = Record<string, unknown>>
  extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
}

export class AuthMiddleware extends Controller {
  run(req: AuthRequest, res: Response, next: NextFunction) {
    const userHead = req.headers["user"] as string | undefined;
    if (!userHead) return this.error({}, res, { message: "Unauthorized", req, status: 401 });

    const user = JSON.parse(userHead) as User;
    req.user = user;

    next();
  }
}
