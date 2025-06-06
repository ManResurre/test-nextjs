import {NextResponse} from "next/server";
import {createDrizzleClient} from "@/lib/DrizzleClient";

export async function GET() {
    try {

        const db = createDrizzleClient();
        console.log(db);

        const users = [{test: "11"}];
        return NextResponse.json(users);
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}
