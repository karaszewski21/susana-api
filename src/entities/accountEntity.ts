import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;
}
