import { CustomsExceptions } from "packages/controller";

export class UserNotFoundException extends CustomsExceptions {
  constructor(data: unknown, message?: string) {
    message = message || "User not found";

    super(message, data, 404);
    this.name = "UserNotFoundException";
    this.stack = "";
  }
}

export class InvalidPasswordException extends CustomsExceptions {
  constructor(data: unknown, message?: string) {
    message = message || "Invalid user or password";

    super(message, data, 401);
    this.name = "InvalidPasswordException";
    this.stack = "";
  }
}

export class UserAlreadyExistsException extends CustomsExceptions {
  constructor(data: unknown, message?: string) {
    message = message || "User already exists";

    super(message, data, 409);
    this.name = "UserAlreadyExistsException";
    this.stack = "";
  }
}
