import { Router, Response } from 'express';
import { upload } from '../multer';
import { pinsController } from '../controllers';
import { RequestWithUserId } from '../types/interfaces';

const pinsRoutes = Router();

pinsRoutes.get('/', (req: RequestWithUserId, res: Response) =>
  pinsController.getPins(req, res),
);

pinsRoutes.post(
  '/',
  upload.single('img'),
  (req: RequestWithUserId, res: Response) => pinsController.createPin(req, res),
);

export { pinsRoutes };
