import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AccountEntity } from './accountEntity';
import { PositionDesktopEntity } from './positionDesktopEntity';
import { PositionMobileEntity } from './positionMobileEntity';
import { PracticeTypeEntity } from './practiceTypeEntity';

@Entity()
export class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => AccountEntity, (account) => account.tasks)
  account: AccountEntity;

  @OneToOne(() => PositionDesktopEntity)
  @JoinColumn()
  positionDesktop: PositionDesktopEntity;

  @OneToOne(() => PositionMobileEntity)
  @JoinColumn()
  positionMobile: PositionMobileEntity;

  @ManyToOne(() => PracticeTypeEntity, (practiceType) => practiceType.tasks)
  practiceType: PracticeTypeEntity;

  @Column()
  practiceId: string;
}
