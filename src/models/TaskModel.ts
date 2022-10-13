import { model, Schema } from 'mongoose';

import { Task } from '../interfaces';

const TaskSchema = new Schema<Task>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  goalId: { type: String, required: true },
});

interface TaskDocument extends Task, Document {}

export const TaskModel = model<TaskDocument>('tasks', TaskSchema);
