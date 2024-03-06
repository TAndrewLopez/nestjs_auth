import { Module } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, DatabaseService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
