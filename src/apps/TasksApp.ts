import { Task } from '../interfaces';
import { GoalModel, TaskModel } from '../models';

class TasksApp {
  async create(task: Task) {
    await TaskModel.create(task);
    return task;
  }

  async delete(id: string) {
    await TaskModel.deleteOne({ id });

    const oldTask = await TaskModel.findOne({ id });
    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    await this.updateProgress(oldTask.goalId, tasks);
  }

  async update(id: string) {
    const oldTask = await TaskModel.findOne({ id });
    const newTask = await TaskModel.findOneAndUpdate(
      { id },
      { isDone: !oldTask.isDone },
      { new: true }
    );

    const tasks = await TaskModel.find({ goalId: oldTask.goalId });

    const goal = await this.updateProgress(oldTask.goalId, tasks);

    return { newTask, goal };
  }

  async renameTask(id: string, newText: string) {
    const newTask = await TaskModel.findOneAndUpdate(
      { id },
      { text: newText },
      { new: true }
    );

    return newTask;
  }

  private async updateProgress(goalId: string, tasks: Task[]) {
    const allTasksDone = tasks.filter((x) => x.isDone === true).length;
    const allTasksNotDone = tasks.filter((x) => x.isDone === false).length;

    const newProgress = ((allTasksDone * 100) / allTasksNotDone).toFixed(2);

    const goal = await GoalModel.findByIdAndUpdate(
      { id: goalId },
      { progress: newProgress },
      { new: true }
    );

    return goal;
  }
}

const taskApp = new TasksApp();
export { taskApp };
