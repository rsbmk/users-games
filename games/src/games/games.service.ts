import { IMessageBroker } from "packages/messageBroker";

import { ICreateGameDto, IUpdateGameDto } from "./games.dto";
import { GameNotFoundException } from "./games.exception";
import { IGameRepository } from "./games.respository";

export class GameService {
  constructor(private readonly gameRepository: IGameRepository, private readonly messageBroker: IMessageBroker) {}

  create(game: ICreateGameDto) {
    return this.gameRepository.create(game);
  }

  findAll() {
    return this.gameRepository.getAll();
  }

  async find(id: number) {
    const game = await this.gameRepository.get(id);
    if (!game) throw new GameNotFoundException({ id });

    const message = {
      game,
      message: "Game found",
    };

    this.messageBroker.publish(JSON.stringify(message));

    return game;
  }

  update(id: number, game: IUpdateGameDto) {
    return this.gameRepository.update(id, game);
  }

  delete(id: number) {
    return this.gameRepository.delete(id);
  }
}
