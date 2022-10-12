import { Router } from "express";
import { goalsRoutes } from "./goals.routes";

const routes = Router();

routes.use('/v1/goal', goalsRoutes);

export { routes }
