export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export class TaskEntity {
  id: string;
  title: string;
  description: string;
  status: TaskStatus
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  position?: number;

  constructor(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    createdAt?: string,
    updatedAt?: string,
    userId?: string,
    position?: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.position = position;
  }
}
