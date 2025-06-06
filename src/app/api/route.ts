import {NextResponse} from "next/server";
import {createDrizzleClient} from "@/lib/DrizzleClient";
import {users} from "@/lib/schema";

export async function GET() {

    try {
        const db = createDrizzleClient();
        const allUsers = await db.select().from(users);

        // const result = await db.execute('select 1');

        return NextResponse.json(allUsers);
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}
