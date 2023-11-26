import { Request, Response } from "express";

import { Controller } from "../shared/controllers";
import { ICreateGameDto, IGetGamesDto, IUpdateGameDto } from "./games.dto";
import { GameService } from "./games.service";

export class GamesController extends Controller {
  constructor(private readonly gameService: GameService) {
    super();
  }

  async findById(req: Request<IGetGamesDto>, res: Response) {
    try {
      const user = await this.gameService.find(+req.params.id);
      return this.success(user, res, { req, message: "Game found" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async create(req: Request<Request["params"], unknown, ICreateGameDto>, res: Response) {
    try {
      const userCreated = await this.gameService.create(req.body);
      return this.success(userCreated, res, { req, status: 201, message: "Game created" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async update(req: Request<IGetGamesDto, unknown, IUpdateGameDto>, res: Response) {
    try {
      const userUpdated = await this.gameService.update(+req.params.id, req.body);
      return this.success(userUpdated, res, { req, message: "Game updated" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }

  async delete(req: Request<IGetGamesDto>, res: Response) {
    try {
      const userDeleted = await this.gameService.delete(+req.params.id);
      return this.success(userDeleted, res, { req, message: "Game deleted" });
    } catch (error) {
      this.catchError(error, res, { req });
    }
  }
}
