import { PrismaClient, User } from "@prisma/client";

import { ISignUpUserDto } from "./user.dto";

type UserWithouPassword = Omit<User, "password">;

export type IUserRepository = {
  create(user: ISignUpUserDto): Promise<UserWithouPassword>;
  findByUsername(username: string): Promise<User | null>;
};

const SELECT_USER_WITHOUT_PASSWORD = {
  id: true,
  ege: true,
  name: true,
  email: true,
  username: true,
  state: true,
  createdAt: true,
  updatedAt: true,
};

export class UserRespository implements IUserRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  create(user: ISignUpUserDto) {
    return this.client.user.create({ data: user, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  findByUsername(username: string) {
    return this.client.user.findFirst({ where: { username, state: true } }).catch(() => null);
  }
}
