// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // port: process.env.DB_PORT,
    host: 'localhost',
    user: 'bun',
    password: '',
    port: 3306,
    database: 'nadnicappNode'
};

export { dbConfig };
