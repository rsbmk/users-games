import bcrypt from "bcrypt";
import omit from "lodash/omit";

import { ICreateUserDto, IUpdateUserDto } from "./user.dto";
import { UserNotFoundException } from "./user.exception";
import { UserRespository } from "./user.respository";

export class UserService {
  constructor(private readonly userRepository: UserRespository) {}

  async create(user: ICreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const createdUser = await this.userRepository.create(user);
    return omit(createdUser, ["password"]);
  }

  async find(id: number) {
    const user = await this.userRepository.get(id);
    if (!user) throw new UserNotFoundException({ id });

    return user;
  }

  update(id: number, user: IUpdateUserDto) {
    return this.userRepository.update(id, user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
