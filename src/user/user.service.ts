import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) throw new ConflictException('Email already exists.');

    const newUser = await this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    // EXTRACTING THE PASSWORD FIELD BEFORE RETURNING USER
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
