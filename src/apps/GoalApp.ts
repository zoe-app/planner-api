/* eslint-disable prettier/prettier */
import { Goal } from "../interfaces";
import { GoalModel, TaskModel } from "../models";

class GoalApp {
  async getGoals(userId: string) {
    const goals = await GoalModel.find({ userId });
    const tasks = await TaskModel.find({ userId });

    const goalsForEdit = [...goals];

    let result = [];

    // eslint-disable-next-line array-callback-return
    goalsForEdit.map((goal: any) => {
      const editableGoal = goal;
      const goalsTasks = tasks.filter((x) => x.goalId === goal.id);
      editableGoal.tasks = goalsTasks;

      result = [...result, editableGoal];
    });

    return result;
  }

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
