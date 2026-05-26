import React from 'react'
import Image from 'next/image'
import { BookOpen, Globe, Smartphone, Database, Activity, Gamepad2, TrendingUp, GraduationCap } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#FCFCFC] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
                {/* Hero Section */}
                <section 
                    className="relative w-full rounded-[32px] overflow-hidden border border-[#D2D2D2] shadow-sm bg-cover bg-center py-20 px-6 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    style={{ backgroundImage: `url('/tech_watercolor_bg.png')` }}
                >
                    <div className="absolute inset-0 bg-[#FCFCFC]/35 pointer-events-none backdrop-blur-[1px]" />
                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-pulse" />
                            LEARN MORE
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-sans text-[#11112A] leading-[1.15] tracking-tight max-w-2xl mx-auto">
                            About SESA
                        </h1>
                        <p className="text-sm md:text-base text-[#32324E] max-w-xl mx-auto font-medium mt-4">
                            Software Engineering Students&apos; Association &bull; University of Kelaniya
                        </p>
                    </div>
                </section>

                {/* What is SESA Section */}
                <section className="bg-[#FCFCFC] rounded-[32px] border border-[#D2D2D2] shadow-sm p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                                Who We Are
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-sans text-[#11112A]">
                                What is SESA?
                            </h2>
                            <div className="space-y-4 text-sm md:text-base text-[#32324E] leading-relaxed font-normal">
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

                        <div className="relative h-[360px] rounded-[24px] overflow-hidden shadow-sm border border-[#D2D2D2]">
                            <Image
                                src="/6.jpeg"
                                alt="SESA Students Collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Vision, Mission & Values Section */}
                <section className="bg-[#FCFCFC] rounded-[32px] border border-[#D2D2D2] shadow-sm p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="text-center mb-10 space-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                            Our Foundation
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-[#11112A]">
                            Vision, Mission & Values
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Vision Card */}
                        <div className="bg-[#FCFCFC] rounded-2xl border border-[#D2D2D2] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default border-t-[3px] border-t-[#11112A] flex flex-col">
                            <h4 className="font-bold font-sans text-[#11112A] text-xl leading-snug mb-4">
                                Vision
                            </h4>
                            <p className="text-sm text-[#32324E] leading-relaxed font-normal">
                                To produce innovative leaders who are not just technically competent but also
                                problem solvers, socially aware, and capable of leading in various application areas.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-[#FCFCFC] rounded-2xl border border-[#D2D2D2] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default border-t-[3px] border-t-[#32324E] flex flex-col">
                            <h4 className="font-bold font-sans text-[#11112A] text-xl leading-snug mb-4">
                                Mission
                            </h4>
                            <p className="text-sm text-[#32324E] leading-relaxed font-normal">
                                Cultivate educated, skilled software engineers; promote research & innovation;
                                enhance learning through collaboration with industry; encourage community
                                interaction among students and lecturers.
                            </p>
                        </div>

                        {/* Values Card */}
                        <div className="bg-[#FCFCFC] rounded-2xl border border-[#D2D2D2] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default border-t-[3px] border-t-[#D2D2D2] flex flex-col">
                            <h4 className="font-bold font-sans text-[#11112A] text-xl leading-snug mb-4">
                                Values
                            </h4>
                            <p className="text-sm text-[#32324E] leading-relaxed font-normal">
                                We value collaboration, innovation, continuous learning, social responsibility,
                                and building a supportive community that bridges the gap between academic
                                theory and real-world practice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About SETU Section */}
                <section className="bg-[#FCFCFC] rounded-[32px] border border-[#D2D2D2] shadow-sm p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#11112A]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 animate-pulse duration-[10000ms]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D2D2D2]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

                    <div className="text-center mb-12 space-y-3 relative z-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                            Teaching Unit
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-[#11112A]">
                            About SETU
                        </h2>
                        <div className="inline-flex items-center gap-1.5 bg-[#FCFCFC] border border-[#D2D2D2] rounded-full px-3 py-1 text-xs font-semibold text-[#32324E] tracking-wide mt-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-pulse" />
                            Established in September 2017
                        </div>
                    </div>

                    <div className="space-y-10 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                            {/* Academic Foundation Card (Left) */}
                            <div className="lg:col-span-5 bg-[#FCFCFC] rounded-2xl border border-[#D2D2D2] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                <div className="space-y-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#11112A]/5 border border-[#11112A]/10 flex items-center justify-center text-[#11112A]">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold font-sans text-[#11112A]">Academic Foundation</h3>
                                    <div className="space-y-4 text-[#32324E] text-sm md:text-base leading-relaxed">
                                        <p>
                                            The Software Engineering Teaching Unit (SETU) handles the <strong className="text-[#11112A] font-semibold">Bachelor of Science Honours in Software Engineering</strong> degree programme.
                                        </p>
                                        <p>
                                            SETU emphasizes <strong className="text-[#11112A] font-semibold font-sans">experiential learning</strong> through comprehensive industrial training, student-led events, and collaborative workshops with industry leaders.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-[#D2D2D2] flex items-center gap-4 text-xs font-medium text-[#32324E]/75">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#11112A]" />
                                        <span>Honours Degree</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#32324E]" />
                                        <span>Industry Oriented</span>
                                    </div>
                                </div>
                            </div>

                            {/* Application Domains Grid (Right) */}
                            <div className="lg:col-span-7 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold font-sans text-[#11112A]">Application Domains</h3>
                                    <span className="text-xs font-medium text-[#32324E]/70 uppercase tracking-wider hidden sm:inline">Specializations Offered</span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Net-centric applications", icon: Globe, desc: "Web, cloud systems, and networked infrastructures." },
                                        { title: "Mobile computing", icon: Smartphone, desc: "iOS, Android, and cross-platform app ecosystems." },
                                        { title: "Data science & eng.", icon: Database, desc: "Big data architectures, analytics, and intelligent systems." },
                                        { title: "Health informatics", icon: Activity, desc: "Bio-medical software, e-health systems, and clinical tech." },
                                        { title: "Digital games & anim.", icon: Gamepad2, desc: "Interactive media, game design, and real-time graphics." },
                                        { title: "Business engineering", icon: TrendingUp, desc: "Enterprise resource planning, workflows, and business tech." }
                                    ].map((domain, idx) => (
                                        <div key={idx} className="bg-[#FCFCFC] rounded-xl border border-[#D2D2D2] p-4 flex gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#32324E]">
                                            <div className="w-10 h-10 rounded-lg bg-[#11112A]/5 border border-[#11112A]/10 flex items-center justify-center text-[#11112A] shrink-0">
                                                <domain.icon className="w-5 h-5" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-sm text-[#11112A] leading-snug">{domain.title}</h4>
                                                <p className="text-xs text-[#32324E] leading-relaxed font-normal">{domain.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Curriculum / Bottom Callout */}
                        <div className="bg-[#FCFCFC] rounded-2xl border border-[#D2D2D2] p-5 md:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-[#FCFCFC] border border-[#D2D2D2] flex items-center justify-center text-[#11112A] shrink-0">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5 max-w-xl">
                                    <h4 className="font-bold text-sm text-[#11112A]">Interdisciplinary Curriculum</h4>
                                    <p className="text-xs text-[#32324E] leading-relaxed font-normal">
                                        Students engage with core and optional modules drawn from computer science, engineering, and management, preparing them for diverse career paths in the software industry.
                                    </p>
                                </div>
                            </div>
                            <span className="shrink-0 text-xs font-semibold text-[#32324E] border border-[#D2D2D2] rounded-full px-3.5 py-1.5 bg-[#FCFCFC] uppercase tracking-wider">
                                Comprehensive Education
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutPage