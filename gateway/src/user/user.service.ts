import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import omit from "lodash/omit";

import { ISignInUserDto, ISignUpUserDto } from "./user.dto";
import { InvalidPasswordException, UserNotFoundException } from "./user.exception";
import { IUserRepository } from "./user.respository";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async signUp(user: ISignUpUserDto) {
    // TODO: Create exception for this case - user already exists/invalid user -> 409
    // UserAlreadyExistsException
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const createdUser = await this.userRepository.create(user);
    return omit(createdUser, ["password"]);
  }

  async signIn({ password, username }: ISignInUserDto) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new UserNotFoundException({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidPasswordException({ username });

    const secret = process.env.SECRET;
    if (!secret) throw new Error("Secret not found"); // internal error not for client

    return jwt.sign(omit(user, ["password"]), secret, { expiresIn: "1d" });
  }
}
