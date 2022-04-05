import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from './roleEntity';
import { TasksEntity } from './tasksEntity';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => TasksEntity, (task) => task.account)
  tasks: TasksEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.account)
  roles: RoleEntity[];
}
