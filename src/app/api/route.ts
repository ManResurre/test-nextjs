import {NextResponse} from "next/server";
import {User} from "@/entity/User";
import AppDataSource from "@/data-source";

export async function GET() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}
