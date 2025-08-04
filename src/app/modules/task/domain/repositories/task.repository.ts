import { Observable } from 'rxjs';
import { ResponseI } from '@core/utils';
import { TaskEntity } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract createTask(task: Partial<TaskEntity>): Observable<ResponseI<TaskEntity>>;
  abstract updateTask(id: string, task: Partial<TaskEntity>): Observable<ResponseI<TaskEntity>>;
  abstract deleteTask(id: string): Observable<ResponseI<null>>;
  abstract getTasks(): Observable<ResponseI<TaskEntity[]>>;
}
