import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import {join} from 'path';
// import {readFileSync} from 'fs';
import * as schema from "./schema";

// const cert = readFileSync(join(process.cwd(), './prod-ca-2021.crt'), 'utf8');

export function createDrizzleClient() {
    const client = postgres({
        host: process.env.SUPABASE_DB_HOST,
        port: Number(process.env.SUPABASE_DB_PORT),
        username: process.env.SUPABASE_DB_USER,
        password: process.env.SUPABASE_DB_PASSWORD,
        database: process.env.SUPABASE_DB_NAME,
        ssl: {
            ca: process.env.SUPABASE_SSL_CERT_RAW,
            rejectUnauthorized: true,
            require: true
        }
    });
    return drizzle(client, {schema});
}
