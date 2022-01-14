import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import { router } from './routes/index';
import createConnection from './database';
import ErrorHandler from './middlewares/ErrorHandler';

import './shared/container';

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(router);
app.use(ErrorHandler);

app.listen(3333, () => console.log("Server running"));