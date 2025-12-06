import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        notice: {
            type: String,
            required: true,
        },
        linkText: String,
        link: {
            type: String,
            unique: true
        },
        deadline: {
            type: Date
        }
    },
    { timestamps: true }
)

export default mongoose.models.Notice ||
    mongoose.model("Notice", NoticeSchema);
