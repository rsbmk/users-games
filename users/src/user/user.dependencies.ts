import { MessageBroker } from "../shared/message.broker";
import { UserController } from "./user.controller";
import { UserRespository } from "./user.respository";
import { UserService } from "./user.service";

const userRepository = new UserRespository();
const messageBroker = new MessageBroker();
const userService = new UserService(userRepository, messageBroker);

export const userController = new UserController(userService);
