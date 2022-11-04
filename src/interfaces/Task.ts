export interface Task {
  taskId: string;
  createdAt: Date;
  text: string;
  isDone: boolean;
  userId: string;
  goalId: string;
}
