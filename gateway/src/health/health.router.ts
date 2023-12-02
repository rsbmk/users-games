import { Router } from "express";
import { HealthController } from "./health.controller";

const healthRouter = Router();
const healthController = new HealthController();

healthRouter
  .get("/", healthController.getHealth.bind(healthController))
  .get("/ping", healthController.getPing.bind(healthController));

export { healthRouter };
