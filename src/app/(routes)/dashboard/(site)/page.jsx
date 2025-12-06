"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import NoticeForm from "@/components/NoticeForm";

const Dashboard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNotices = async () => {
        try {
            setLoading(true);
            // api/notice?latest=1
            const res = await axios.get("api/notice");
            setNotices(res.data.notices || []);
        } catch (err) {
            console.error("Failed loading notices:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotices();
    }, []);

    const remove = async (id) => {
        try {
            await axios.delete(`/api/notice?id=${id}`);
            loadNotices();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const expired = (deadline) => (deadline ? new Date(deadline) < new Date() : false);

    return (
        <div className="w-full px-4 md:px-8 py-6">
            <NoticeForm onSuccess={loadNotices} />

            <h3 className="text-lg font-semibold mb-4 mt-8">Notices</h3>

            {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-2 rounded-lg border bg-gray-100 animate-pulse h-40"></div>
                    ))}
                </div>
            ) : notices.length === 0 ? (
                <p className="text-gray-500 text-sm">No notices available</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {notices.map((item) => (
                        <div
                            key={item._id}
                            className={`relative border rounded-lg p-4 shadow-sm transition ${expired(item.deadline) ? "opacity-40 bg-gray-100" : "bg-white hover:shadow-md"
                                }`}
                        >
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <p className="text-sm text-gray-700 mt-1">{item.notice}</p>

                            {item.linkText && item.link && (
                                <p className="text-xs mt-2 text-gray-500">
                                    <span className="font-medium">{item.linkText}:</span>{" "}
                                    <a href={item.link} className="underline text-blue-600" target="_blank">
                                        {item.linkText}
                                    </a>
                                </p>
                            )}

                            {item.deadline && (
                                <p className="text-xs text-red-500 mt-1">
                                    Deadline:{" "}
                                    {new Date(item.deadline).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    alert("Do you want to delete this Notice")
                                    remove(item._id)
                                }}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <FiTrash2 size={18} />
                            </button>

                            {expired(item.deadline) && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                                    Expired
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard;
