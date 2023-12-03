import { CONFI_CHANNELS, MessageBroker } from "packages/messageBroker";

import { UserController } from "./user.controller";
import { UserRespository } from "./user.respository";
import { UserService } from "./user.service";

const userRepository = new UserRespository();
const messageBroker = new MessageBroker(CONFI_CHANNELS.USER.PUBLISH, CONFI_CHANNELS.USER.SUBSCRIBE);
const userService = new UserService(userRepository, messageBroker);

export const userController = new UserController(userService);
