import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  create(email: string, password: string) {
    const user = this.userRepository.create({
      email,
      password,
    });

    return this.userRepository.save(user).then((createdUser) => {
      // Return a simplified version of the user without the password
      const { id, email, created, updated, deleted } = createdUser;
      return { id, email, created, updated, deleted };
    });
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async find(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
