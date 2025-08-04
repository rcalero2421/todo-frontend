import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { TaskEntity } from '@modules/task/domain/entities/task.entity';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: TaskEntity;
  @Output() edit = new EventEmitter<TaskEntity>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
