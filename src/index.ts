import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

// custom
import app from './app';

const PORT = process.env.PORT || 5000;

const start = async () => {
  // environment checks
  if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME
  ) {
    throw new Error(
      '❌ Data base hostname, port, user, password and database name must be provided ❌'
    );
  }

  try {
    await createConnection({
      name: 'instagram',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Connected with DB 🎉');

    // start the express app
    app.listen(PORT, () => {
      console.log('Listening on port 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
