import JerseyOrder from "@/app/schemas/JerseyOrder";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {

    } catch (error) {
        return NextResponse.json({ message: "server error" }, { status: 500 })
    }
}



export const POST = async (req) => {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.name || !data.studentId || !data.email || !data.phone) {
            return Response.json(
                { success: false, message: "All required fields must be filled" },
                { status: 400 }
            );
        }

        if (data.payment_method === "bkash" && !data.transactionId) {
            return Response.json(
                { success: false, message: "Transaction ID is required for bKash" },
                { status: 400 }
            );
        }

        const order = await JerseyOrder.create(data);
        return Response.json({ success: true, message: "Order submitted!", order }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
    }
}