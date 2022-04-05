import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PositionMobileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;
}
