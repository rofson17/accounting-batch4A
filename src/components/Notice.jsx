"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get("api/notice?latest=1");
                if (res.data.success) {
                    setNotices(res.data.notices);
                }
            } catch (err) {
                console.log("notice fetch error", err);
            } finally {
                setLoading(false);
            }
        }
        fetchNotices();
    }, [])

    const variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }

    if (loading) {
        return (
            <div className="flex justify-center mt-16">
                <AiOutlineLoading3Quarters className="text-blue-600 text-4xl animate-spin" />
            </div>
        );
    }
    const activeNotices = notices.filter((item) => {
        const deadline = new Date(item.deadline);
        return deadline > new Date();
    });

    if (activeNotices.length === 0) return null;

    return (
        <motion.section
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12 px-4"
        >
            <div className="max-w-3xl mx-auto space-y-4">
                {notices.map((item) => {
                    const deadline = new Date(item.deadline);
                    const expired = deadline < new Date();

                    return (
                        <div
                            key={item._id}
                            className={`p-5 rounded-md ${expired ? "text-gray-500" : "bg-white"
                                }`}
                        >
                            <h3 className="text-3xl md:text-3xl font-semibold capitalize text-blue-700 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-700 mb-2">{item.notice}</p>


                            <Link
                                href={item.link}
                                className="inline-block mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {item.linkText}
                            </Link>

                        </div>
                    )
                })}
            </div>
        </motion.section>
    )
}

export default Notice;
