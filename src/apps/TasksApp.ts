import { Task } from '../interfaces';
import { TaskModel } from '../models';

class TasksApp {
  async create(task: Task) {
    await TaskModel.create(task);
    return task;
  }

  async delete(id: string) {
    await TaskModel.deleteOne({ id });
  }

  async update(id: string) {
    const oldTask = await TaskModel.findOne({ id });
    const newTask = await TaskModel.findOneAndUpdate(
      { id },
      { isDone: !oldTask.isDone },
      { new: true }
    );

    return newTask;
  }
}

const taskApp = new TasksApp();
export { taskApp };
