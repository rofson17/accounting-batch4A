import Image from "next/image"
import galleryImages from "@/utils/gallery.json"


const Gallery = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">


                {/* Gallery */}
                <div className="flex flex-wrap md:-m-2 -m-1">
                    <div className="flex flex-wrap w-1/2">
                        {galleryImages.slice(0, 3).map((img, idx) => (
                            <div
                                key={idx}
                                className={`md:p-2 p-1 ${idx === 2 ? "w-full" : "w-1/2"}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={img.width}
                                    height={img.height}
                                    className="w-full h-full object-cover object-center block"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap w-1/2">
                        {galleryImages.slice(3).map((img, idx) => (
                            <div
                                key={idx}
                                className={`md:p-2 p-1 ${idx === 0 ? "w-full" : "w-1/2"}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={img.width}
                                    height={img.height}
                                    className="w-full h-full object-cover object-center block"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Gallery