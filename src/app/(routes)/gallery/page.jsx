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

                {/* mosaic grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">

                    {galleryImages.map((img, index) => {
                        let spanClass = "";

                        if (index === 0) {
                            // big image left
                            spanClass =
                                "md:col-span-4 lg:col-span-3 lg:row-span-2 md:row-span-2";
                        } else {
                            // right side small images
                            spanClass = "md:col-span-2 lg:col-span-3 lg:row-span-1";
                        }

                        return (
                            <div
                                key={index}
                                className={`relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl ${spanClass}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                />

                                <button
                                    onClick={() => handleDownload(img.src, img.alt)}
                                    className="
                    absolute top-3 right-3 z-10 flex items-center justify-center 
                    bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md 
                    hover:bg-white transition duration-200
                    opacity-100 
                    lg:opacity-0 lg:group-hover:opacity-100
                  "
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
