import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/prisma'

async function getPartners() {
    try {
        const partners = await prisma.partner.findMany({
            where: { active: true },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        })
        return partners
    } catch (error) {
        console.error('Failed to fetch partners:', error)
        return []
    }
}

const PartnersSection = async () => {
    const partners = await getPartners()

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            {/* White Rounded Container Card */}
            <section className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                        Our Network
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#11112A] tracking-tight leading-none">
                        Our Partners & Collaborators
                    </h2>
                    <p className="text-base md:text-lg text-[#32324E] max-w-xl mx-auto font-normal">
                        Working together with leading institutions and industry partners.
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6 relative z-10">
                    {partners.length > 0 ? (
                        partners.map((partner) => (
                            <div
                                key={partner.id}
                                className="group flex items-center justify-center p-5 bg-[#FCFCFC] border border-[#D2D2D2] hover:border-[#32324E] hover:shadow-md rounded-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {partner.website ? (
                                    <a
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative w-20 h-20 block"
                                    >
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </a>
                                ) : (
                                    <div className="relative w-20 h-20">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-slate-500 py-12">
                            <p>No partners available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default PartnersSection
