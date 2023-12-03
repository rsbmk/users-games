import { Router } from "express";

import { validation } from "packages/middleware";

import { gameController } from "./games.dependencies";
import { CreateGameDto, GetGameDto, UpdateGameDto } from "./games.dto";

export const gameRouter = Router();

gameRouter
  .get("/", gameController.findAll.bind(gameController))
  .get("/:id", validation(GetGameDto), gameController.findById.bind(gameController))
  .post("/", validation(CreateGameDto), gameController.create.bind(gameController))
  .patch("/:id", validation(UpdateGameDto), gameController.update.bind(gameController))
  .delete("/:id", validation(GetGameDto), gameController.delete.bind(gameController));
