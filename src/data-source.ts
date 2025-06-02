import "reflect-metadata";
import {DataSource} from "typeorm";

import {User} from "./entity/User";

const sslCertPath = process.env.SUPABASE_SSL_CERT;

let sslConfig: any = false;

if (sslCertPath) {
    try {
        const certContent = process.env.SUPABASE_SSL_CERT_RAW;
        sslConfig = {
            ca: certContent,
            rejectUnauthorized: true
        };
    } catch (error) {
        console.error('Failed to read SSL certificate:', error);
        throw new Error('SSL certificate loading failed');
    }
}

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
    migrations: [__dirname + '/migration/*.ts'],
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
