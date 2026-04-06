import mongoose from "mongoose";

const PrinciplesOfManagementSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: [true, "Group name is required"],
            trim: true,
        },

        fileUrl: {
            type: String,
            required: [true, "Presentation file is required"],
        },
    },
    {
        timestamps: true,
    }
)

const PrinciplesOfManagement =
    mongoose.models.PrinciplesOfManagement ||
    mongoose.model("PrinciplesOfManagement", PrinciplesOfManagementSchema);

export default PrinciplesOfManagement;