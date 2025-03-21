import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";

import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
const scrypt = promisify(_scrypt);
import { SignInDto } from "./dtos/signIn.dto";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(user: CreateUserDto) {
    const users = await this.usersService.find(user.email);

    if (users.length) {
      throw new BadRequestException("Registration Failed!");
    }

    try {
      // Hash the user's password
      const salt = randomBytes(8).toString("hex");
      const hash = (await scrypt(user.password, salt, 32)) as Buffer;
      const resultHashPass = salt + "." + hash.toString("hex");

      // Create the new user without the role
      const userToCreate = await this.usersService.create(
        user.email,
        resultHashPass,
      );

      const payload = {
        sub: userToCreate.id,
        email: userToCreate.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException("Email is already in use!");
    }
  }

  async login(userLog: SignInDto) {
    try {
      const { email, password } = userLog;
      const existingUser = await this.usersService.findOne(email);

      if (!existingUser) {
        throw new NotFoundException("User not found");
      }

      const [salt, storedHash] = existingUser.password.split(".");
      const enteredHash = (await scrypt(password, salt, 32)) as Buffer;

      if (storedHash !== enteredHash.toString("hex")) {
        throw new UnauthorizedException("Invalid password");
      }

      const payload = {
        sub: existingUser.id,
        email: existingUser.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException("Error user login");
    }
  }
}
