'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/icons/SocialIcons'

interface TeamMember {
    id: string
    name: string
    position: string
    image?: string | null
    linkedin?: string | null
    github?: string | null
    email?: string | null
}

interface TeamData {
    currentYear: number
    currentBoard: TeamMember[]
    previousBoard: TeamMember[]
    previousYear?: number
}

interface TeamPageClientProps {
    teamData: TeamData
}

const TeamPageClient = ({ teamData }: TeamPageClientProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 py-20 px-4 md:px-8 lg:px-16 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Meet Our Executive Board {teamData.currentYear}/{(teamData.currentYear + 1).toString().slice(-2)}
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            The minds driving innovation, teamwork, and growth at SESA.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Current Executive Board */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {teamData.currentBoard.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                className="group"
                            >
                                <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-rose-400 transition-all duration-300 hover:shadow-xl">
                                    {/* Profile Image */}
                                    <div className="relative mx-auto mb-6 w-32 h-32">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                                        <div className="relative w-full h-full rounded-full border-4 border-rose-200 group-hover:border-rose-400 overflow-hidden bg-gray-100 transition-colors">
                                            <Image
                                                src={member.image || '/placeholder-user.jpg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Member Info */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-rose-600 text-sm font-medium mb-4">
                                            {member.position}
                                        </p>

                                        {/* Social Links */}
                                        {(member.email || member.linkedin || member.github) && (
                                            <div className="flex justify-center gap-3 mt-4">
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors"
                                                    >
                                                        <Mail className="w-4 h-4 text-rose-600" />
                                                    </a>
                                                )}
                                                {member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors"
                                                    >
                                                        <LinkedinIcon className="w-4 h-4 text-rose-600" />
                                                    </a>
                                                )}
                                                {member.github && (
                                                    <a
                                                        href={member.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors"
                                                    >
                                                        <GithubIcon className="w-4 h-4 text-rose-600" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Previous Executive Board Section */}
            {teamData.previousBoard.length > 0 && (
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Honoring Our Previous Executive Board
                                {teamData.previousYear && ` (${teamData.previousYear}/${(teamData.previousYear + 1).toString().slice(-2)})`}
                            </h2>
                            <p className="text-xl text-gray-600">
                                With gratitude for their dedication and leadership.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {teamData.previousBoard.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={itemVariants}
                                    className="group"
                                >
                                    <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg">
                                        {/* Profile Image */}
                                        <div className="relative mx-auto mb-6 w-32 h-32">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:opacity-75 transition-opacity blur-md"></div>
                                            <div className="relative w-full h-full rounded-full border-3 border-gray-300 group-hover:border-gray-400 overflow-hidden bg-gray-100 transition-colors">
                                                <Image
                                                    src={member.image || '/placeholder-user.jpg'}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Member Info */}
                                        <div className="text-center">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm font-medium group-hover:text-gray-700 transition-colors">
                                                {member.position}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* University Logos Section */}
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 relative border-2 border-gray-200 rounded-full bg-white shadow-md">
                                <Image
                                    src="/placeholder-logo.png"
                                    alt="University of Kelaniya"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">University of Kelaniya</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 relative border-2 border-gray-200 rounded-full bg-white shadow-md">
                                <Image
                                    src="/placeholder-logo.png"
                                    alt="Faculty of Science"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Faculty of Science</p>
                        </motion.div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-gray-700 mb-2">
                            <Mail className="inline-block w-4 h-4 mr-2" />
                            <a href="mailto:sesa@kln.ac.lk" className="hover:text-rose-600 transition-colors">
                                sesa@kln.ac.lk
                            </a>
                        </p>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Software Engineering Students&apos; Association - University of Kelaniya
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default TeamPageClient
