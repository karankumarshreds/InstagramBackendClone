import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';

import dotenv from 'dotenv';
dotenv.config();

// custom
import app from './app';
import ORMConfig from './ormconfig';

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

  let connection: Connection | undefined;

  // get connection if exists
  try {
    connection = getConnection();
  } catch (e) {
    connection = undefined;
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(ORMConfig);
    }
    console.log('🚀 Connected to DB');
    app.listen(5000, () => {
      console.log('Listening on PORT 5000');
    });
  } catch (error) {
    console.error('❌ Unable to connect to DB ❌', error);
    throw error;
  }

  // try {
  //   await createConnection({
  //     name: 'instagram',
  //     type: 'postgres',
  //     host: process.env.DB_HOST,
  //     port: parseInt(process.env.DB_PORT!),
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_NAME,
  //   });
  //   console.log('Connected with DB 🎉');

  //   // start the express app
  //   app.listen(PORT, () => {
  //     console.log('Listening on port 5000');
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

start();
