import { model, Schema } from 'mongoose';

import { Goal } from '../interfaces';

const GoalSchema = new Schema<Goal>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  progress: { type: Number, required: true },
});

interface GoalDocument extends Goal, Document {}

export const GoalModel = model<GoalDocument>('goals', GoalSchema);
