import { Router, Response } from 'express';
import { usersController } from '../controllers';
import { RequestWithUserId } from '../types/interfaces';

const usersRoutes = Router();

usersRoutes.get('/:id', (req: RequestWithUserId, res: Response) =>
  usersController.getUser(req, res),
);

export { usersRoutes };
