
import 'reflect-metadata';
import connection from './modules/server/connection';

// require('dotenv').config();

const PORT: string = process.env.PORT || '3500';

connection(PORT, true);
