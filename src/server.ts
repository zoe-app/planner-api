import cors from 'cors';
import express from 'express';
import session from 'express-session';

import { connect } from './mongo';
import { routes } from './routes';
import { ONE_HOUR } from './utils';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: ONE_HOUR },
  })
);

app.use(routes);

connect();

app.listen(process.env.PORT, () => {
  console.log('**********************************************');
  console.log(`************Auth API - Porta: ${process.env.PORT}************`);
  console.log('**********************************************');
});
