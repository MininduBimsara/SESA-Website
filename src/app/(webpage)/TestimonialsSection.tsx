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
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Members Say
                    </h2>
                    <p className="text-xl text-gray-600">
                        Hear from students who are shaping the future of software engineering
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-rose-200">
                                        <Image
                                            src={testimonial.image || '/placeholder-user.jpg'}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                        <p className="text-sm text-rose-600">{testimonial.role}</p>
                                    </div>
                                </div>

                                <Quote className="w-8 h-8 text-rose-200 mb-4" />
                                
                                <p className="text-gray-700 leading-relaxed">
                                    {testimonial.quote}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500 py-12">
                            <p>No testimonials available yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
