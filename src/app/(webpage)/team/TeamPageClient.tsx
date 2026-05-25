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
        <div className="w-full max-w-[1600px] mx-auto px-3 pt-24 pb-8 md:px-5 md:pt-28 bg-white flex flex-col gap-6 md:gap-8">
            {/* Hero Section Card */}
            <section className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-neutral-900 to-slate-950 text-white border border-white/5 shadow-2xl py-20 px-6 md:px-10 lg:px-12 text-center overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" 
                    style={{ backgroundImage: 'url(/modern-tech-workspace-with-coding-screens-and-coll.jpg)' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="relative z-10 space-y-4">
                    <span className="text-[#EC1640] text-xs font-semibold uppercase tracking-[0.2em]">EXECUTIVE COMMITTEE</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-white tracking-normal leading-tight">
                        Meet Our Executive Board
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
                        The minds driving innovation, teamwork, and growth at SESA for {teamData.currentYear}/{(teamData.currentYear + 1).toString().slice(-2)}.
                    </p>
                </div>
            </section>

            {/* Current Executive Board Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="text-center mb-10 space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        Leadership
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                        Current Executive Board
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                    >
                        {teamData.currentBoard.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={itemVariants}
                                className="group"
                            >
                                <div className="relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#EC1640] transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full min-h-[260px]">
                                    {/* Profile Image */}
                                    <div className="relative mx-auto mb-5 w-28 h-28">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EC1640]/40 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                                        <div className="relative w-full h-full rounded-full border-4 border-slate-100 group-hover:border-[#EC1640] overflow-hidden bg-slate-50 transition-colors">
                                            <Image
                                                src={member.image || '/placeholder-user.jpg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Member Info */}
                                    <div className="text-center flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base font-semibold font-serif text-slate-900 group-hover:text-[#EC1640] transition-colors leading-snug">
                                                {member.name}
                                            </h3>
                                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">
                                                {member.position}
                                            </p>
                                        </div>

                                        {/* Social Links */}
                                        {(member.email || member.linkedin || member.github) && (
                                            <div className="flex justify-center gap-2 mt-4 pt-3 border-t border-slate-100">
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="w-7 h-7 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center transition-colors group/item border border-slate-100"
                                                    >
                                                        <Mail className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-[#EC1640]" />
                                                    </a>
                                                )}
                                                {member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-7 h-7 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center transition-colors group/item border border-slate-100"
                                                    >
                                                        <LinkedinIcon className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-[#EC1640]" />
                                                    </a>
                                                )}
                                                {member.github && (
                                                    <a
                                                        href={member.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-7 h-7 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center transition-colors group/item border border-slate-100"
                                                    >
                                                        <GithubIcon className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-[#EC1640]" />
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

            {/* Previous Executive Board Card */}
            {teamData.previousBoard.length > 0 && (
                <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="text-center mb-10 space-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Alumni
                        </span>
                        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                            Honoring Our Previous Executive Board
                            {teamData.previousYear && ` (${teamData.previousYear}/${(teamData.previousYear + 1).toString().slice(-2)})`}
                        </h2>
                        <p className="text-sm text-slate-500 max-w-xl mx-auto font-normal">
                            With gratitude for their dedication, hard work, and leadership in laying SESA&apos;s foundation.
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                        >
                            {teamData.previousBoard.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={itemVariants}
                                    className="group"
                                >
                                    <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg flex flex-col justify-between h-full min-h-[220px]">
                                        {/* Profile Image */}
                                        <div className="relative mx-auto mb-4 w-24 h-24">
                                            <div className="relative w-full h-full rounded-full border-3 border-slate-100 group-hover:border-slate-300 overflow-hidden bg-slate-50">
                                                <Image
                                                    src={member.image || '/placeholder-user.jpg'}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Member Info */}
                                        <div className="text-center flex-grow flex flex-col justify-center">
                                            <h3 className="text-sm font-semibold font-serif text-slate-800 leading-snug">
                                                {member.name}
                                            </h3>
                                            <p className="text-slate-500 text-[0.7rem] uppercase tracking-wider mt-1">
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

            {/* University Affiliation Logos Section Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-8 lg:p-10 relative overflow-hidden flex flex-col items-center justify-center gap-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                    Institutional Support
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 relative border border-slate-200 rounded-full bg-white shadow-sm flex items-center justify-center p-2">
                            <Image
                                src="/placeholder-logo.png"
                                alt="University of Kelaniya"
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        <p className="text-slate-800 text-xs font-semibold">University of Kelaniya</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 relative border border-slate-200 rounded-full bg-white shadow-sm flex items-center justify-center p-2">
                            <Image
                                src="/placeholder-logo.png"
                                alt="Faculty of Science"
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        <p className="text-slate-800 text-xs font-semibold">Faculty of Science</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TeamPageClient
