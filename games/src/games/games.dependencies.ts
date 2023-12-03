import { CONFI_CHANNELS, MessageBroker } from "packages/messageBroker";
import { GamesController } from "./games.controller";
import { GameRespository } from "./games.respository";
import { GameService } from "./games.service";

const messageBroker = new MessageBroker(CONFI_CHANNELS.GAME.PUBLISH, CONFI_CHANNELS.GAME.SUBSCRIBE);
const gameService = new GameService(new GameRespository(), messageBroker);

export const gameController = new GamesController(gameService);
