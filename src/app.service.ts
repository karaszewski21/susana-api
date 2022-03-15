import { Injectable } from '@nestjs/common';

export interface User {
  name: string;
  age: number;
}

@Injectable()
export class AppService {
  getHello(): User[] {
    return [
      { name: 'Patryk', age: 29 },
      { name: 'Zuzanna', age: 30 },
    ];
  }
}
