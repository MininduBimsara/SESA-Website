import React from 'react'
import Image from 'next/image'
import { Target, Users, Lightbulb, Briefcase } from 'lucide-react'

const AboutSection = () => {
    return (
        <>
            {/* About SESA */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left: Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                About SESA
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                SESA is the <strong>official student society</strong> for Software Engineering
                                undergraduates in the Faculty of Science at University of Kelaniya.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our mission is to help students build both <strong>technical (&quot;hard&quot;) skills</strong> and
                                <strong> interpersonal (&quot;soft&quot;) skills</strong>, encouraging collaboration and creating
                                unity among students throughout their academic journey.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We represent one of the <strong>pioneering software engineering degree programmes
                                in Sri Lanka&apos;s state university system</strong>, fostering innovation and
                                excellence in software engineering education.
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

            {/* What We Do */}
            <section className="py-32 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    {/* Floating Balls */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-20 right-20 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-40 w-36 h-36 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
                    <div className="absolute top-1/2 left-1/4 w-44 h-44 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-3000"></div>
                    <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-5000"></div>
                    
                    {/* Blue-Red Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-red-50/80"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What We Do
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We cultivate educated, skilled software engineers through innovation, 
                            collaboration, and real-world learning experiences
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                        {/* Technical Skills Development */}
                        <div className="text-center space-y-5">
                            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
                                <Target className="w-8 h-8 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Skill Development
                            </h3>
                            <p className="text-gray-600">
                                Build technical and interpersonal skills through workshops, hackathons, and hands-on projects
                            </p>
                        </div>

                        {/* Research & Innovation */}
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                                <Lightbulb className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Research & Innovation
                            </h3>
                            <p className="text-gray-600">
                                Promote research and innovation in emerging technologies and software engineering practices
                            </p>
                        </div>

                        {/* Industry Collaboration */}
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                                <Briefcase className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Industry Collaboration
                            </h3>
                            <p className="text-gray-600">
                                Enhance learning through partnerships with industry, providing real-world exposure and networking
                            </p>
                        </div>

                        {/* Community Building */}
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Community Building
                            </h3>
                            <p className="text-gray-600">
                                Foster interaction and unity among students, lecturers, and alumni for collaborative growth
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutSection
