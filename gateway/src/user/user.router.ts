import { Router } from "express";

import { validation } from "../shared/middlewares/validations";

import { userController } from "./user.dependencies";
import { SignInDto, SignUpDto } from "./user.dto";

export const userRouter = Router();

userRouter.post("/signup", validation(SignUpDto), userController.signup.bind(userController)).post("/signin", validation(SignInDto), userController.signin.bind(userController));
