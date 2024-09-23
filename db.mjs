import Knex from 'knex';
import knexConfig from './knexfile.mjs'; 

const db = Knex(knexConfig.development);

export default db;