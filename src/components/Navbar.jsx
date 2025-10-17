"use client"

import Link from "next/link"

export default () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                    <span className="ml-3 text-xl">Accounting Batch-4A</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
                    <Link href="/gallery" className="mr-5 hover:text-gray-900">Gallery</Link>
                    <Link href="/about" className="mr-5 hover:text-gray-900">About Us</Link>

                </nav>
                <Link href="/login" className="inline-flex items-center bg-blue-600 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base mt-4 md:mt-0 text-white">Dashboard</Link>
            </div>
        </header>
    )
}