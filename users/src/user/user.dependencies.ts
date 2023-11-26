import { UserController } from "./user.controller";
import { UserRespository } from "./user.respository";
import { UserService } from "./user.service";

export const userController = new UserController(new UserService(new UserRespository()));
