import React from 'react'
import Link from 'next/link'
import SocialLinks from './SocialLinks'
import { Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5">
            <div className="bg-neutral-950 border border-neutral-900/60 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 text-neutral-400 relative overflow-hidden">
                
                {/* Subtle Radial Glow */}
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#EC1640] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold tracking-tight">SESA</h3>
                        <p className="text-sm leading-relaxed">
                            Software Engineering Students&apos; Association - University of Kelaniya
                        </p>
                        <p className="text-sm leading-relaxed text-neutral-550">
                            Empowering the next generation of software engineers through collaboration, innovation, and learning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold tracking-tight">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-[#EC1640] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#EC1640] transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-[#EC1640] transition-colors">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="hover:text-[#EC1640] transition-colors">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="hover:text-[#EC1640] transition-colors">
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="hover:text-[#EC1640] transition-colors">
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold tracking-tight">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#EC1640]" />
                                <span>Faculty of Science, University of Kelaniya, Sri Lanka</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-[#EC1640]" />
                                <a href="mailto:sesa@kln.ac.lk" className="hover:text-[#EC1640] transition-colors">
                                    sesa@kln.ac.lk
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-[#EC1640]" />
                                <span>+94 11 291 3266</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold tracking-tight">Follow Us</h3>
                        <p className="text-sm leading-relaxed">
                            Stay connected with SESA on social media for the latest updates and events.
                        </p>
                        <div className="pt-1">
                            <SocialLinks variant="icons" className="text-neutral-400 hover:text-white" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 relative z-10">
                    <p>
                        &copy; {new Date().getFullYear()}{" "}Software Engineering Students&apos; Association - University of Kelaniya.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
