/* eslint-disable prettier/prettier */
import { Task } from "./Task";

export interface Goal {
  progress: number;
  name: string;
  createdAt: Date;
  goalId: string;
  userId: string;
  tasks?: Task[];
}

export interface CompleteGoal {
  tasks: Task[];
  progress: number;
  name: string;
  createdAt: Date;
  goalId: string;
  userId: string;
}
