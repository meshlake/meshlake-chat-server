import "reflect-metadata"
import { DataSource } from "typeorm"

const env = process.env.NODE_ENV;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "meshlake",
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],
    entities: [`${env === 'development' ? 'src/' : 'dist/src/'}entity/*{.js,.ts}`]
})
