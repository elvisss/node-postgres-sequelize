import express, { json } from 'express';
import morgan from 'morgan';

import projectRouters from './routes/projects';
import taskRouters from './routes/tasks';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

// routes
app.use('/api/projects', projectRouters);
app.use('/api/tasks', taskRouters);

export default app;
