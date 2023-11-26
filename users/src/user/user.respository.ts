import { PrismaClient, User } from "@prisma/client";

import { ICreateUserDto, IUpdateUserDto } from "./user.dto";

type UserWithouPassword = Omit<User, "password">;

type IUserRepository = {
  create(user: ICreateUserDto): Promise<UserWithouPassword>;
  get(id: number): Promise<UserWithouPassword | null>;
  update(id: number, user: IUpdateUserDto): Promise<UserWithouPassword>;
  delete(id: number): Promise<UserWithouPassword>;
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

  create(user: ICreateUserDto) {
    return this.client.user.create({ data: user, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  get(id: number) {
    return this.client.user.findUnique({ where: { id, state: true }, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  getByUsername(username: string) {
    return this.client.user.findUnique({ where: { username, state: true }, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  getByEmail(email: string) {
    return this.client.user.findUnique({ where: { email, state: true }, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  update(id: number, user: IUpdateUserDto) {
    return this.client.user.update({ where: { id, state: true }, data: user, select: SELECT_USER_WITHOUT_PASSWORD });
  }

  delete(id: number) {
    return this.client.user.update({ where: { id }, data: { state: false }, select: SELECT_USER_WITHOUT_PASSWORD });
  }
}
