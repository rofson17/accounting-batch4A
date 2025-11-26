"use client";
import Link from "next/link";
import { Home, FileText } from "lucide-react"; // using lucide icons

const DashboardSidebar = () => {
    return (
        <div className="fixed top-[4.6rem] left-0 h-full w-20 md:w-40 bg-white border-r border-blue-300 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-50 flex flex-col ">


            {/* Links */}
            <nav className="flex flex-col gap-3 p-4">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                    <Home className="w-5 h-5" />
                    <span className="hidden sm:inline">Dashboard</span>
                </Link>

                <Link
                    href="/dashboard/presentation"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                    <FileText className="w-5 h-5" />
                    <span className="hidden sm:inline">Presentation</span>
                </Link>
            </nav>
        </div>
    );
};

export default DashboardSidebar;
