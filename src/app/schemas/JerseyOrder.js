import mongoose from "mongoose";

const JerseyOrderSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        studentId: {
            type: String,
            required: [true, "Student ID is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        jerseyNumber: {
            type: String,
            required: [true, "Jersey number is required"],
            trim: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        sleeves: {
            type: String,
            enum: ["short", "long"],
            required: [true, "Sleeves type is required"],
        },
        size: {
            type: String,
            enum: ["S", "M", "L", "XL", "2XL", "3XL"],
            required: [true, "Jersey size is required"],
        },
        payment_method: {
            type: String,
            enum: ["cash", "bkash"],
            required: [true, "Payment method is required"],
        },
        transactionId: {
            type: String,
            trim: true,
            required: function () {
                return this.payment_method === "bkash";
            },
        },

        transactionScreenshot: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.JerseyOrder ||
    mongoose.model("JerseyOrder", JerseyOrderSchema);
