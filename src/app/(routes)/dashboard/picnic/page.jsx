"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import clsx from "clsx";
import { MdOutlinePayment } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";


const Picnic = () => {
    const [payments, setPayments] = useState([]);
    const [students, setStudents] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");


    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/forms/picnic?query=${search}`);


            if (res.data.success) {
                setPayments(res.data.payments)
                setStudents(res.data.totalStudents)
            }

        } catch (err) {
            toast.error("Failed to load payments");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPayments();
    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPayments(search);
        }, 300)

        return () => clearTimeout(delayDebounce);
    }, [search])


    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "paid" ? "pending" : "paid";
            const res = await axios.patch(`/api/forms/picnic?id=${id}`, {
                status: newStatus,
            });

            if (res.data.success) {
                setPayments((prev) =>
                    prev.map((p) =>
                        p._id === id ? { ...p, status: newStatus } : p
                    )
                );
                toast.success("Status updated");
            }
        } catch {
            toast.error("Failed to update status");
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this payment?")) return;
        try {
            const res = await axios.delete(`/api/forms/picnic?id=${id}`);
            if (res.data.success) {
                setPayments((prev) => prev.filter((p) => p._id !== id));
                toast.success("Payment deleted successfully");
            } else {
                toast.error(res.data.message || "Failed to delete payment");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error while deleting");
        }
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl ml:text-3xl font-bold mb-4">Payment Records</h1>
            <h3 className="text-lg text-blue-500 mb-2 font-semibold">Total Students- {students}</h3>

            <div className="mb-4 font-bold text-lg">
                Total Amount: ৳ {payments.reduce((sum, p) => sum + p.amount, 0)}
            </div>
            <input
                type="text"
                placeholder="Search by Name or Student ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2"
            />


            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border hidden sm:table">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-1 border">Student ID</th>
                                <th className="p-1 border">Name</th>
                                <th className="p-1 border">Amount</th>
                                <th className="p-1 border">Method</th>
                                <th className="p-1 border">Details</th>
                                <th className="p-1 border">Status</th>
                                <th className="p-1 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p) => (
                                <tr key={p._id} className="hover:bg-gray-50 text-center">
                                    <td className="p-1 border">{p.studentId}</td>
                                    <td className="p-1 border">{p.name}</td>
                                    <td className="p-1 border">৳ {p.amount}</td>
                                    <td className="p-1 border capitalize">
                                        <div className="flex justify-center items-center">
                                            {p.payment_method === "cash" ? <TbBrandCashapp className="text-green-500" /> : <MdOutlinePayment className="text-pink-500" />}
                                            {p.payment_method}

                                        </div>

                                    </td>
                                    <td className="p-1 border">
                                        {p.payment_method === "bkash" ? (
                                            <div className="space-y-1">
                                                <p>
                                                    <strong className="bg-green-500 text-white px-1 rounded-md">Txn:</strong>{" "}
                                                    {p.transactionId}
                                                </p>
                                                <a
                                                    href={p.transactionScreenshot}
                                                    target="_blank"
                                                    className="bg-slate-800 text-white flex justify-center items-center rounded"
                                                >
                                                    <CiImageOn /> Screenshot
                                                </a>
                                            </div>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td className="p-1 border text-center">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={p.status === "paid"}
                                                onChange={() =>
                                                    toggleStatus(
                                                        p._id,
                                                        p.status
                                                    )
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-10 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative">
                                                <div className={clsx("absolute  top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5 ",
                                                    p.status === "paid" ? "left-5" : "left-1"
                                                )}></div>
                                            </div>

                                        </label>

                                    </td>
                                    <td className="p-2 border text-center">
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center justify-center mx-auto"
                                        >
                                            <FiTrash2 className="inline text-xl mr-1" />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile view */}
                    <div className="sm:hidden space-y-4">
                        {payments.map((p) => (
                            <div
                                key={p._id}
                                className="border rounded p-4 shadow relative"
                            >
                                <button
                                    onClick={() => handleDelete(p._id)}
                                    className="text-red-600 hover:text-red-800 absolute right-1 top-1"
                                >
                                    <FiTrash2 className="inline text-xl mr-1" />
                                </button>

                                <p>
                                    <strong>Name:</strong> {p.name}
                                </p>
                                <p>
                                    <strong>ID:</strong> {p.studentId}
                                </p>

                                <p>
                                    <strong>Amount:</strong> ৳ {p.amount}
                                </p>
                                <p>
                                    <strong>Method:</strong>{" "}
                                    <span className={clsx(
                                        "capitalize",
                                        p.payment_method === "cash" ? "text-green-500" : "text-pink-600")}>
                                        {p.payment_method}
                                    </span>

                                </p>

                                {p.payment_method === "bkash" && (
                                    <>
                                        <p>
                                            <strong>Txn:</strong>{" "}
                                            {p.transactionId}
                                        </p>
                                        <a
                                            href={p.transactionScreenshot}
                                            target="_blank"
                                            className="text-white bg-slate-800 px-4 py-0.5  rounded-md flex justify-center items-center"
                                        >
                                            <CiImageOn /> {" "} Screenshot
                                        </a>
                                    </>
                                )}

                                <div className="mt-2 flex items-center justify-between">
                                    <span className={clsx("capitalize font-medium text-white px-2 rounded-md",
                                        p.status === "paid" ? "bg-blue-500" : "bg-red-500"
                                    )}>
                                        {p.status}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={p.status === "paid"}
                                        onChange={() =>
                                            toggleStatus(p._id, p.status)
                                        }
                                        className="w-5 h-5"
                                    />


                                </div>

                            </div>
                        ))}
                    </div>

                    {payments.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            No payment records found
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Picnic;