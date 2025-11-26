"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const Presentation = () => {
    const [presentations, setPresentations] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPresentations = async (query = "") => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/forms/presentation_upload?query=${query}`);
            if (res.data.success) {
                setPresentations(res.data.presentations);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching presentations:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPresentations();
    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPresentations(search);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search])

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this presentation?")) return;

        try {
            const res = await axios.delete(`/api/forms/presentation_upload?id=${id}`);
            if (res.data.success) {
                toast.success("Deleted successfully");
                setPresentations((prev) => prev.filter((p) => p._id !== id));
            } else {
                toast.error(res.data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Server error while deleting");
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Show Presentations</h1>
            <input
                type="text"
                placeholder="Search by Student ID"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto border rounded shadow">
                    <table className="min-w-full text-center text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b">Student ID</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentations.length > 0 ? (
                                presentations.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={p.presentationFile}
                                                download
                                                className="text-blue-600 hover:underline"
                                            >
                                                {p.studentId}
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 border-b">{p.name}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="inline text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Presentation;
