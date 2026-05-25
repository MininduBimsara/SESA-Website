import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Lightbulb, Heart } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'

const AboutPage = () => {
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pt-24 pb-8 md:px-5 md:pt-28 bg-white flex flex-col gap-6 md:gap-8">
            {/* Hero Section Card */}
            <section className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-neutral-900 to-slate-950 text-white border border-white/5 shadow-2xl py-20 px-6 md:px-10 lg:px-12 text-center overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" 
                    style={{ backgroundImage: 'url(/students-collaborating-on-software-development-pro.jpg)' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="relative z-10 space-y-4">
                    <span className="text-[#EC1640] text-xs font-semibold uppercase tracking-[0.2em]">LEARN MORE</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-white tracking-normal leading-tight">
                        About SESA
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
                        Software Engineering Students&apos; Association &bull; University of Kelaniya
                    </p>
                </div>
            </section>

            {/* What is SESA Section Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                            What is SESA?
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed font-normal">
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
                                We represent one of the <strong>pioneering software engineering degree programmes
                                in Sri Lanka&apos;s state university system</strong>, fostering innovation and
                                excellence in software engineering education.
                            </p>
                        </div>
                    </div>

                    <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                        <Image
                            src="/students-collaborating-on-software-development-pro.jpg"
                            alt="SESA Students Collaboration"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Vision, Mission & Values Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="text-center mb-10 space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        Our Foundation
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                        Our Vision, Mission & Values
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Vision */}
                    <Card className="border border-slate-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-xl bg-rose-100/70 flex items-center justify-center mb-4 border border-rose-200/50">
                                <Target className="w-6 h-6 text-[#EC1640]" />
                            </div>
                            <CardTitle className="text-xl font-serif">Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                                To produce innovative leaders who are not just technically competent but also
                                problem solvers, socially aware, and capable of leading in various application areas.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    {/* Mission */}
                    <Card className="border border-slate-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-xl bg-blue-100/70 flex items-center justify-center mb-4 border border-blue-200/50">
                                <Lightbulb className="w-6 h-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl font-serif">Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                                Cultivate educated, skilled software engineers; promote research & innovation;
                                enhance learning through collaboration with industry; encourage community
                                interaction among students and lecturers.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    {/* Values */}
                    <Card className="border border-slate-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-xl bg-purple-100/70 flex items-center justify-center mb-4 border border-purple-200/50">
                                <Heart className="w-6 h-6 text-purple-600" />
                            </div>
                            <CardTitle className="text-xl font-serif">Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                                We value collaboration, innovation, continuous learning, social responsibility,
                                and building a supportive community that bridges the gap between academic
                                theory and real-world practice.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* About SETU Section Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="text-center mb-10 space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        Teaching Unit
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                        About SETU
                    </h2>
                    <p className="text-sm text-slate-500">
                        Software Engineering Teaching Unit &bull; Established in 2017
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold font-serif text-slate-950">Academic Foundation</h3>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                                The Software Engineering Teaching Unit (SETU) was established in
                                <strong> September 2017</strong> to handle the <em>Bachelor of Science Honours
                                    in Software Engineering</em> degree programme.
                            </p>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                                SETU emphasizes <strong>experiential learning</strong> through industrial training,
                                student-led events, and collaborative workshops with industry partners.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold font-serif text-slate-950">Application Domains</h3>
                            <ul className="grid grid-cols-2 gap-2 text-slate-700 text-sm md:text-base">
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Net-centric applications</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Mobile computing</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Data science & eng.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Health informatics</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Digital games & anim.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#EC1640] font-bold">&bull;</span>
                                    <span>Business engineering</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                            Students engage with core and optional modules drawn from computer science,
                            engineering, and management, preparing them for diverse career paths in the
                            software industry.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage