import { TaskEntity } from '@modules/task/domain/entities/task.entity';

export class GetTasksAction {
  static readonly type = '[Task] Get Tasks';
}

export class CreateTaskAction {
  static readonly type = '[Task] Create Task';
  constructor(public task: Partial<TaskEntity>) {}
}

export class UpdateTaskAction {
  static readonly type = '[Task] Update Task';
  constructor(public task: TaskEntity) {}
}

export class DeleteTaskAction {
  static readonly type = '[Task] Delete Task';
  constructor(public id: string) {}
}
