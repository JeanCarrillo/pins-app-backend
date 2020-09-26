import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import './db';
import { authMiddleware } from './middlewares/auth';
import { authRoutes, checkoutRoutes, usersRoutes, pinsRoutes } from './routes';

const app: express.Application = express();

const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

app.use('/public', express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/checkout', authMiddleware, checkoutRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/pins', authMiddleware, pinsRoutes);
