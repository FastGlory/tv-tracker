import express from 'express';
import mediaRoutes from '../src/v1/routes/media.route';
import userRoutes from '../src/v1//routes/user.route';
import serieRoutes from '../src/v1//routes/serie.route';
import logRoutes from '../src/v1//routes/log.route'
import { middlewareError,middlewareLogger } from '../src/v1//middleware/winston.middleware';
import userRoutesV2 from './v2/routes/user.route';
import authRoutesV2 from './v2/routes/auth.route';
import movieRoutesV2 from './v2/routes/movie.route';
import serieRouteV2 from './v2/routes/serie.route';
import seasonRouteV2 from './v2/routes/season.route';
import episodeRouteV2 from './v2/routes/episode.route';
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
app.use('/api/v2/movies', movieRoutesV2);
app.use('/api/v2/series', serieRouteV2);
app.use('/api/v2/series', seasonRouteV2);  
app.use('/api/v2/series', episodeRouteV2);

app.use(middlewareError);


export default app;

