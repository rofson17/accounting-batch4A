import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { username, password } = await req.json();

        if (
            username === process.env.NEXT_PUBLIC_DASHBOARD_USER &&
            password === process.env.NEXT_PUBLIC_DASHBOARD_PASS
        ) {

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        //console.error("Login error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
