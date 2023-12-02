import { UserController } from "./user.controller";
import { UserRespository } from "./user.respository";
import { UserService } from "./user.service";

const userRepository = new UserRespository();
const userService = new UserService(userRepository);

export const userController = new UserController(userService);
