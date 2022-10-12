import { Goal } from "../interfaces";
import { GoalModel } from "../models/GoalModel";

class GoalApp {
  constructor() { }

  async create(goal: Goal): Promise<Goal> {
    await GoalModel.create(goal);
    return goal;
  }

  async delete(id: string): Promise<void> {
    await GoalModel.deleteOne({ id });
  }
}

const goalApp = new GoalApp();
export { goalApp };
