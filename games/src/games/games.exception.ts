import { CustomsExceptions } from "packages/controller";

export class GameNotFoundException extends CustomsExceptions {
  constructor(data: unknown, message?: string) {
    message = message || "Game not found";

    super(message, data, 404);
    this.name = "GameNotFoundException";
    this.stack = "";
  }
}
