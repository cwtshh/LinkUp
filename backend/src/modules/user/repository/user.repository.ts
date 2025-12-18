import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import bcrypt, { hash } from "bcryptjs";

export class UserRepository {
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password: password,
    });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }
}
