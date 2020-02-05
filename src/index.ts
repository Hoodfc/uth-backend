
import 'reflect-metadata';
import createConnection from './lib/createConnection';

// require('dotenv').config();

const PORT: string = process.env.PORT || '3500';

createConnection(PORT, true);
