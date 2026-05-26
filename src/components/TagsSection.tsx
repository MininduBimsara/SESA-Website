'use client'

import React from 'react'
import { Tag } from 'lucide-react'

interface TagsSectionProps {
    tags: string[]
    className?: string
}

export const TagsSection: React.FC<TagsSectionProps> = ({ tags, className = '' }) => {
    if (!tags || tags.length === 0) return null

    return (
        <div className={`mb-8 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-[#11112A]" />
                <h3 className="text-lg font-bold font-sans text-[#11112A]">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-[#FCFCFC] border border-[#D2D2D2] text-[#32324E] rounded-full text-sm font-medium hover:bg-[#D2D2D2]/25 transition-colors cursor-pointer"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
