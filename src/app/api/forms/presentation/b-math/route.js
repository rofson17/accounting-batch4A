import PrinciplesOfManagement from "@/schemas/PrinciplesOfManagement";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    try {

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || "";

        const searchCondition = query
            ? {
                groupName: { $regex: query, $options: "i" },
            }
            : {};

        const presentations = await PrinciplesOfManagement
            .find(searchCondition)
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            total: presentations.length,
            presentations,
        });

    } catch (error) {

        console.error("GET error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
            },
            { status: 500 }
        );

    }
};



export const POST = async (req) => {

    try {

        await dbConnect();

        const data = await req.json();

        const { groupName, fileUrl } = data;
        // console.log(data)
        if (!groupName || !fileUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Group name and file are required",
                },
                { status: 400 }
            );
        }

        const entry = await PrinciplesOfManagement.create({
            groupName,
            fileUrl,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Presentation uploaded successfully!",
                entry,
            },
            { status: 201 }
        );

    } catch (error) {

        console.error("POST error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Server error",
                error: error.message,
            },
            { status: 500 }
        );

    }

};



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

        const deleted = await PrinciplesOfManagement.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Entry not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Presentation deleted successfully",
            },
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
        );

    }

};