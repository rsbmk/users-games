import { MessageBroker } from "../shared/message.broker";
import { GamesController } from "./games.controller";
import { GameRespository } from "./games.respository";
import { GameService } from "./games.service";

const gameService = new GameService(new GameRespository(), new MessageBroker());
export const gameController = new GamesController(gameService);
