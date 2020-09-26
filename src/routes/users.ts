import { Router, Response } from 'express';
import { usersController } from '../controllers';
import { RequestWithUserId } from '../types/interfaces';

const usersRoutes = Router();

// usersRoutes.get('/', (req: RequestWithUserId, res: Response) =>
//   usersController.getUsers(req, res),
// );
usersRoutes.get('/:id', (req: RequestWithUserId, res: Response) =>
  usersController.getUser(req, res),
);

// usersRoutes.delete('/:id', (req: RequestWithUserId, res: Response) =>
//   usersController.deleteUser(req, res),
// );

export { usersRoutes };
