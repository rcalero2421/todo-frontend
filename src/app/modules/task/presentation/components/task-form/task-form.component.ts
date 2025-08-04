import {
    Component,
    EventEmitter,
    Input,
    Output,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskEntity, TaskStatus } from '@modules/task/domain/entities/task.entity';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Store } from '@ngxs/store';
import { CreateTaskAction, UpdateTaskAction } from '@modules/task/application/store/task';
import { AlertService, SpinnerService } from '@core/services';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
    ],
    templateUrl: './task-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
    @Input() userId!: string;
    @Input() task: TaskEntity | null = null;
    @Output() save = new EventEmitter<TaskEntity>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;
    statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private spinner: SpinnerService,
        private alert: AlertService
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: [''],
            status: ['TODO', Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.task) {
            this.form.patchValue(this.task);
        }
    }

    onSubmit(): void {
        if (this.form.valid && this.userId) {
            const isEdit = !!this.task?.id;
            const task: TaskEntity = {
                ...this.task,
                ...this.form.value,
                userId: this.userId,
            };

            const action = task.id
                ? new UpdateTaskAction(task)
                : new CreateTaskAction({
                    ...task,
                    createdAt: task.createdAt || new Date().toISOString(),
                });

            this.spinner.show();

            this.store.dispatch(action).subscribe({
                next: () => {
                    this.spinner.hide();

                    const message = isEdit ? 'Task updated successfully' : 'Task created successfully';
                    this.alert.showSuccess(message);

                    this.save.emit(task);
                },
                error: () => {
                    this.spinner.hide();
                    this.alert.showError('Failed to save task');
                },
            });
        }
    }


    onCancelForm(): void {
        this.cancel.emit();
    }
}
