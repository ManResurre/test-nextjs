import "reflect-metadata";
import {DataSource} from "typeorm";

import {User} from "./entity/User";

const sslConfig = {
    ca: process.env.SUPABASE_SSL_CERT_RAW,
    rejectUnauthorized: true
};

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.SUPABASE_DB_HOST,
    port: Number(process.env.SUPABASE_DB_PORT),
    username: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME,
    synchronize: false,
    entities: [User],
    subscribers: [],
    migrations: [],
    ssl: sslConfig,
    extra: {
        ssl: sslConfig ? {
            ...sslConfig,
            require: true
        } : null,
        pool: {
            max: 5,
            min: 1,
            idleTimeoutMillis: 30000
        }
    },
    logging: ['error']
});

export default AppDataSource;
