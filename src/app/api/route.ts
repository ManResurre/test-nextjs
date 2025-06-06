import {NextResponse} from "next/server";
import {createDrizzleClient} from "@/lib/DrizzleClient";
import {users} from "@/lib/schema";

export async function GET() {
    console.log(process.env.SUPABASE_DB_HOST);
    console.log('SUPABASE_DB_PORT', parseInt(process.env.SUPABASE_DB_PORT!));
    console.log(process.env.SUPABASE_DB_USER);
    console.log(process.env.SUPABASE_DB_PASSWORD);
    console.log(process.env.SUPABASE_DB_NAME);
    console.log(process.env.SUPABASE_SSL_CERT_RAW);
    console.log(process.env.HYPERDRIVE);

    try {
        const db = createDrizzleClient();
        // const allUsers = await db.select().from(users);

        const result = await db.execute('select 1');

        return NextResponse.json([]);
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}
