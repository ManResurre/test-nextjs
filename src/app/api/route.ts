import {NextResponse} from "next/server";
import {createDrizzleClient} from "@/lib/DrizzleClient";

export async function GET() {

    try {
        return NextResponse.json([]);
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}
