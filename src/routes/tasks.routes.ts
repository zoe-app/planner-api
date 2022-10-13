import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { taskApp } from '../apps/TasksApp';
import { Task } from '../interfaces';
import { AuthMiddleware } from '../middlewares';

const taskRoutes = Router();

taskRoutes.use(AuthMiddleware);

taskRoutes.post('/:goalId', async (req: Request, res: Response) => {
  const { text, userId } = req.body;
  const { goalId } = req.params;

  const task: Task = {
    text,
    userId,
    id: uuid(),
    createdAt: new Date(),
    goalId,
    isDone: false,
  };

  await taskApp.create(task);

  return res.status(201).json(task);
});

taskRoutes.delete(':id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await taskApp.delete(id);

  return res.sendStatus(204);
});

taskRoutes.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await taskApp.update(id);

  return res.sendStatus(204);
});

taskRoutes.patch('/:id', async (req: Request, res: Response) => {
  const { newText } = req.body;
  const { id } = req.params;

  const task = await taskApp.renameTask(id, newText);

  return res.status(201).json(task);
});

export { taskRoutes };
