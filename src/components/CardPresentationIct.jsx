"use client";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiTrash2, FiUsers } from "react-icons/fi";
import toast from "react-hot-toast";

const CardPresentaionIct = ({ group, onDelete }) => {
    const downloadFile = async () => {
        try {
            const url = group.fileUrl;
            const ext = url.split('.').pop().split('?')[0];
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response not ok');
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${group.groupName}-${group.topic}.${ext}`;
            a.click();
            URL.revokeObjectURL(blobUrl);
        } catch {
            toast.error('Failed to download file');
        }
    }

    return (
        <div className="border rounded-lg shadow p-4 flex flex-col justify-between bg-white">
            <div>
                <h2 className="text-lg font-bold mb-1">{group.groupName}</h2>
                <p className="text-sm text-gray-700 mb-2"><strong>Topic:</strong> {group.topic}</p>
                <div className="text-sm">
                    <table className="w-full">
                        <tbody>
                            {group.members.map((m, index) => (
                                <tr key={index} className="border-b last:border-b-0">
                                    <td className="py-1 font-medium">{index + 1}.</td>
                                    <td className="px-2 py-1 font-medium">{m.name}</td>
                                    <td className="px-2 py-1 text-blue-500 text-sm">{m.studentId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={downloadFile}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    <MdOutlineFileDownload /> Download
                </button>
                <button
                    onClick={() => onDelete(group._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    <FiTrash2 /> Delete
                </button>
            </div>
        </div>
    )
}

export default CardPresentaionIct;
