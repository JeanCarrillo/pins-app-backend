import { Router, Request, Response } from 'express';
const authRoutes = Router();

import { authController } from '../controllers';

authRoutes.post('/login', (req: Request, res: Response) =>
  authController.login(req, res),
);
authRoutes.post('/signup', (req: Request, res: Response) =>
  authController.signup(req, res),
);

export { authRoutes };
