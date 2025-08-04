import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { TaskEntity, TaskStatus } from '@modules/task/domain/entities/task.entity';
import { TaskState } from '@modules/task/application/store/task/task.state';
import { GetTasksAction, DeleteTaskAction, UpdateTaskAction } from '@modules/task/application/store/task';
import { TaskFormComponent } from '@modules/task/presentation/components/task-form/task-form.component';
import { UserState } from '@modules/auth/application/store/user';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { AlertService, CustomConfirmDialogService, SpinnerService } from '@core/services';

const MODULES = [
  CommonModule,
  FormsModule,
  CardModule,
  ButtonModule,
  DragDropModule,
  TaskFormComponent,
  TaskItemComponent
];

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MODULES],
  templateUrl: './task-page.component.html',
})
export default class TaskPageComponent implements OnInit, AfterViewInit, OnDestroy {
  userId: string = '';
  tasks$!: Observable<TaskEntity[]>;
  statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
  dropListIds = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
  showForm = false;
  editTask: TaskEntity | null = null;

  localTasks: TaskEntity[] = [];
  private sub!: Subscription;

  constructor(
    private store: Store,
    private spinner: SpinnerService,
    private confirmService: CustomConfirmDialogService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const user = this.store.selectSnapshot(UserState.getUser);
    this.userId = user?.id ?? '';
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  private loadTasks(): void {
    this.spinner.show();
    this.store.dispatch(new GetTasksAction()).subscribe({
      next: () => {
        const tasks = this.store.selectSnapshot(TaskState.getTasks);
        this.localTasks = [...tasks];
        this.cdr.detectChanges();
      },
      complete: () => this.spinner.hide(),
    });
  }

  filterTasksByStatus(tasks: TaskEntity[], status: TaskStatus): TaskEntity[] {
    return tasks.filter(task => task.status === status);
  }

  trackByTask(index: number, task: TaskEntity) {
    return task.id;
  }

  drop(event: any, targetStatus: TaskStatus): void {
    const movedTask: TaskEntity = event.item.data;
    const previousStatus = movedTask.status;

    if (previousStatus !== targetStatus) {
      const index = this.localTasks.findIndex(t => t.id === movedTask.id);
      if (index !== -1) {
        const updatedTask: TaskEntity = {
          ...movedTask,
          status: targetStatus,
          position: event.currentIndex,
        };

        this.localTasks[index] = updatedTask;

        this.spinner.show();
        this.store.dispatch(new UpdateTaskAction(updatedTask)).subscribe({
          next: () => {
            this.alertService.showSuccess('Task updated successfully');
            this.loadTasks();
          },
          error: () => {
            this.alertService.showInfo(
              'No tasks found. Start by creating your first one!'
            );
            this.localTasks[index] = movedTask;
          },
          complete: () => this.spinner.hide(),
        });
      }
    }
  }

  deleteTask(id: string) {
    this.confirmService.confirm('Are you sure you want to delete this task?').subscribe((confirmed) => {
      if (confirmed) {
        this.spinner.show();
        this.store.dispatch(new DeleteTaskAction(id)).subscribe({
          next: () => {
            this.alertService.showSuccess('Task deleted successfully');
            this.loadTasks();
          },
          complete: () => this.spinner.hide(),
          error: () => this.spinner.hide(),
        });
      }
    });
  }

  openNewTaskForm(): void {
    this.editTask = null;
    this.showForm = true;
  }

  editExistingTask(task: TaskEntity): void {
    this.editTask = task;
    this.showForm = true;
  }

  onCancelForm(): void {
    this.showForm = false;
    this.editTask = null;
  }

  onSaveTask(): void {
    this.showForm = false;
    this.editTask = null;
    this.loadTasks();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
