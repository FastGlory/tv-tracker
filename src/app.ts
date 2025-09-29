import express from 'express';
import mediaRoutes from './routes/media.route';
import userRoutes from './routes/user.route';
import serieRoutes from './routes/serie.route';


const app = express();

app.use(express.json());

app.use('/api', mediaRoutes);
app.use('/api', userRoutes);
app.use('/api', serieRoutes);

export default app;

