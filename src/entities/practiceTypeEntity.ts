import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TasksEntity } from './tasksEntity';

@Entity()
export class PracticeTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => TasksEntity, (task) => task.practiceType)
  tasks: TasksEntity[];
}
