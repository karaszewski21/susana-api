import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from 'src/entities/tasksEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
  ) {}

  async tasksByAccountId(accountId: number): Promise<TasksEntity[]> {
    return this.tasksRepository.find({
      where: {
        account: {
          id: accountId,
        },
      },
    });
  }
}
