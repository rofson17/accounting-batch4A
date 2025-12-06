"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import toast from "react-hot-toast";

const PrincipleOfAcc = () => {
    const [presentations, setPresentations] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPresentations = async (query = "") => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/forms/presentation/principle_of_acc?query=${query}`);
            if (res.data.success) setPresentations(res.data.presentations);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching presentations:", error);
            setLoading(false);
        }
    }

    useEffect(() => { fetchPresentations(); }, []);
    useEffect(() => {
        const delayDebounce = setTimeout(() => { fetchPresentations(search); }, 300);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this presentation?")) return;
        try {
            const res = await axios.delete(`/api/forms/presentation/principle_of_acc?id=${id}`);
            if (res.data.success) {
                toast.success("Deleted successfully");
                setPresentations((prev) => prev.filter((p) => p._id !== id));
            } else toast.error(res.data.message || "Failed to delete");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Server error while deleting");
        }
    }

    const downloadFile = async (url, studentId) => {
        try {
            const ext = url.split('.').pop().split('?')[0];
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response not ok');
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${studentId}.${ext}`;
            a.click();
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            toast.error('Failed to download file')
        }
    }

    return (

        <>
            <div className="p-4 max-w-full">
                <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Show Presentations</h1>

                <input
                    type="text"
                    placeholder="Search by name or Student ID"
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm sm:text-base hidden sm:table">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Student ID</th>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Download</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {presentations.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{p.studentId}</td>
                                        <td className="px-4 py-2 border-b">{p.name}</td>
                                        <td className="px-4 py-2 border-b mx-auto">
                                            <button
                                                onClick={() => downloadFile(p.presentationFile, p.studentId)}
                                                className="text-blue-600 hover:text-blue-800 underline flex items-center justify-center sm:justify-start "
                                            >
                                                <MdOutlineFileDownload className=" text-2xl sm:mr-2" /> Download
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="text-red-600 hover:text-red-800 flex items-center justify-center sm:justify-start"
                                            >
                                                <FiTrash2 className="inline text-xl sm:mr-2" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile card view */}
                        <div className="sm:hidden space-y-4">
                            {presentations.map((p) => (
                                <div key={p._id} className="border rounded p-4 shadow">
                                    <p><strong>Student ID:</strong> {p.studentId}</p>
                                    <p><strong>Name:</strong> {p.name}</p>
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={() => downloadFile(p.presentationFile, p.studentId)}
                                            className="text-blue-600 hover:text-blue-800 underline flex items-center"
                                        >
                                            <MdOutlineFileDownload className="inline text-2xl mr-1" /> Download
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <FiTrash2 className="inline text-xl mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {presentations.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">No results found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default PrincipleOfAcc;
