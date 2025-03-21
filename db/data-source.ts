import { DataSource, DataSourceOptions } from "typeorm";
// require("dotenv").config();
import * as dotenv from "dotenv";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    // host: "localhost",
    host: process.env.DB_HOST,
    // port: 5432,
    // port: parseInt(process.env.DB_PORT, 10) || 5432,
    port: 5432,

    // port: parseInt(process.env.DB_PORT || "5432", 10),
    // username: process.env.USERNAME,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false,
    logging: true,
    schema: "public",
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
