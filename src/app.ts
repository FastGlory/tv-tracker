import express from 'express';
import mediaRoutes from '../src/v1/routes/media.route';
import userRoutes from '../src/v1//routes/user.route';
import serieRoutes from '../src/v1//routes/serie.route';
import logRoutes from '../src/v1//routes/log.route'
import { middlewareError,middlewareLogger } from '../src/v1//middleware/winston.middleware';


const app = express();

app.use(express.json());
app.use(middlewareLogger);

app.use('/api', mediaRoutes);
app.use('/api', userRoutes);
app.use('/api', serieRoutes);
app.use('/api',logRoutes);

app.use(middlewareError);


export default app;

