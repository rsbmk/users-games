import { Request, Response } from "express";

export class HealthController {
  getHealth(req: Request, res: Response) {
    return res.status(200).send("OK");
  }
  getPing(req: Request, res: Response) {
    return res.status(200).send("Pong");
  }
}
