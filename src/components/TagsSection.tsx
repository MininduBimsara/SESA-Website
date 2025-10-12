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
                <Tag className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-200 transition-colors cursor-pointer"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
