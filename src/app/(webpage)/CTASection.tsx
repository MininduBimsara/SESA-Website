import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Users, Calendar } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'

const CTASection = () => {
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Join SESA?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Be part of a community that empowers software engineering students 
                        through collaboration, innovation, and real-world experiences
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-rose-500/20 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-rose-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Network & Collaborate</h3>
                        <p className="text-gray-400">
                            Connect with fellow students, alumni, and industry professionals
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Attend Events</h3>
                        <p className="text-gray-400">
                            Participate in workshops, hackathons, and technical sessions
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                            <Mail className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                        <p className="text-gray-400">
                            Get the latest news, opportunities, and announcements
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href="/team"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
                    >
                        Meet Our Team
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all border border-white/20"
                    >
                        View Events
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-gray-400 mb-4">Connect with us on social media</p>
                    <div className="flex justify-center">
                        <SocialLinks variant="icons" className="text-white" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
