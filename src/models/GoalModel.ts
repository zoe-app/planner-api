/* eslint-disable prettier/prettier */
import { model, Schema } from "mongoose";

import { Goal } from "../interfaces";

const GoalSchema = new Schema<Goal>({
  name: { type: String, required: true },
  goalId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  progress: { type: Number, required: true },
  tasks: { type: [] },
});

interface GoalDocument extends Goal, Document {}

export const GoalModel = model<GoalDocument>("goals", GoalSchema);
