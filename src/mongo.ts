import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const conn = mongoose.connection;

export function connect() {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: 'planner-zoe',
  });

  conn.on('connected', () => {
    console.log('database is connected successfully');
  });

  conn.on('disconnected', () => {
    console.log('database is disconnected successfully');
  });

  conn.on('error', console.error.bind(console, 'connection error:'));
}

export function disconnect() {
  if (!conn) return;

  mongoose.disconnect();
}
