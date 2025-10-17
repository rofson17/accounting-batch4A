const About = () => {
    return (
        <section className="text-gray-700 body-font bg-gray-50 py-16">
            <div className="container mx-auto px-5">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="sm:text-4xl text-3xl font-bold text-gray-900 mb-4">
                        About Accounting Batch 4 Section A
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-base sm:w-2/3 mx-auto">
                        Welcome to the official page of Accounting Batch 4, Section A.
                        This platform is designed to connect students, share resources,
                        and celebrate our achievements throughout the academic journey.
                    </p>
                </div>

                {/* Features / Info Cards */}
                <div className="flex flex-wrap -m-4">
                    {/* Card 1 */}
                    <div className="p-4 md:w-1/3">
                        <div className="h-full bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <h2 className="text-lg font-semibold text-blue-600 mb-2">
                                Our Mission
                            </h2>
                            <p className="leading-relaxed text-gray-600">
                                To foster a collaborative and innovative learning environment
                                where each student can excel in accounting and finance.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-4 md:w-1/3">
                        <div className="h-full bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <h2 className="text-lg font-semibold text-blue-600 mb-2">
                                Our Vision
                            </h2>
                            <p className="leading-relaxed text-gray-600">
                                To become a leading batch known for academic excellence,
                                teamwork, and strong professional ethics.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-4 md:w-1/3">
                        <div className="h-full bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                            <h2 className="text-lg font-semibold text-blue-600 mb-2">
                                Our Activities
                            </h2>
                            <p className="leading-relaxed text-gray-600">
                                We organize study groups, seminars, and cultural events to
                                enhance knowledge, skill, and camaraderie among students.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;