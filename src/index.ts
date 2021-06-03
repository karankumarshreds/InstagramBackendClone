import 'reflect-metadata';
import { createConnection } from 'typeorm';

const start = async () => {
  try {
    const config = await createConnection({
      name: 'instagram',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'Instagram',
    });
    console.log('Connected with DB 🎉');
  } catch (error) {
    console.log(error);
  }
};

start();
