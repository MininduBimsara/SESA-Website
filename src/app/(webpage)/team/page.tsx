import React from 'react'
import { prisma } from '@/lib/prisma'
import TeamPageClient from './TeamPageClient'

interface TeamMember {
    id: string
    name: string
    position: string
    image?: string | null
    linkedin?: string | null
    github?: string | null
    email?: string | null
}

async function getTeamData() {
    try {
        // Fetch all teams with their members, ordered by year (newest first)
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            orderBy: {
                year: 'desc'
            }
        })

        if (teams.length === 0) {
            return {
                currentYear: new Date().getFullYear(),
                currentBoard: [],
                previousBoard: [],
            }
        }

        // The first team is the current (most recent year)
        const currentTeam = teams[0]
        const currentBoard: TeamMember[] = currentTeam.members.map(member => ({
            id: member.id,
            name: member.name,
            position: member.position,
            image: member.image,
            linkedin: member.linkedin,
            github: member.github,
            email: member.email
        }))

        // The second team (if exists) is the previous year
        const previousTeam = teams[1]
        let previousBoard: TeamMember[] = []
        let previousYear: number | undefined

        if (previousTeam) {
            previousYear = previousTeam.year
            previousBoard = previousTeam.members.map(member => ({
                id: member.id,
                name: member.name,
                position: member.position,
                image: member.image,
                linkedin: member.linkedin,
                github: member.github,
                email: member.email
            }))
        }

        return {
            currentYear: currentTeam.year,
            currentBoard,
            previousBoard,
            previousYear
        }
    } catch (error) {
        console.error('Error fetching team data:', error)
        // Return fallback data
        return {
            currentYear: new Date().getFullYear(),
            currentBoard: [],
            previousBoard: [],
        }
    }
}

export default async function TeamPage() {
    const teamData = await getTeamData()

    return <TeamPageClient teamData={teamData} />
}