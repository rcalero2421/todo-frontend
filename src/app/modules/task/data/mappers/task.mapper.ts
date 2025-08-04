import { Mapper } from '@core/utils';
import { TaskModel } from '../models/task.model';
import { TaskEntity, TaskStatus } from '@modules/task/domain/entities/task.entity';

const STATUS_MAP_TO_MODEL: Record<TaskStatus, TaskModel['status']> = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

const STATUS_MAP_FROM_MODEL: Record<TaskModel['status'], TaskStatus> = {
  todo: 'TODO',
  in_progress: 'IN_PROGRESS',
  completed: 'COMPLETED',
};

export class TaskMapper implements Mapper<TaskModel, TaskEntity> {
  mapFrom(param: TaskModel): TaskEntity {
    return new TaskEntity(
      param.id,
      param.title,
      param.description,
      STATUS_MAP_FROM_MODEL[param.status],
      param.createdAt,
      param.updatedAt,
      param.userId
    );
  }

  mapTo(param: TaskEntity): TaskModel {
    return {
      id: param.id,
      title: param.title,
      description: param.description,
      status: STATUS_MAP_TO_MODEL[param.status],
      createdAt: param.createdAt ?? '',
      updatedAt: param.updatedAt ?? '',
      userId: param.userId ?? ''
    };
  }
}
