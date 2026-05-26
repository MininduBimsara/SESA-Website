import React from 'react'
import Image from 'next/image'

const AboutPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#f4f2ec] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
                {/* Hero Section */}
                <section 
                    className="relative w-full rounded-[32px] overflow-hidden border border-[#e5e3dd] shadow-sm bg-cover bg-center py-20 px-6 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    style={{ backgroundImage: `url('/tech_watercolor_bg.png')` }}
                >
                    <div className="absolute inset-0 bg-white/30 pointer-events-none backdrop-blur-[1px]" />
                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C00F38]/20 bg-[#C00F38]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#C00F38]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C00F38] animate-pulse" />
                            LEARN MORE
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-sans text-slate-900 leading-[1.15] tracking-tight max-w-2xl mx-auto">
                            About SESA
                        </h1>
                        <p className="text-sm md:text-base text-slate-700 max-w-xl mx-auto font-medium mt-4">
                            Software Engineering Students&apos; Association &bull; University of Kelaniya
                        </p>
                    </div>
                </section>

                {/* What is SESA Section */}
                <section className="bg-white rounded-[32px] border border-slate-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#C00F38]/20 bg-[#C00F38]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#C00F38]">
                                Who We Are
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900">
                                What is SESA?
                            </h2>
                            <div className="space-y-4 text-sm md:text-base text-slate-650 leading-relaxed font-normal">
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

                        <div className="relative h-[360px] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100">
                            <Image
                                src="/students-collaborating-on-software-development-pro.jpg"
                                alt="SESA Students Collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Vision, Mission & Values Section */}
                <section className="bg-white rounded-[32px] border border-slate-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="text-center mb-10 space-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C00F38]/20 bg-[#C00F38]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#C00F38]">
                            Our Foundation
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900">
                            Vision, Mission & Values
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Vision Card */}
                        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-default border-t-[3px] border-t-emerald-500 flex flex-col">
                            <h4 className="font-bold font-sans text-slate-900 text-xl leading-snug mb-4">
                                Vision
                            </h4>
                            <p className="text-sm text-slate-650 leading-relaxed font-normal">
                                To produce innovative leaders who are not just technically competent but also
                                problem solvers, socially aware, and capable of leading in various application areas.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-default border-t-[3px] border-t-orange-500 flex flex-col">
                            <h4 className="font-bold font-sans text-slate-900 text-xl leading-snug mb-4">
                                Mission
                            </h4>
                            <p className="text-sm text-slate-650 leading-relaxed font-normal">
                                Cultivate educated, skilled software engineers; promote research & innovation;
                                enhance learning through collaboration with industry; encourage community
                                interaction among students and lecturers.
                            </p>
                        </div>

                        {/* Values Card */}
                        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-default border-t-[3px] border-t-[#C00F38] flex flex-col">
                            <h4 className="font-bold font-sans text-slate-900 text-xl leading-snug mb-4">
                                Values
                            </h4>
                            <p className="text-sm text-slate-650 leading-relaxed font-normal">
                                We value collaboration, innovation, continuous learning, social responsibility,
                                and building a supportive community that bridges the gap between academic
                                theory and real-world practice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About SETU Section */}
                <section className="bg-white rounded-[32px] border border-slate-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="text-center mb-10 space-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C00F38]/20 bg-[#C00F38]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#C00F38]">
                            Teaching Unit
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900">
                            About SETU
                        </h2>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
                            Established in 2017
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-10 items-start">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold font-sans text-slate-900">Academic Foundation</h3>
                                <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                                    The Software Engineering Teaching Unit (SETU) was established in
                                    <strong> September 2017</strong> to handle the <em>Bachelor of Science Honours
                                        in Software Engineering</em> degree programme.
                                </p>
                                <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                                    SETU emphasizes <strong>experiential learning</strong> through industrial training,
                                    student-led events, and collaborative workshops with industry partners.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold font-sans text-slate-900">Application Domains</h3>
                                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-slate-650 text-sm md:text-base">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Net-centric applications</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Mobile computing</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Data science & eng.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Health informatics</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Digital games & anim.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C00F38]" />
                                        <span>Business engineering</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto">
                                Students engage with core and optional modules drawn from computer science,
                                engineering, and management, preparing them for diverse career paths in the
                                software industry.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutPage