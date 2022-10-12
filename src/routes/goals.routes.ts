import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { goalApp } from '../apps';
import { Goal } from '../interfaces';
import { AuthMiddleware } from '../middlewares';

const goalsRoutes = Router();

goalsRoutes.use(AuthMiddleware);

goalsRoutes.post('/create', async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  const newGoal: Goal = {
    name,
    id: uuid(),
    userId,
    createdAt: new Date(),
    progress: 0,
    tasks: [],
  };

  await goalApp.create(newGoal);

  return res.status(201).json({ goal: newGoal });
});

goalsRoutes.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  await goalApp.delete(id);

  return res.sendStatus(204);
});

export { goalsRoutes };
