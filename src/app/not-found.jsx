"use client"
import { IoHomeOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Error404Page = () => {
    const router = useRouter();

    return (
        <section className="h-[70vh] md:h-[80vh] flex justify-center items-center container ">
            <div className="">
                <div className="">
                    {/* image */}
                </div>
                <div className="">
                    <h2 className="md:text-4xl text-2xl">
                        <span className="text-red-500 uppercase">404 error</span>! Page Not Found 😵</h2>
                    <div className="flex justify-center items-center gap-2 my-10">
                        <button onClick={() => router.back()} className="border px-10 flex justify-center items-center cursor-pointer bg-blue-500 text-white rounded-md text-lg"> <IoMdArrowBack /> go back</button>
                        <button onClick={() => router.push("/")} className="border px-10 flex justify-center items-center cursor-pointer bg-blue-500 text-white rounded-md text-lg"> <IoHomeOutline /> home</button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Error404Page;