import { Router } from "express";

import { validation } from "../shared/controllers";

import { userController } from "./user.dependencies";
import { CreateUserDto } from "./user.dto";

const userRouter = Router();

userRouter
  .get("/:id", userController.findById.bind(userController))
  .post("/", validation(CreateUserDto), userController.create.bind(userController))
  .put("/:id", userController.update.bind(userController))
  .delete("/:id", userController.delete.bind(userController));

export { userRouter };
