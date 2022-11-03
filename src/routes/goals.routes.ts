/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { goalApp } from "../apps";
import { CompleteGoal } from "../interfaces";
import { AuthMiddleware } from "../middlewares";

const goalsRoutes = Router();

goalsRoutes.use(AuthMiddleware);

goalsRoutes.get("/goals", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const goals = await goalApp.getGoals(userId);
  return res.status(200).json({ goals });
});

goalsRoutes.post("/create", async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  const newGoal: CompleteGoal = {
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

goalsRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await goalApp.delete(id);

  return res.sendStatus(204);
});

export { goalsRoutes };
