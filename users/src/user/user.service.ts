import { ICreateUserDto } from "./user.dto";
import { UserRespository } from "./user.respository";

export class UserService {
  constructor(private readonly userRepository: UserRespository) {}

  create(user: ICreateUserDto) {
    return user;
  }
}
