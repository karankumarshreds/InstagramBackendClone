import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

// routes
import { UserRouter } from './routes/user';

const app = express();

app.use(cors());
app.use(json());
app.use(UserRouter);

export default app;
