import { GamesController } from "./games.controller";
import { GameRespository } from "./games.respository";
import { GameService } from "./games.service";

export const gameController = new GamesController(new GameService(new GameRespository()));
