import Notice from "@/schemas/Notice";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || "";
        const limit = parseInt(searchParams.get("latest")) || 0; //1 means first notice Latest and 0 means all notice

        const searchCondition = query
            ? {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { studentId: { $regex: query, $options: "i" } },
                ],
            }
            : {};

        let noticesQuery = Notice.find(searchCondition).sort({ createdAt: -1 });

        if (limit > 0) noticesQuery = noticesQuery.limit(limit);

        const notices = await noticesQuery;

        return NextResponse.json({
            success: true,
            notices,
            total: notices.length,
        })

    } catch (error) {
        // console.log(error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}


export const POST = async (req) => {
    try {
        await dbConnect();
        const { title, notice, linkText, link, deadline } = await req.json();

        if (!title || !notice) {
            return NextResponse.json(
                {
                    success: false,
                    message: "title and notice are required",
                },
                { status: 400 }
            )
        }

        const notices = await Notice.create({
            title,
            notice,
            linkText,
            link,
            deadline
        });

        return NextResponse.json(
            {
                success: true,
                message: "Presentation submitted!",
                notices,
            },
            { status: 201 }
        )
    } catch (error) {
        console.log(error.message);

        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
    }
}


export const DELETE = async (req) => {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID is required" },
                { status: 400 }
            )
        }

        const deleted = await Notice.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Notice not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Notice deleted successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
    }
}