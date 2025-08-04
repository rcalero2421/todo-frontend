import { TaskEntity } from '@modules/task/domain/entities/task.entity';

export interface TaskStateModel {
  tasks: TaskEntity[];
}
