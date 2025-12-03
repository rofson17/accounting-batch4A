"use client";
import Link from "next/link";
import { Home, FileText, Menu, X } from "lucide-react";
import { VscJersey } from "react-icons/vsc";
import { useState } from "react";
import clsx from "clsx";

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className={clsx(
                    "md:hidden fixed top-20  z-50 p-2 rounded-md bg-blue-500 text-white shadow-md",
                    isOpen ? "right-28" : "left-4"
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
                className={`fixed top-[4.6rem] left-0 h-full 
        bg-white border-r border-blue-300 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-40 flex flex-col 
        transition-transform duration-300 ease-in-out
        w-64 md:w-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <nav className="flex flex-col gap-3 p-4">
                    <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Home className="w-5 h-5" />
                        <span className="block sm:inline">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/jersey-order" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <VscJersey className="w-5 h-5" />
                        <span className="block sm:inline text-sm">Jersey Order</span>
                    </Link>
                    <Link href="/dashboard/presentation" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <FileText className="w-5 h-5" />
                        <span className="block sm:inline">Presentation</span>
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default DashboardSidebar