import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import createConnection from './database';
import { router } from './routes/index';

import './shared/container';

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server running"));