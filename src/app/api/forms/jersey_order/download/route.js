import JerseyOrder from "@/schemas/JerseyOrder";
import dbConnect from "@/utils/connectdb";
import ExcelJS from "exceljs";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    try {
        await dbConnect();

        const orders = await JerseyOrder.find().lean();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Jersey Orders");


        sheet.addRow([
            "Name",
            "Student ID",
            "Email",
            "Phone",
            "Jersey Number",
            "Display Name",
            "Sleeves",
            "Size",
            "Payment Method",
            "Transaction ID",
            // "Created At",
        ]);

        // Add data rows
        orders.forEach(order => {
            sheet.addRow([
                order.name,
                order.studentId,
                order.email,
                order.phone,
                order.jerseyNumber,
                order.displayName,
                order.sleeves,
                order.size,
                order.payment_method,
                order.transactionId || "",
                // order.createdAt.toISOString().split("T")[0],
            ]);
        });

        const buffer = await workbook.xlsx.writeBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename=JerseyOrders.xlsx`,
            },
        });

    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
    }
}