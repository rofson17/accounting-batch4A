"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [sizeCounts, setSizeCounts] = useState({});
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth !== "true") router.push("/login");
    }, [router]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/forms/jersey_order`, {
                params: { query, page, limit },
            });

            if (response.data.success) {
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
                setSizeCounts(response.data.sizeCounts || {});
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, query]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchOrders();
    };

    const handleLogout = () => {
        localStorage.removeItem("auth");
        router.push("/login");
    };


    const handleDownload = async () => {
        try {
            const response = await axios.get("/api/forms/jersey_order/download", {
                responseType: "blob",
            });
            // console.log(response);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "JerseyOrders.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };


    return (
        <div className="w-[80%] px-4 py-10">
            {/* Header */}

            <div className="flex gap-3 justify-end mb-4">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <FaDownload size={18} />
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                >
                    <FiLogOut size={18} />
                </button>
            </div>


            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, email, student ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
                >
                    Search
                </button>
            </form>

            {/* Size Count Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {Object.keys(sizeCounts).length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center">No size data available.</p>
                ) : (
                    Object.entries(sizeCounts).map(([size, data]) => (
                        <div
                            key={size}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex flex-col items-center justify-center shadow"
                        >
                            <p className="text-gray-500 text-sm">Size</p>
                            <p className="text-xl font-bold">{size}</p>
                            <p className="text-gray-700 mt-1 text-sm">
                                Short: {data.short} | Long: {data.long}
                            </p>
                            <p className="text-gray-700 mt-1 font-medium">Total: {data.total}</p>
                        </div>
                    ))
                )}
            </div>


            {/* Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto border border-gray-200">
                <table className="min-w-full text-left text-sm text-gray-700">
                    <thead className="bg-blue-600 text-white text-sm uppercase">
                        <tr>
                            <th className="px-3 py-3">#</th>
                            <th className="px-3 py-3">Name</th>
                            <th className="px-3 py-3">Student ID</th>
                            <th className="px-3 py-3">Phone</th>
                            <th className="px-3 py-3">Email</th>
                            <th className="px-3 py-3">Jersey No</th>
                            <th className="px-3 py-3">Display Name</th>
                            <th className="px-3 py-3">Size</th>
                            <th className="px-3 py-3">Sleeves</th>
                            <th className="px-3 py-3">Payment</th>
                            <th className="px-3 py-3">Transaction ID</th>
                            <th className="px-3 py-3">Screenshot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="10" className="text-center py-6">
                                    <Loader2 className="animate-spin inline-block text-blue-600" size={24} />
                                    <p>Loading...</p>
                                </td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{(page - 1) * limit + index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{order.name}</td>
                                    <td className="px-4 py-3">{order.studentId}</td>
                                    <td className="px-4 py-3">{order.phone}</td>
                                    <td className="px-4 py-3">{order.email}</td>
                                    <td className="px-4 py-3">{order.jerseyNumber}</td>
                                    <td className="px-4 py-3">{order.displayName || "-"}</td>
                                    <td className="px-4 py-3">{order.size}</td>
                                    <td className="px-4 py-3">{order.sleeves}</td>
                                    <td className="px-4 py-3 capitalize">{order.payment_method}</td>
                                    <td className="px-4 py-3">{order.transactionId || "-"}</td>
                                    <td className="px-4 py-3">
                                        {order.transactionScreenshot ? (
                                            <a
                                                href={order.transactionScreenshot}
                                                target="_blank"
                                                className="text-blue-600 underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-6 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${page <= 1
                        ? "text-gray-400 border-gray-300"
                        : "text-blue-600 border-blue-500 hover:bg-blue-50"
                        }`}
                >
                    <ChevronLeft size={18} /> Prev
                </button>

                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${page >= totalPages
                        ? "text-gray-400 border-gray-300"
                        : "text-blue-600 border-blue-500 hover:bg-blue-50"
                        }`}
                >
                    Next <ChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}

export default Dashboard