import "reflect-metadata";
import {BaseEntity, Column, DataSource, PrimaryGeneratedColumn} from "typeorm";

const sslConfig = {
    ca: process.env.SUPABASE_SSL_CERT_RAW,
    rejectUnauthorized: true
};

export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

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
    logging: false
});

export default AppDataSource;
