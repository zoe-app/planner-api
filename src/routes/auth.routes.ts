import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter.post('/', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

export { authRouter };
