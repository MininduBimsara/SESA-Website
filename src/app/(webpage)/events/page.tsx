import React from 'react'
import EventsPageClient from './EventsPageClient'
import type { Event } from '@/types/event'

async function getEvents(): Promise<Event[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const res = await fetch(`${baseUrl}/api/events`, {
            cache: 'no-store',
        })
        
        if (!res.ok) {
            throw new Error('Failed to fetch events')
        }
        
        return res.json()
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

const EventsPage = async () => {
    const events = await getEvents()
    
    return (
        <EventsPageClient events={events} />
    )
}

export default EventsPage
