"use client";

import { useState, useEffect } from "react";
import { FaCalculator, FaUsers, FaTshirt } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slides from "@/utils/slides.json";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length])

    const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrent((current + 1) % slides.length);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Hero / Carousel */}
            <div className="relative w-full h-[70vh] overflow-hidden rounded-b-3xl shadow-md">
                {slides.map((slide, index) => (
                    <div
                        key={index}
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-3">{slide.title}</h2>
                            <p className="text-lg md:text-xl max-w-2xl">{slide.desc}</p>
                        </div>
                    </div>
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

            {/* Department Info Section */}
            <section className="text-center mt-12 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
                    Accounting Department Jersey 2025
                </h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    The <span className="font-semibold text-blue-600">Department of Accounting</span> is proud to
                    introduce this year’s exclusive <span className="font-semibold">Jersey Collection</span> — made for
                    unity, pride, and style. Customize your own jersey and be part of our departmental identity.
                </p>

                <Link
                    href="/forms/jersey_2025"
                    className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Order Your Jersey Now
                </Link>
            </section>

            {/* Feature Cards */}
            <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <FaCalculator className="mx-auto text-blue-600 mb-4" size={50} />
                    <h3 className="text-2xl font-semibold mb-2">For Accountants</h3>
                    <p className="text-gray-600">
                        Designed especially for Accounting students — smart, stylish, and professional.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <FaUsers className="mx-auto text-purple-600 mb-4" size={50} />
                    <h3 className="text-2xl font-semibold mb-2">Show Unity</h3>
                    <p className="text-gray-600">
                        Join your batchmates and represent your department with pride and teamwork.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <FaTshirt className="mx-auto text-green-600 mb-4" size={50} />
                    <h3 className="text-2xl font-semibold mb-2">Custom Fit</h3>
                    <p className="text-gray-600">
                        Choose your name, number, and size — each jersey is made just for you.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Home;