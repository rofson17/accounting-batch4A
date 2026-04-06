"use client";

import { Trash2, FileText } from "lucide-react";

const CardPresentationManagement = ({ group, onDelete }) => {

    const formattedDate = new Date(group.createdAt).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">

            <h2 className="text-lg font-semibold mb-2">
                {group.groupName}
            </h2>

            <p className="text-sm text-gray-500 mb-3">
                Uploaded: {formattedDate}
            </p>

            <div className="flex items-center justify-between">

                <a
                    href={group.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                >
                    <FileText size={18} className="mr-1" />
                    View File
                </a>

                <button
                    onClick={() => onDelete(group._id)}
                    className="flex items-center text-red-600 hover:text-red-700"
                >
                    <Trash2 size={18} className="mr-1" />
                    Delete
                </button>

            </div>

        </div>
    )
}

export default CardPresentationManagement