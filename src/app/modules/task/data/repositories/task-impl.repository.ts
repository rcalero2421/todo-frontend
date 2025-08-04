import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TaskRepository } from '@modules/task/domain/repositories';
import { TaskEntity } from '@modules/task/domain/entities';
import { TaskService } from '../services';
import { TaskMapper } from '../mappers';
import { ResponseI } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class TaskImplRepository implements TaskRepository {
  private mapper = new TaskMapper();

  constructor(private taskService: TaskService) {}

  createTask(task: Partial<TaskEntity>): Observable<ResponseI<TaskEntity>> {
    return this.taskService.create(this.mapper.mapTo(task as TaskEntity)).pipe(
      map(res => ({
        ...res,
        data: this.mapper.mapFrom(res.data),
      }))
    );
  }

  updateTask(id: string, task: Partial<TaskEntity>): Observable<ResponseI<TaskEntity>> {
    return this.taskService.update(id, this.mapper.mapTo(task as TaskEntity)).pipe(
      map(res => ({
        ...res,
        data: this.mapper.mapFrom(res.data),
      }))
    );
  }

  deleteTask(id: string): Observable<ResponseI<null>> {
    return this.taskService.delete(id);
  }

  getTasks(): Observable<ResponseI<TaskEntity[]>> {
    return this.taskService.getTasks().pipe(
      map(res => ({
        ...res,
        data: res.data.map(task => this.mapper.mapFrom(task)),
      }))
    );
  }
}
