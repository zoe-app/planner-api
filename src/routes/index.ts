import { Router } from 'express';

import { authRouter } from './auth.routes';
import { goalsRoutes } from './goals.routes';
import { taskRoutes } from './tasks.routes';

const routes = Router();

routes.use('/v1/goal', goalsRoutes);
routes.use('/v1/tasks', taskRoutes);

routes.use('v1/auth', authRouter);

export { routes };
