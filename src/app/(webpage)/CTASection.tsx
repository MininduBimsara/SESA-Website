import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Users, Calendar } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'

const CTASection = () => {
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-12 bg-[#FCFCFC]">
            {/* Dark Widescreen Container Card */}
            <section className="bg-[#11112A] border border-[#32324E]/50 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 relative overflow-hidden flex flex-col gap-10 md:gap-12 text-white">
                


                {/* Section Header */}
                <div className="text-center relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FCFCFC]/20 bg-[#FCFCFC]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FCFCFC]">
                        Get Involved
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                        Ready to Join SESA?
                    </h2>
                    <p className="text-base md:text-lg text-[#D2D2D2] max-w-2xl mx-auto font-normal">
                        Be part of a community that empowers software engineering students 
                        through collaboration, innovation, and real-world experiences.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-[#32324E]/40 border border-[#32324E]/60 hover:border-[#FCFCFC]/50 rounded-2xl md:rounded-[1.75rem] p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-[#32324E] bg-[#11112A] flex items-center justify-center text-[#FCFCFC] group-hover:scale-105 transition-transform">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#FCFCFC] transition-colors tracking-tight">Network & Collaborate</h3>
                            <p className="text-[0.875rem] text-[#D2D2D2]/80 leading-relaxed font-normal">
                                Connect with fellow students, alumni, and industry professionals.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#32324E]/40 border border-[#32324E]/60 hover:border-[#FCFCFC]/50 rounded-2xl md:rounded-[1.75rem] p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-[#32324E] bg-[#11112A] flex items-center justify-center text-[#FCFCFC] group-hover:scale-105 transition-transform">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#FCFCFC] transition-colors tracking-tight">Attend Events</h3>
                            <p className="text-[0.875rem] text-[#D2D2D2]/80 leading-relaxed font-normal">
                                Participate in workshops, hackathons, and technical sessions.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#32324E]/40 border border-[#32324E]/60 hover:border-[#FCFCFC]/50 rounded-2xl md:rounded-[1.75rem] p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                        <div className="w-11 h-11 rounded-xl border border-[#32324E] bg-[#11112A] flex items-center justify-center text-[#FCFCFC] group-hover:scale-105 transition-transform">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#FCFCFC] transition-colors tracking-tight">Stay Updated</h3>
                            <p className="text-[0.875rem] text-[#D2D2D2]/80 leading-relaxed font-normal">
                                Get the latest news, opportunities, and announcements.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons and Social Media */}
                <div className="relative z-10 flex flex-col items-center gap-8 border-t border-[#32324E]/50 pt-8 mt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <Link href="/team" className="inline-block w-full sm:w-auto">
                            <button className="w-full bg-[#FCFCFC] hover:bg-[#D2D2D2] text-[#11112A] border border-[#FCFCFC] hover:border-[#D2D2D2] font-bold rounded-full px-8 py-4 text-sm transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 shadow-md">
                                <span>Meet Our Team</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/events" className="inline-block w-full sm:w-auto">
                            <button className="w-full bg-transparent hover:bg-[#32324E] text-white border border-[#32324E] hover:border-white font-bold rounded-full px-8 py-4 text-sm transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95">
                                <span>View Events</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    <div className="text-center space-y-3.5">
                        <p className="text-xs text-[#D2D2D2] font-bold uppercase tracking-wider">Connect with us on social media</p>
                        <div className="flex justify-center text-white bg-[#32324E]/30 p-3 rounded-2xl border border-[#32324E]/50">
                            <SocialLinks variant="icons" className="text-white hover:text-[#D2D2D2]" />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default CTASection
