import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService, User } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): User[] {
    return this.appService.getHello();
  }
}
