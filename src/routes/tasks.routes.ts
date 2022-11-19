/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { taskApp } from "../apps/TasksApp";
import { Task } from "../interfaces";
import { AuthMiddleware } from "../middlewares";

const taskRoutes = Router();

// taskRoutes.use(AuthMiddleware);

taskRoutes.post("/:goalId", AuthMiddleware, async (req: Request, res: Response) => {
  const { text, userId } = req.body;
  const { goalId } = req.params;

  const task: Task = {
    text,
    userId,
    taskId: uuid(),
    createdAt: new Date(),
    goalId,
    isDone: false,
  };

  const taskRes = await taskApp.create(task);

  return res.status(201).json(taskRes);
});

taskRoutes.delete("/:id", AuthMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  const progress = await taskApp.delete(id);

  return res.status(200).json({ progress });
});

taskRoutes.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateRes = await taskApp.update(id);

  return res.status(200).json(updateRes);
});

taskRoutes.patch("/:id", AuthMiddleware, async (req: Request, res: Response) => {
  const { newText } = req.body;
  const { id } = req.params;

  const task = await taskApp.renameTask(id, newText);

  return res.status(201).json(task);
});

export { taskRoutes };
