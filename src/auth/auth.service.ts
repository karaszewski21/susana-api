import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/accountEntity';
import passport from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: any) {
    try {
      const account = await this.accountsRepository.findOne({
        where: {
          login: data.username,
        },
      });

      const isPasswordMatching = await bcrypt.compare(
        data.password,
        account.password,
      );

      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { username: account.login, sub: account.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(data: any): Promise<AccountEntity> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const account = await this.accountsRepository.save({
        login: data.username,
        password: hashedPassword,
      });

      return await this.accountsRepository.findOne({
        select: ['login'],
        where: {
          login: account.login,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAccounts(): Promise<AccountEntity[]> {
    return this.accountsRepository.find({ select: ['login'] });
  }
}
