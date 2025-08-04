import { Provider } from '@angular/core';
import { TaskRepository } from '../domain/repositories/task.repository';
import { TaskImplRepository } from '../data/repositories/task-impl.repository';

export const taskConfig: Provider[] = [
  {
    provide: TaskRepository,
    useClass: TaskImplRepository,
  },
];
