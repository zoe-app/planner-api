import { Router, Request, Response } from 'express';

const authRouter = Router();

// TODO: Validar se preciso mesmo dessas rotas

authRouter.post('/', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

export { authRouter };
