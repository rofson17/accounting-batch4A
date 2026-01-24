import mongoose from "mongoose";

const picnicSchema = new mongoose.Schema({
    name: String,
    studentId: {
        type: String,
        required: [true, "Student Id is required"]
    },
    amount: {
        type: Number,
        default: 0
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
    status: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending"
    }
}, { timestamps: true });


export default mongoose.models.Picnic || mongoose.model("Picnic", picnicSchema);