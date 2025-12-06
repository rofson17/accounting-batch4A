import mongoose from "mongoose";

const PresentationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true,
        },
        presentationFile: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.models.Presentation ||
    mongoose.model("Presentation", PresentationSchema)
