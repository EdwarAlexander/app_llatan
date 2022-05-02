import { Sequelize } from 'sequelize';
require('dotenv').config();

/*const db = String(process.env.DATA_BASE);
const user_db = String(process.env.USER_DATA_BASE);
const pass_db = String(process.env.PASSWORD_DATA_BASE);
const server_db = String(process.env.SERVER_DATA_BASE);
const port_db = Number(process.env.PORT_DATA_BASE);*/

/*export default new Sequelize(db, user_db, pass_db, {
    dialect: 'postgres',
    host: server_db,
    port: port_db,
    logging: false
});*/
export default new Sequelize(process.env.DATABASE_URL ?? "",{
    dialectOptions:
    process.env.NODE_ENV !== "production"
      ? {}
      : { ssl: { rejectUnauthorized: false } },

    logging: false,
});