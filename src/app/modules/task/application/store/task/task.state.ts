import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TaskStateModel } from './task.state.model';
import {
  GetTasksAction,
  CreateTaskAction,
  UpdateTaskAction,
  DeleteTaskAction,
} from './task.actions';
import { TaskRepository } from '@modules/task/domain/repositories/task.repository';
import { TaskEntity } from '@modules/task/domain/entities/task.entity';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AlertService } from '@core/services';

@State<TaskStateModel>({
  name: 'taskState',
  defaults: {
    tasks: [],
  },
})
@Injectable()
export class TaskState {
  constructor(
    private taskRepository: TaskRepository,
    private alertService: AlertService
  ) { }

  @Selector()
  static getTasks(state: TaskStateModel): TaskEntity[] {
    return state.tasks;
  }

  @Action(GetTasksAction)
  getTasks({ setState }: StateContext<TaskStateModel>) {
    return this.taskRepository.getTasks().pipe(
      tap((response) => {
        console.log('[TaskState] Tasks fetched:', response.data);
        setState((state) => ({
          ...state,
          tasks: [...response.data],
        }));
      }),
      catchError(() => {
        this.alertService.showInfo(
          'No tasks found. Start by creating your first one!'
        );
        return of();
      })
    );
  }


  @Action(CreateTaskAction)
  createTask({ dispatch }: StateContext<TaskStateModel>, { task }: CreateTaskAction) {
    return this.taskRepository.createTask(task).pipe(
      switchMap(() => dispatch(new GetTasksAction())),
      catchError(() => {
        this.alertService.showError('Failed to create task');
        return of();
      })
    );
  }

  @Action(UpdateTaskAction)
  updateTask({ dispatch }: StateContext<TaskStateModel>, { task }: UpdateTaskAction) {
    return this.taskRepository.updateTask(task.id, task).pipe(
      switchMap(() => dispatch(new GetTasksAction())),
      catchError(() => {
        this.alertService.showError('Failed to update task');
        return of();
      })
    );
  }

  @Action(DeleteTaskAction)
  deleteTask({ dispatch }: StateContext<TaskStateModel>, { id }: DeleteTaskAction) {
    return this.taskRepository.deleteTask(id).pipe(
      switchMap(() => dispatch(new GetTasksAction())),
      catchError(() => {
        this.alertService.showError('Failed to delete task');
        return of();
      })
    );
  }
}
