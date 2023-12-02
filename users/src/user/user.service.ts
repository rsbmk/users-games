import { MessageBroker } from "../shared/message.broker";
import { IUpdateUserDto } from "./user.dto";
import { UserNotFoundException } from "./user.exception";
import { UserRespository } from "./user.respository";

export class UserService {
  constructor(private readonly userRepository: UserRespository, private readonly messageBroker: MessageBroker) {}

  async find(id: number) {
    const user = await this.userRepository.get(id);
    if (!user) throw new UserNotFoundException({ id });

    const message = {
      user,
      message: "User found",
    };

    this.messageBroker.publish(JSON.stringify(message));

    return user;
  }

  update(id: number, user: IUpdateUserDto) {
    return this.userRepository.update(id, user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
