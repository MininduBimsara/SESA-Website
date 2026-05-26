'use client'

import React from 'react'

interface AuthorCardProps {
    name?: string
    authorName?: string
    bio?: string
    description?: string
    className?: string
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
    name,
    authorName,
    bio,
    description,
    className = ''
}) => {
    // Use name or authorName, whichever is provided
    const displayName = name || authorName || 'Anonymous'
    const displayBio = bio || description || 'SESA Executive Board Member and passionate software engineer dedicated to sharing knowledge with the community.'
    
    return (
        <div className={`bg-[#F8F9FA] border border-slate-200 rounded-xl p-6 mb-8 ${className}`}>
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#EC1640] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                        Written by {displayName}
                    </h4>
                    <p className="text-gray-600">
                        {displayBio}
                    </p>
                </div>
            </div>
        </div>
    )
}
