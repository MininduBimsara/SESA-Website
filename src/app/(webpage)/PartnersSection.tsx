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
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Partners & Collaborators
                    </h2>
                    <p className="text-xl text-gray-600">
                        Working together with leading institutions and industry partners
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {partners.length > 0 ? (
                        partners.map((partner) => (
                            <div
                                key={partner.id}
                                className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
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
                                            className="object-contain grayscale hover:grayscale-0 transition-all"
                                        />
                                    </a>
                                ) : (
                                    <div className="relative w-20 h-20">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain grayscale hover:grayscale-0 transition-all"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-12">
                            <p>No partners available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
