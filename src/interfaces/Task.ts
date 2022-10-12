export interface Task {
  id: string;
  createdAt: Date;
  text: string;
  isDone: boolean;
  userId: string;
}
