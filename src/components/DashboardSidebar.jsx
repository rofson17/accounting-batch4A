"use client";
import Link from "next/link";
import { Home, FileText, Menu, X } from "lucide-react";
import { VscJersey } from "react-icons/vsc";
import { IoMdHappy } from "react-icons/io";
import presentations from "@/utils/presentations.json"
import { useState } from "react";
import clsx from "clsx";

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    return (
        <>
            <button
                className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
                className={clsx(
                    "fixed top-[4.6rem] left-0 h-full bg-white border-r border-blue-300 shadow-md z-40 flex flex-col transition-transform duration-300 w-64 md:w-44",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <nav className="flex flex-col gap-3 p-4">

                    <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Home className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>

                    <Link href="/dashboard/jersey-order" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <VscJersey className="w-5 h-5" />
                        <span className="text-sm">Jersey Order</span>
                    </Link>
                    <Link href="/dashboard/picnic" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <IoMdHappy className="w-5 h-5" />
                        <span className="text-sm">Picnic </span>
                    </Link>
                    {/* Dropdown */}
                    <div className="flex flex-col">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                        >
                            <span className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Presentations
                            </span>
                        </button>

                        <div
                            className={clsx(
                                "ml-4 flex flex-col gap-1 transition-all",
                                dropdownOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0 overflow-hidden"
                            )}
                        >
                            {presentations.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-sm p-2 hover:bg-gray-100 rounded"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                </nav>
            </div>
        </>
    )
}

export default DashboardSidebar;
