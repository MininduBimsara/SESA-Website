import HomeHero from '@/components/HomeHero'
import AboutSection from './AboutSection'
import FeaturedEvents from './FeaturedEvents'
import StatsSection from './StatsSection'
import LatestUpdatesSection from './LatestUpdatesSection'
import TestimonialsSection from './TestimonialsSection'
import PartnersSection from './PartnersSection'
import CTASection from './CTASection'
import React from 'react'

const page = () => {
    return (
        <div>
            <HomeHero />
            <AboutSection />
            <StatsSection />
            <FeaturedEvents />
            <LatestUpdatesSection />
            <TestimonialsSection />
            <PartnersSection />
            <CTASection />
        </div>
    )
}

export default page