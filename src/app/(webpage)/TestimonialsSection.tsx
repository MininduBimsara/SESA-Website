import React from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import prisma from '@/lib/prisma'

async function getTestimonials() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { featured: true },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
            take: 3,
        })
        return testimonials
    } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        return []
    }
}

const TestimonialsSection = async () => {
    const testimonials = await getTestimonials()

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            {/* White Rounded Frame Card */}
            <section className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                        Member Voices
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#11112A] tracking-tight leading-none">
                        What Our Members Say
                    </h2>
                    <p className="text-base md:text-lg text-[#32324E] max-w-xl mx-auto font-normal">
                        Hear from students who are shaping the future of software engineering.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-[#FCFCFC] hover:bg-[#FCFCFC] border border-[#D2D2D2] hover:border-[#32324E] rounded-[1.75rem] p-6 md:p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6 group"
                            >
                                <div className="space-y-4">
                                    <Quote className="w-8 h-8 text-[#11112A] opacity-35" />
                                    <p className="text-[0.95rem] text-[#32324E] leading-relaxed font-normal italic">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 border-t border-[#D2D2D2]/40 pt-5 mt-2">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D2D2D2] group-hover:border-[#32324E] transition-colors flex-shrink-0">
                                        <Image
                                            src={testimonial.image || '/placeholder-user.jpg'}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#11112A] text-sm md:text-base leading-snug">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-xs text-[#32324E] font-semibold tracking-wide uppercase mt-0.5">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-[#32324E] py-12">
                            <p>No testimonials available yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default TestimonialsSection
