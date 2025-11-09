"use client";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import galleryImages from "@/utils/gallery.json";

const Gallery = () => {
    const handleDownload = async (src, name) => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = name || "image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <section className="text-gray-800 body-font bg-gray-50">
            <div className="container px-5 py-16 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
                    Our Photo Gallery
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-fr">
                    {galleryImages.map((img, idx) => {
                        let spanClass = "";
                        if (idx === 0) spanClass = "lg:col-span-6"; // first image big
                        else spanClass = "lg:col-span-3"; // others smaller

                        return (
                            <div
                                key={idx}
                                className={`relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${spanClass}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={img.width}
                                    height={img.height}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                />

                                <button
                                    onClick={() => handleDownload(img.src, img.alt)}
                                    className="absolute top-3 right-3 z-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition duration-200 opacity-0 group-hover:opacity-100"
                                    title="Download"
                                >
                                    <FaDownload className="text-blue-600 text-lg" />
                                </button>

                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
