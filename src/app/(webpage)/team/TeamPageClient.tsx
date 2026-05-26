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

// Helper to generate initials for avatar fallback (filtering common titles)
const getMemberInitials = (name: string) => {
    if (!name) return 'S';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    
    const titles = ['dr.', 'ms.', 'mr.', 'prof.', 'dr', 'ms', 'mr', 'prof'];
    const filteredParts = parts.filter(p => !titles.includes(p.toLowerCase()));
    
    if (filteredParts.length === 0) return parts[0].substring(0, 2).toUpperCase();
    if (filteredParts.length === 1) return filteredParts[0].substring(0, 2).toUpperCase();
    
    return (filteredParts[0][0] + filteredParts[1][0]).toUpperCase();
};

// Categorize team members into tiers
const categorizeMembers = (members: TeamMember[]) => {
    const tier1: TeamMember[] = []; // Senior Treasurer, Senior Advisor, President
    const tier2: TeamMember[] = []; // Vice President, Secretary, Vice Secretary, Junior Treasurer
    const tier3: TeamMember[] = []; // Heads of Departments & Web Master
    const tier4: TeamMember[] = []; // Committee Members / Others

    members.forEach(member => {
        const pos = (member.position || '').toLowerCase().replace(/\s+/g, ' ').trim();
        
        if (pos === 'senior treasurer' || pos === 'senior advisor' || pos === 'president') {
            tier1.push(member);
        } else if (
            pos === 'vice president' || 
            pos === 'secretary' || 
            pos === 'vice secretary' || 
            pos === 'junior treasurer'
        ) {
            tier2.push(member);
        } else if (pos.startsWith('head of') || pos === 'web master' || pos === 'webmaster') {
            tier3.push(member);
        } else {
            tier4.push(member);
        }
    });

    return { tier1, tier2, tier3, tier4 };
};

// Elegant section divider with a red dot
const SectionDivider = () => (
    <div className="relative py-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100/60"></div>
        </div>
        <div className="relative bg-white px-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EC1640]/40"></div>
        </div>
    </div>
);

const MemberCard = ({ member, tier }: { member: TeamMember; tier: 'tier1' | 'tier2' | 'tier3' | 'tier4' }) => {
    // Unified card design for all tiers
    const cardClass = "relative bg-white rounded-[1.5rem] p-6 border border-slate-100 hover:border-[#EC1640]/30 shadow-sm hover:shadow-[0_20px_50px_rgba(236,22,64,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col items-center justify-between h-full min-h-[280px] border-t-[3px] border-t-[#EC1640]";
    const imgContainerClass = "relative mx-auto mb-5 w-28 h-28 p-1 rounded-full bg-slate-100 group-hover:bg-[#EC1640]/20 transition-all duration-500 shadow-sm";
    const nameClass = "text-lg font-bold font-serif text-slate-900 group-hover:text-[#EC1640] transition-colors duration-300 leading-snug text-center";
    const positionClass = "text-xs font-semibold text-slate-500 bg-slate-50 group-hover:bg-[#EC1640]/5 group-hover:text-[#EC1640] px-3 py-1.5 rounded-full inline-block mt-2.5 transition-all duration-300 uppercase tracking-wider text-center";
    
    let badgeText = "";
    if (tier === 'tier1') {
        badgeText = "Leadership";
    } else if (tier === 'tier2') {
        badgeText = "Executive";
    } else if (tier === 'tier3') {
        badgeText = "Dept Head";
    }

    const initials = getMemberInitials(member.name);

    return (
        <div className={`${cardClass} group`}>
            {/* Top Badge */}
            {badgeText && (
                <div 
                    className={
                        "absolute top-3.5 right-3.5 bg-slate-50 border border-slate-150 text-slate-400 group-hover:text-[#EC1640] group-hover:bg-[#EC1640]/5 group-hover:border-[#EC1640]/10 text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase transition-all duration-300 shadow-sm"
                    }
                >
                    {badgeText}
                </div>
            )}

            {/* Profile Image */}
            <div className={imgContainerClass}>
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                    {member.image ? (
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#EC1640]/10 text-[#EC1640] font-bold text-lg font-serif flex items-center justify-center">
                            {initials}
                        </div>
                    )}
                </div>
            </div>

            {/* Member Info */}
            <div className="text-center flex-grow flex flex-col justify-between w-full mt-2">
                <div className="flex flex-col items-center">
                    <h3 className={nameClass}>
                        {member.name}
                    </h3>
                    <p className={positionClass}>
                        {member.position}
                    </p>
                </div>

                {/* Social Links */}
                {(member.email || member.linkedin || member.github) ? (
                    <div className="flex justify-center gap-2 mt-5 pt-3 border-t border-slate-100/60 w-full">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="w-8 h-8 rounded-full bg-slate-50/50 hover:bg-[#EC1640] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-100 hover:border-[#EC1640] hover:shadow-md hover:-translate-y-0.5 hover:scale-110"
                                title="Email"
                            >
                                <Mail className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-slate-50/50 hover:bg-[#EC1640] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-100 hover:border-[#EC1640] hover:shadow-md hover:-translate-y-0.5 hover:scale-110"
                                title="LinkedIn"
                            >
                                <LinkedinIcon className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-slate-50/50 hover:bg-[#EC1640] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-100 hover:border-[#EC1640] hover:shadow-md hover:-translate-y-0.5 hover:scale-110"
                                title="GitHub"
                            >
                                <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="h-4" /> // placeholder spacer to keep height alignment
                )}
            </div>
        </div>
    );
};

// Component to render a complete grouped board section
const BoardSection = ({ 
    members, 
    mounted, 
    containerVariants, 
    itemVariants 
}: { 
    members: TeamMember[]; 
    mounted: boolean; 
    containerVariants: any; 
    itemVariants: any; 
}) => {
    const { tier1, tier2, tier3, tier4 } = categorizeMembers(members);
    
    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Tier 1: Advisory & Presidency */}
            {tier1.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center mb-8 mt-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EC1640]"></span>
                            Advisory & Presidency
                        </div>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto"
                    >
                        {tier1.map((member) => (
                            <motion.div key={member.id} variants={itemVariants}>
                                <MemberCard member={member} tier="tier1" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
            
            {tier1.length > 0 && (tier2.length > 0 || tier3.length > 0 || tier4.length > 0) && <SectionDivider />}
            
            {/* Tier 2: Executive Board */}
            {tier2.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EC1640]/70"></span>
                            Executive Committee
                        </div>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto"
                    >
                        {tier2.map((member) => (
                            <motion.div key={member.id} variants={itemVariants}>
                                <MemberCard member={member} tier="tier2" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
            
            {tier2.length > 0 && (tier3.length > 0 || tier4.length > 0) && <SectionDivider />}
            
            {/* Tier 3: Department Heads */}
            {tier3.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EC1640]/55"></span>
                            Heads of Departments & Web Master
                        </div>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
                    >
                        {tier3.map((member) => (
                            <motion.div 
                                key={member.id} 
                                variants={itemVariants}
                                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                            >
                                <MemberCard member={member} tier="tier3" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
            
            {tier3.length > 0 && tier4.length > 0 && <SectionDivider />}
            
            {/* Tier 4: Committee Members */}
            {tier4.length > 0 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Committee Members
                        </div>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
                    >
                        {tier4.map((member) => (
                            <motion.div 
                                key={member.id} 
                                variants={itemVariants}
                                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                            >
                                <MemberCard member={member} tier="tier4" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

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
                staggerChildren: 0.08
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#f4f2ec] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
                {/* Hero Section Card */}
                <section 
                    className="relative w-full rounded-[32px] overflow-hidden border border-[#e5e3dd] shadow-sm bg-cover bg-center py-20 px-6 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    style={{ backgroundImage: `url('/tech_watercolor_bg.png')` }}
                >
                    <div className="absolute inset-0 bg-white/30 pointer-events-none backdrop-blur-[1px]" />
                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C00F38]/20 bg-[#C00F38]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#C00F38]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C00F38] animate-pulse" />
                            EXECUTIVE COMMITTEE
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-sans text-slate-900 leading-[1.15] tracking-tight max-w-2xl mx-auto">
                            Meet Our Executive Board
                        </h1>
                        <p className="text-sm md:text-base text-slate-700 max-w-xl mx-auto font-medium mt-4">
                            The minds driving innovation, teamwork, and growth at SESA for {teamData.currentYear}/{(teamData.currentYear + 1).toString().slice(-2)}.
                        </p>
                    </div>
                </section>

            {/* Current Executive Board Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="text-center mb-12 space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        Leadership
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold font-serif text-slate-950">
                        Current Executive Board & Committee
                    </h2>
                </div>

                <BoardSection 
                    members={teamData.currentBoard} 
                    mounted={mounted} 
                    containerVariants={containerVariants} 
                    itemVariants={itemVariants} 
                />
            </section>

            {/* Previous Executive Board Card */}
            {teamData.previousBoard.length > 0 && (
                <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="text-center mb-12 space-y-3">
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

                    <BoardSection 
                        members={teamData.previousBoard} 
                        mounted={mounted} 
                        containerVariants={containerVariants} 
                        itemVariants={itemVariants} 
                    />
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
        </div>
    )
}

export default TeamPageClient
