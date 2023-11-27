import { Game, PrismaClient } from "@prisma/client";

import { ICreateGameDto, IUpdateGameDto } from "./games.dto";

type IGameRepository = {
  create(user: ICreateGameDto): Promise<Game>;
  delete(id: number): Promise<Game>;
  get(id: number): Promise<Game | null>;
  update(id: number, user: IUpdateGameDto): Promise<Game>;
};

export class GameRespository implements IGameRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  create(user: ICreateGameDto) {
    return this.client.game.create({ data: user });
  }

  get(id: number) {
    return this.client.game.findUnique({ where: { id, state: true } });
  }
  getAll() {
    return this.client.game.findMany({ where: { state: true } });
  }

  update(id: number, user: IUpdateGameDto) {
    return this.client.game.update({ where: { id, state: true }, data: user });
  }

  delete(id: number) {
    return this.client.game.update({ where: { id }, data: { state: false } });
  }
}
