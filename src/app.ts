import express from 'express';
import mediaRoutes from './routes/media.route';
import userRoutes from './routes/user.route';
import serieRoutes from './routes/serie.route';
import { middlewareError,middlewareLogger } from './middleware/winston.middleware';


const app = express();

app.use(express.json());
app.use(middlewareLogger);

app.use('/api', mediaRoutes);
app.use('/api', userRoutes);
app.use('/api', serieRoutes);

app.use(middlewareError);


export default app;

