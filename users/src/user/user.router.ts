import { Router } from "express";

import { validation } from "packages/middleware";

import { userController } from "./user.dependencies";
import { GetUsersDto, UpdateUserDto } from "./user.dto";

export const userRouter = Router();

userRouter
  .get("/:id", validation(GetUsersDto), userController.findById.bind(userController))
  .patch("/:id", validation(UpdateUserDto), userController.update.bind(userController))
  .delete("/:id", validation(GetUsersDto), userController.delete.bind(userController));
