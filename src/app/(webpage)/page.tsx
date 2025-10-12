import HeroSlider from '@/components/HeroSlider'
import AboutSection from './AboutSection'
import KeyActivities from './KeyActivities'
import FeaturedEvents from './FeaturedEvents'
import React from 'react'

const page = () => {
    return (
        <div>
            <HeroSlider />
            <AboutSection />
            <KeyActivities />
            <FeaturedEvents />
        </div>
    )
}

export default page