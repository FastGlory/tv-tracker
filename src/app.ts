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
import ratingRouteV2 from './v2/routes/rating.route';
import recommandationRouteV2 from './v2/routes/recommandation.route';
import { securisationServer } from './common/securisationServer';
import cors from 'cors';

import dotenv from 'dotenv';
import { connectDB } from './common/database';
import swaggerUi from "swagger-ui-express";
import swaggerV2 from "../src/docs/swagger-v2.json";
import swaggerV1 from "../src/docs/swagger-v1.json";


dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());

securisationServer(app);

app.use('/api/v1', mediaRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', serieRoutes);
app.use('/api/v1',logRoutes);

app.use('/api/v2/users', userRoutesV2);
app.use('/api/v2/auth', authRoutesV2);
app.use('/api/v2/movies', movieRoutesV2);
app.use('/api/v2/series', serieRouteV2);
app.use('/api/v2/series', seasonRouteV2);  
app.use('/api/v2/series', episodeRouteV2);
app.use('/api/v2/ratings', ratingRouteV2);
app.use('/api/v2/reco', recommandationRouteV2);

app.use("/docs/v2", swaggerUi.serve, swaggerUi.setup(swaggerV2));


app.use(middlewareError);


export default app;

