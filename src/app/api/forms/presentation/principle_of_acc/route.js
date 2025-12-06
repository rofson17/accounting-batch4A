import Presentation from "@/schemas/Presentation";
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
                    { name: { $regex: query, $options: "i" } },
                    { studentId: { $regex: query, $options: "i" } },
                ]
            }
            : {};

        const presentations = await Presentation.find(searchCondition)
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            presentations,
            total: presentations.length,
        })
    } catch (error) {
        console.error("Error fetching presentations:", error);
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

        const { studentId, presentationFile, name } = data;

        if (!studentId || !presentationFile || !name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Student ID and presentation file are required",
                },
                { status: 400 }
            );
        }

        const entry = await Presentation.create({
            name,
            studentId,
            presentationFile,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Presentation submitted!",
                entry,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );
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
            );
        }

        const deleted = await Presentation.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Presentation not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Presentation deleted successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}