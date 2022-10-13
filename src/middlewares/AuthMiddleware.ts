import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { TokenPayload } from '../interfaces';

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authtoken } = req.headers;

  if (!authtoken) {
    return res.status(403).send({ status: 403, error: 'Forbidden access' });
  }

  const payload = jsonwebtoken.verify(
    authtoken as string,
    process.env.TOKEN_SECRET
  ) as TokenPayload;

  req.body.userId = payload.id;

  if (!req.session.userId) {
    req.session.userId = payload.id;
  }

  return next();
}
