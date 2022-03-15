import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AccountEntity } from 'src/entities/accountEntity';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('accounts')
  getContact(): Promise<AccountEntity[]> {
    return this.authService.getAccounts();
  }

  @Post('login')
  async login(@Request() req) {
    console.log(req.body);
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Request() req) {
    return await this.authService.register(req.body as AccountEntity);
  }
}
