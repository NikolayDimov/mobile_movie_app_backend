import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    username: process.env.DB_USERNAME!,
    password: process.env.PASSWORD!,
    database: process.env.DB_NAME!,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: true,
    schema: "public",
};
