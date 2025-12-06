import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        studentId: {
            type: String,
            required: true,
            match: /^\d{3}-\d{2}-\d{3}$/,
        },
    },
    { _id: false }
)

const ictPresentationSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
            trim: true,
        },

        topic: {
            type: String,
            required: true,
            trim: true,
        },

        members: {
            type: [memberSchema],
            validate: [
                (arr) => arr.length >= 3 && arr.length <= 7,
                "Group must have 3–7 members",
            ],
        },

        fileUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.models.ICT_Presentation ||
    mongoose.model("ICT_Presentation", ictPresentationSchema);
