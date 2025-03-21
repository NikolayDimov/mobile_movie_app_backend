import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'PASSWORD',
    'DB_NAME'
];


requiredEnvVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USERNAME as string,
    password: process.env.PASSWORD as string,
    database: process.env.DB_NAME as string,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: true,
    logging: true,
    schema: "public",
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
