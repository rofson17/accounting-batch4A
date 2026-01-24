import Picnic from "@/schemas/Picnic";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect();
        const data = await req.json();
        if (!data.name || !data.studentId || !data.amount)
            return Response.json(
                { success: false, message: "All required fields must be filled" },
                { status: 400 }
            )
        if (data.payment_method === "bkash" && !data.transactionId)
            return Response.json(
                { success: false, message: "Transaction ID is required for bKash" },
                { status: 400 }
            )

        if (data.payment_method === "bkash")
            data.status = "paid"
        else
            data.status = "pending"





        const payment = await Picnic.create(data);
        console.log(payment);

        return NextResponse.json({ success: true, message: "Order submitted!" }, { status: 201 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
    }
}


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

        const payments = await Picnic.find(searchCondition).sort({ createdAt: -1 });
        console.log(payments);


        return NextResponse.json({
            success: true,
            payments,
            totalStudents: payments.length
        });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
    }
}

export const PATCH = async (req) => {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Payment ID is required" },
                { status: 400 }
            )
        }


        const body = await req.json();
        const { status } = body;

        if (!["paid", "pending"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status value" },
                { status: 400 }
            )
        }

        const payment = await Picnic.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        if (!payment) {
            return NextResponse.json(
                { success: false, message: "Payment not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            payment,
        })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
    }
}

export const DELETE = async (req) => {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id)
            return NextResponse.json({ success: false, message: "Payment ID is required" }, { status: 400 });
        const payment = await Picnic.findByIdAndDelete(id);

        if (!payment)
            return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Payment deleted successfully" });
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
    }
}