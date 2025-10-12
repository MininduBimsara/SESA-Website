import React from 'react'
import Image from 'next/image'

const AboutSection = () => {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            About SESA
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            SESA is a student-led community for Software Engineering undergraduates.
                            We organize technical workshops, hackathons, mentorship programs, and
                            networking events that help bridge the gap between theory and practice.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our mission is to empower the next generation of software engineers by
                            providing hands-on learning experiences, industry connections, and a
                            supportive community where students can grow together.
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/students-collaborating-on-software-development-pro.jpg"
                            alt="SESA members collaborating"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
