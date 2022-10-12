import { Goal, Task } from '../interfaces';
import { GoalModel } from '../models';

class GoalApp {
  async create(goal: Goal): Promise<Goal> {
    await GoalModel.create(goal);
    return goal;
  }

  async delete(id: string): Promise<void> {
    await GoalModel.deleteOne({ id });
  }

  async updateTasks(id: string, tasks: Task[]) {
    const goal = await GoalModel.findOne({ id });
    // Remove tasks array from goal model
  }
}

const goalApp = new GoalApp();
export { goalApp };
