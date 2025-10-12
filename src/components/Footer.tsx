import React from 'react'
import Link from 'next/link'
import SocialLinks from './SocialLinks'
import { Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold">SESA</h3>
                        <p className="text-sm">
                            Software Engineering Students&apos; Association - University of Kelaniya
                        </p>
                        <p className="text-sm">
                            Empowering the next generation of software engineers through collaboration, innovation, and learning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-rose-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-rose-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-rose-400 transition-colors">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="hover:text-rose-400 transition-colors">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="hover:text-rose-400 transition-colors">
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="hover:text-rose-400 transition-colors">
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-rose-400" />
                                <span>Faculty of Science, University of Kelaniya, Sri Lanka</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-rose-400" />
                                <a href="mailto:sesa@kln.ac.lk" className="hover:text-rose-400 transition-colors">
                                    sesa@kln.ac.lk
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-rose-400" />
                                <span>+94 11 291 3266</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold">Follow Us</h3>
                        <p className="text-sm">
                            Stay connected with SESA on social media for the latest updates and events.
                        </p>
                        <SocialLinks variant="icons" className="text-gray-300" />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Software Engineering Students&apos; Association - University of Kelaniya.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
