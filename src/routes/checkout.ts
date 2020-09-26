import { Router, Response } from 'express';
import { checkoutController } from '../controllers';
import { RequestWithUserId } from '../types/interfaces';

const checkoutRoutes = Router();

checkoutRoutes.post('/', (req: RequestWithUserId, res: Response) =>
  checkoutController.checkout(req, res),
);

export { checkoutRoutes };
