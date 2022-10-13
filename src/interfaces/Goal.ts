import { Task } from './Task';

export interface Goal {
  progress: number;
  name: string;
  createdAt: Date;
  id: string;
  userId: string;
}

export interface CompleteGoal {
  tasks: Task[];
  progress: number;
  name: string;
  createdAt: Date;
  id: string;
  userId: string;
}
