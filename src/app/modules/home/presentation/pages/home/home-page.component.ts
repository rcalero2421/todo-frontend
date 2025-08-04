import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';

import { UserEntity } from '@modules/auth/domain/entities';
import { GetUserAction, UserState } from '@modules/auth/application/store/user';
import { TaskEntity } from '@modules/task/domain/entities';
import { GetTasksAction, TaskState } from '@modules/task/application/store/task';
import { DialogModule } from 'primeng/dialog';

const MODULES = [
  CommonModule,
  FormsModule,
  CardModule,
  ButtonModule,
  TooltipModule,
  DialogModule,
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MODULES],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit, OnDestroy {
  user$: Observable<UserEntity | null>;
  taskCounts = {
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  };
  showHelpDialog = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.user$ = this.store.select(UserState.getUser);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUserAction());
    this.store.dispatch(new GetTasksAction());

    const taskSub = this.store.select(TaskState.getTasks).subscribe((tasks: TaskEntity[]) => {
      this.taskCounts.total = tasks.length;
      this.taskCounts.todo = tasks.filter(t => t.status === 'TODO').length;
      this.taskCounts.inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
      this.taskCounts.completed = tasks.filter(t => t.status === 'COMPLETED').length;
      this.cdr.markForCheck();
    });

    this.subscriptions.push(taskSub);
  }

  goToTasks(): void {
    this.router.navigate(['/task']);
  }

  openHelp(): void {
    this.showHelpDialog = true;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
