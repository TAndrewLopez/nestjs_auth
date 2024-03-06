import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() request: Request) {
    return await this.authService.refreshToken(request);
  }
}
