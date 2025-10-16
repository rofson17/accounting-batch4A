import JerseyOrder from "@/app/schemas/JerseyOrder";
import dbConnect from "@/utils/connectdb";
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {

        await dbConnect();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || "";
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 5;
        const skip = (page - 1) * limit;

        const searchCondition = query
            ? {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                    { studentId: { $regex: query, $options: "i" } },
                    { phone: { $regex: query, $options: "i" } },
                ],
            }
            : {};

        const [orders, totalCount] = await Promise.all([
            JerseyOrder.find(searchCondition)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            JerseyOrder.countDocuments(searchCondition),
        ]);

        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalCount, totalPages);

        return NextResponse.json({
            success: true,
            orders,
            totalPages,
            totalCount,
            currentPage: page,
        })

    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch orders" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
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