import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TasksEntity } from './tasksEntity';

@Entity()
export class PositionDesktopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;
}
