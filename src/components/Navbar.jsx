"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="text-gray-600 body-font shadow-md bg-white sticky top-0 z-50">
            <div className="container mx-auto flex flex-wrap items-center p-5 justify-between md:flex-row">
                <Link
                    href="/"
                    className="flex text-2xl font-bold items-center text-gray-900"
                >
                    Accounting Batch- <span className="text-blue-600 ml-1">4A</span>
                </Link>

                <nav className="hidden md:flex md:ml-auto md:mr-auto items-center text-base justify-center space-x-6">
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/gallery" className="hover:text-blue-600 transition-colors">
                        Gallery
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">
                        About Us
                    </Link>
                </nav>

                <Link
                    href="/login"
                    className="hidden md:inline-flex items-center bg-blue-600 border-0 py-1 px-4 focus:outline-none hover:bg-blue-500 rounded text-base text-white transition"
                >
                    Dashboard
                </Link>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-md border-t border-gray-200">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-50 rounded px-3 py-2 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/gallery"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-50 rounded px-3 py-2 transition-colors"
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-50 rounded px-3 py-2 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-500 transition"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar
