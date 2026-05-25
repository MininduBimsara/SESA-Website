import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Users, Calendar } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'

const CTASection = () => {
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-12 bg-white">
            {/* Black Widescreen Container Card */}
            <section className="bg-black border border-neutral-900 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 relative overflow-hidden flex flex-col gap-10 md:gap-12 text-white">
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                
                {/* Glowing red radial blur in background */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EC1640] rounded-full filter blur-[120px] opacity-25 pointer-events-none" />
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px] opacity-15 pointer-events-none" />

                {/* Section Header */}
                <div className="text-center relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        Get Involved
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                        Ready to Join SESA?
                    </h2>
                    <p className="text-base md:text-lg text-neutral-350 max-w-2xl mx-auto font-normal">
                        Be part of a community that empowers software engineering students 
                        through collaboration, innovation, and real-world experiences.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-neutral-950/60 border border-neutral-900 hover:border-[#EC1640]/40 rounded-2xl md:rounded-[1.75rem] p-6 hover:shadow-[0_0_30px_rgba(236,22,64,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-neutral-800 bg-[#EC1640]/10 flex items-center justify-center text-[#EC1640] group-hover:scale-105 transition-transform">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#EC1640] transition-colors tracking-tight">Network & Collaborate</h3>
                            <p className="text-[0.875rem] text-neutral-400 leading-relaxed font-normal">
                                Connect with fellow students, alumni, and industry professionals.
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-950/60 border border-neutral-900 hover:border-[#EC1640]/40 rounded-2xl md:rounded-[1.75rem] p-6 hover:shadow-[0_0_30px_rgba(236,22,64,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-neutral-800 bg-[#EC1640]/10 flex items-center justify-center text-[#EC1640] group-hover:scale-105 transition-transform">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#EC1640] transition-colors tracking-tight">Attend Events</h3>
                            <p className="text-[0.875rem] text-neutral-400 leading-relaxed font-normal">
                                Participate in workshops, hackathons, and technical sessions.
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-950/60 border border-neutral-900 hover:border-[#EC1640]/40 rounded-2xl md:rounded-[1.75rem] p-6 hover:shadow-[0_0_30px_rgba(236,22,64,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-neutral-800 bg-[#EC1640]/10 flex items-center justify-center text-[#EC1640] group-hover:scale-105 transition-transform">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#EC1640] transition-colors tracking-tight">Stay Updated</h3>
                            <p className="text-[0.875rem] text-neutral-400 leading-relaxed font-normal">
                                Get the latest news, opportunities, and announcements.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons and Social Media */}
                <div className="relative z-10 flex flex-col items-center gap-8 border-t border-neutral-900 pt-8 mt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <Link href="/team" className="inline-block w-full sm:w-auto">
                            <button className="w-full bg-[#EC1640] hover:bg-[#EC1640]/90 text-white border border-[#EC1640] hover:border-[#EC1640]/90 font-bold rounded-full px-8 py-4 text-sm transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 shadow-[0_4px_16px_rgba(236,22,64,0.25)]">
                                <span>Meet Our Team</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/events" className="inline-block w-full sm:w-auto">
                            <button className="w-full bg-transparent hover:bg-neutral-900 text-white border border-neutral-800 hover:border-white font-bold rounded-full px-8 py-4 text-sm transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95">
                                <span>View Events</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    <div className="text-center space-y-3.5">
                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Connect with us on social media</p>
                        <div className="flex justify-center text-white bg-neutral-950/40 p-3 rounded-2xl border border-neutral-900/50">
                            <SocialLinks variant="icons" className="text-white hover:text-[#EC1640]" />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default CTASection
