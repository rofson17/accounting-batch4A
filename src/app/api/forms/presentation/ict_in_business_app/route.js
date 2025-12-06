import ICT_Presentation from "@/schemas/PresentationIct";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || "";

        const searchCondition = query
            ? {
                $or: [
                    { groupName: { $regex: query, $options: "i" } },
                    { topic: { $regex: query, $options: "i" } },
                    { "members.name": { $regex: query, $options: "i" } },
                    { "members.studentId": { $regex: query, $options: "i" } },
                ],
            }
            : {};

        const presentations = await ICT_Presentation.find(searchCondition).sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            total: presentations.length,
            presentations,
        });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch data" },
            { status: 500 }
        )
    }
}


export const POST = async (req) => {
    try {
        await dbConnect();
        const data = await req.json();

        const { groupName, topic, members, fileUrl } = data;

        if (!groupName || !topic || !members || !fileUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            )
        }

        if (members.length < 3 || members.length > 7) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Group must have 3–7 members",
                },
                { status: 400 }
            );
        }

        const entry = await ICT_Presentation.create({
            groupName,
            topic,
            members,
            fileUrl,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Group presentation uploaded successfully!",
                entry,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        )
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

        const deleted = await ICT_Presentation.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Entry not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Presentation deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        )
    }
}
