import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
// import {readFileSync, writeFileSync} from "node:fs";

// console.log('Original length:', readFileSync('./prod-ca-2021.crt', 'utf8').length);
// console.log('Env length:', Buffer.from(process.env.SUPABASE_SSL_CERT_RAW!, 'base64').toString('utf-8').length);

export function createDrizzleClient() {
    const client = postgres({
        host: process.env.SUPABASE_DB_HOST,
        port: parseInt(process.env.SUPABASE_DB_PORT!),
        username: process.env.SUPABASE_DB_USER,
        password: process.env.SUPABASE_DB_PASSWORD,
        database: process.env.SUPABASE_DB_NAME,
        ssl: {
            ca: Buffer.from(process.env.SUPABASE_SSL_CERT_RAW!, 'base64').toString('utf-8'),
            rejectUnauthorized: true,
            require: true
        }
    });
    return drizzle(client, {schema});
}
