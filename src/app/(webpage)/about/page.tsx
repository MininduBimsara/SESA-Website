import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Lightbulb, Heart } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'

const AboutPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 py-24 px-4 md:px-8 lg:px-16 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            About SESA
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            Software Engineering Students&apos; Association
                        </p>
                        <p className="text-lg text-rose-50 max-w-2xl mx-auto">
                            University of Kelaniya - Faculty of Science
                        </p>
                    </div>
                </div>
            </section>

            {/* What is SESA Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                What is SESA?
                            </h2>
                            <div className="space-y-4 text-lg text-gray-700">
                                <p>
                                    SESA is the <strong>official student society</strong> for Software Engineering
                                    undergraduates in the Faculty of Science at University of Kelaniya.
                                </p>
                                <p>
                                    Our mission is to help students build both <strong>technical (&quot;hard&quot;) skills</strong> and
                                    <strong> interpersonal (&quot;soft&quot;) skills</strong>, encouraging collaboration and creating
                                    unity among students throughout their academic journey.
                                </p>
                                <p>
                                    As the <strong>only degree programme in software engineering offered in the state
                                        university system in Sri Lanka</strong>, we take pride in representing a unique and
                                    pioneering academic community.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/students-collaborating-on-software-development-pro.jpg"
                                alt="SESA Students Collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission & Values */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Vision, Mission & Values
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Vision */}
                        <Card className="border-2 border-rose-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                                    <Target className="w-7 h-7 text-rose-600" />
                                </div>
                                <CardTitle className="text-2xl">Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-gray-700">
                                    To produce innovative leaders who are not just technically competent but also
                                    problem solvers, socially aware, and capable of leading in various application areas.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Mission */}
                        <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                    <Lightbulb className="w-7 h-7 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl">Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-gray-700">
                                    Cultivate educated, skilled software engineers; promote research & innovation;
                                    enhance learning through collaboration with industry; encourage community
                                    interaction among students and lecturers.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Values */}
                        <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                                    <Heart className="w-7 h-7 text-purple-600" />
                                </div>
                                <CardTitle className="text-2xl">Values</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-gray-700">
                                    We value collaboration, innovation, continuous learning, social responsibility,
                                    and building a supportive community that bridges the gap between academic
                                    theory and real-world practice.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* About SETU */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            About SETU
                        </h2>
                        <p className="text-xl text-gray-600">
                            Software Engineering Teaching Unit
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900">Established in 2017</h3>
                                <p className="text-gray-700 text-lg">
                                    The Software Engineering Teaching Unit (SETU) was established in
                                    <strong> September 2017</strong> to handle the <em>Bachelor of Science Honours
                                        in Software Engineering</em> degree programme.
                                </p>
                                <p className="text-gray-700 text-lg">
                                    SETU emphasizes <strong>experiential learning</strong> through industrial training,
                                    student-led events, and collaborative workshops with industry partners.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900">Application Domains</h3>
                                <ul className="space-y-2 text-gray-700 text-lg">
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Net-centric applications</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Mobile computing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Data science & engineering</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Health informatics</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Digital games & animation</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-500 mt-1">•</span>
                                        <span>Business engineering</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-gray-700 text-lg">
                                Students engage with core and optional modules drawn from computer science,
                                engineering, and management, preparing them for diverse career paths in the
                                software industry.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Connect with SESA
                    </h2>
                    <p className="text-xl text-rose-50">
                        Be part of a pioneering student community that bridges theory and practice,
                        connects students with industry, and builds tomorrow&apos;s software engineering leaders.
                    </p>
                    <div className="flex justify-center pt-4">
                        <SocialLinks variant="buttons" />
                    </div>
                    <div className="flex justify-center pt-6">
                        <SocialLinks variant="icons" className="text-white" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage