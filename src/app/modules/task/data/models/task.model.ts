export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  userId: string;
}
