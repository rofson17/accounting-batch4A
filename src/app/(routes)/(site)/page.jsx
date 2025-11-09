"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCalculator, FaUsers, FaTshirt } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slides from "@/utils/slides.json";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
    const [current, setCurrent] = useState(0);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const cards = [
        {
            icon: <FaCalculator className="mx-auto text-blue-600 mb-4" size={50} />,
            title: "For Accountants",
            text: "Designed especially for Accounting students — smart, stylish, and professional.",
        },
        {
            icon: <FaUsers className="mx-auto text-purple-600 mb-4" size={50} />,
            title: "Show Unity",
            text: "Join your batchmates and represent your department with pride and teamwork.",
        },
        {
            icon: <FaTshirt className="mx-auto text-green-600 mb-4" size={50} />,
            title: "Custom Fit",
            text: "Choose your name, number, and size — each jersey is made just for you.",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrent((current + 1) % slides.length);

    const heroText = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const cardContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const cardItem = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div ref={heroRef} className="relative w-full h-[70vh] overflow-hidden rounded-b-3xl shadow-md">
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        style={{ y }}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === current}
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
                            <motion.div
                                variants={heroText}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                                <p className="text-lg md:text-xl max-w-2xl">{slide.desc}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mt-12 px-4"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
                    Accounting Department Jersey 2025
                </h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    The <span className="font-semibold text-blue-600">Department of Accounting</span> is proud to
                    introduce this year’s exclusive{" "}
                    <span className="font-semibold">Jersey Collection</span> — made for unity, pride, and style.
                    Customize your own jersey and be part of our departmental identity.
                </p>

                <Link
                    href="/forms/jersey_2025"
                    className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Order Your Jersey Now
                </Link>
            </motion.section>

            <motion.section
                variants={cardContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        variants={cardItem}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition"
                    >
                        {card.icon}
                        <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.text}</p>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    )
}

export default Home
