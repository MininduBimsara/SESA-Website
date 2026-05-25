import React from 'react'
import Image from 'next/image'
import { Target, Users, Lightbulb, Briefcase } from 'lucide-react'

const AboutSection = () => {
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 py-6 md:px-5 md:py-8 bg-white flex flex-col gap-6 md:gap-8">
            
            {/* About SESA Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6 flex flex-col items-start">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Who We Are
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none">
                            About <span className="text-[#EC1640]">SESA</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                SESA is the <strong className="text-black font-semibold">official student society</strong> for Software Engineering
                                undergraduates in the Faculty of Science at University of Kelaniya.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                Our mission is to help students build both <strong className="text-black font-semibold">technical (&quot;hard&quot;) skills</strong> and
                                <strong className="text-black font-semibold"> interpersonal (&quot;soft&quot;) skills</strong>, encouraging collaboration and creating
                                unity among students throughout their academic journey.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                We represent one of the <strong className="text-black font-semibold">pioneering software engineering degree programmes
                                in Sri Lanka&apos;s state university system</strong>, fostering innovation and
                                excellence in software engineering education.
                            </p>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-[340px] md:h-[420px] rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
                        <Image
                            src="/students-collaborating-on-software-development-pro.jpg"
                            alt="SESA members collaborating"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>
            </section>

            {/* What We Do Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-12 lg:p-14 relative overflow-hidden">
                {/* Subtle Modern Blob Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 w-48 h-48 bg-[#EC1640] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-3000"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-12 md:gap-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Our Core Focus
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none">
                            What We Do
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
                            We cultivate educated, skilled software engineers through innovation, 
                            collaboration, and real-world learning experiences.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Technical Skills Development */}
                        <div className="bg-white border border-slate-200/70 hover:border-[#EC1640]/40 rounded-[1.75rem] p-6 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left group">
                            <div className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-slate-50 text-slate-700 group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-[#EC1640] transition-all duration-300">
                                <Target className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-[1.125rem] font-bold text-black tracking-tight">
                                    Skill Development
                                </h3>
                                <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal">
                                    Build technical and interpersonal skills through workshops, hackathons, and hands-on projects.
                                </p>
                            </div>
                        </div>

                        {/* Research & Innovation */}
                        <div className="bg-white border border-slate-200/70 hover:border-[#EC1640]/40 rounded-[1.75rem] p-6 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left group">
                            <div className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-slate-50 text-slate-700 group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-[#EC1640] transition-all duration-300">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-[1.125rem] font-bold text-black tracking-tight">
                                    Research & Innovation
                                </h3>
                                <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal">
                                    Promote research and innovation in emerging technologies and software engineering practices.
                                </p>
                            </div>
                        </div>

                        {/* Industry Collaboration */}
                        <div className="bg-white border border-slate-200/70 hover:border-[#EC1640]/40 rounded-[1.75rem] p-6 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left group">
                            <div className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-slate-50 text-slate-700 group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-[#EC1640] transition-all duration-300">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-[1.125rem] font-bold text-black tracking-tight">
                                    Industry Collaboration
                                </h3>
                                <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal">
                                    Enhance learning through partnerships with industry, providing real-world exposure and networking.
                                </p>
                            </div>
                        </div>

                        {/* Community Building */}
                        <div className="bg-white border border-slate-200/70 hover:border-[#EC1640]/40 rounded-[1.75rem] p-6 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left group">
                            <div className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-slate-50 text-slate-700 group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-[#EC1640] transition-all duration-300">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-[1.125rem] font-bold text-black tracking-tight">
                                    Community Building
                                </h3>
                                <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal">
                                    Foster interaction and unity among students, lecturers, and alumni for collaborative growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutSection
