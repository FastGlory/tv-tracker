import express from 'express';
import mediaRoutes from '../src/v1/routes/media.route';
import userRoutes from '../src/v1//routes/user.route';
import serieRoutes from '../src/v1//routes/serie.route';
import logRoutes from '../src/v1//routes/log.route'
import { middlewareError,middlewareLogger } from '../src/v1//middleware/winston.middleware';
import userRoutesV2 from './v2/routes/user.route';
import authRoutesV2 from './v2/routes/auth.route';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());
app.use(middlewareLogger);

app.use('/api', mediaRoutes);
app.use('/api', userRoutes);
app.use('/api', serieRoutes);
app.use('/api',logRoutes);

app.use('/api/v2/users', userRoutesV2);
app.use('/api/v2/auth', authRoutesV2);

app.use(middlewareError);


export default app;

