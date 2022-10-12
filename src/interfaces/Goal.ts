import { Task } from "./Task";

export interface Goal {
  tasks: Task[];
  progress: number;
  name: string;
  createdAt: Date;
  id: string;
  userId: string;
}