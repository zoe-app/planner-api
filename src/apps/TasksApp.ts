/* eslint-disable prettier/prettier */
import { Task } from "../interfaces";
import { GoalModel, TaskModel } from "../models";

class TasksApp {
  async create(task: Task) {
    await TaskModel.create(task);
    return task;
  }

  async delete(taskId: string) {
    await TaskModel.deleteOne({ taskId });

    const oldTask = await TaskModel.findOne({ taskId });
    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    await this.updateProgress(oldTask.goalId, tasks);
  }

  async update(taskId: string) {
    console.log("Update... ", taskId);
    const oldTask = await TaskModel.findOne({ taskId });
    const newTask = await TaskModel.findOneAndUpdate(
      { taskId },
      { isDone: !oldTask.isDone },
      { new: true }
    );

    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    const goal = await this.updateProgress(oldTask.goalId, tasks);

    return { newTask, goal };
  }

  async renameTask(taskId: string, newText: string) {
    const newTask = await TaskModel.findOneAndUpdate(
      { taskId },
      { text: newText },
      { new: true }
    );

    return newTask;
  }

  private async updateProgress(goalId: string, tasks: Task[]) {
    const allTasksDone = tasks.filter((x) => x.isDone === true).length;
    const allTasksNotDone = tasks.filter((x) => x.isDone === false).length;

    const newProgress = ((allTasksDone * 100) / allTasksNotDone).toFixed(2);

    const goal = await GoalModel.findOneAndUpdate(
      { goalId },
      { progress: newProgress },
      { new: true }
    );

    return goal;
  }
}

const taskApp = new TasksApp();
export { taskApp };
