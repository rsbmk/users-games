import { Router } from "express";

import { validation } from "../shared/controllers";

import { userController } from "./user.dependencies";
import { CreateUserDto, GetUsersDto, UpdateUserDto } from "./user.dto";

export const userRouter = Router();

userRouter
  .get("/:id", validation(GetUsersDto), userController.findById.bind(userController))
  .post("/", validation(CreateUserDto), userController.create.bind(userController))
  .patch("/:id", validation(UpdateUserDto), userController.update.bind(userController))
  .delete("/:id", validation(GetUsersDto), userController.delete.bind(userController));
