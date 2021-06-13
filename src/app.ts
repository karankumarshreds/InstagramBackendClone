import express from 'express';
import cors from 'cors';

// routes
import { UserRouter } from './routes/user';

const app = express();

app.use(cors());
app.use(UserRouter);

export default app;
