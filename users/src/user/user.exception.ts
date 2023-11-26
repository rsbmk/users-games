import { CustomsExceptions } from "../shared/customs.exeptions";

export class UserNotFoundException extends CustomsExceptions {
  constructor(data: unknown, message?: string) {
    message = message || "User not found";

    super(message, data, 404);
    this.name = "UserNotFoundException";
    this.stack = "";
  }
}
