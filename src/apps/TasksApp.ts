/* eslint-disable prettier/prettier */
import { Task } from '../interfaces';
import { GoalModel, TaskModel } from '../models';

class TasksApp {
  async create(task: Task) {
    await TaskModel.create(task);

    const tasks = await TaskModel.find({ goalId: task.goalId });

    const { progress } = await this.updateProgress(task.goalId, tasks);

    return { task , progress };
  }

  async delete(taskId: string): Promise<number> {
    const oldTask = await TaskModel.findOne({ taskId });

    await TaskModel.deleteOne({ taskId });
    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    if (tasks.length === 0) {
      return 0;
    }

    const { progress } = await this.updateProgress(oldTask.goalId, tasks);

    return progress;
  }

  async update(taskId: string) {
    const oldTask = await TaskModel.findOne({ taskId });
    const newTask = await TaskModel.findOneAndUpdate(
      { taskId },
      { isDone: !oldTask.isDone },
      { new: true }
    );

    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    const goal = await this.updateProgress(oldTask.goalId, tasks);

    return { task: newTask, goal };
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
    const allTasks = tasks.length;

    const newProgress = (allTasksDone * 100) / allTasks;

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
