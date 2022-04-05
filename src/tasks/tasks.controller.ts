import { Controller, Get, Param } from '@nestjs/common';
import { TasksEntity } from 'src/entities/tasksEntity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('accountId/:id')
  async getTasksByAccountId(@Param() params): Promise<TasksEntity[]> {
    return await this.tasksService.tasksByAccountId(params.id);
  }
}
