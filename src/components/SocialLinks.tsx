import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react'
import { Button } from './ui/button'

interface SocialLinksProps {
    variant?: 'buttons' | 'icons'
    className?: string
}

export const socialMediaLinks = {
    facebook: 'https://facebook.com/sesa.uok',
    twitter: 'https://twitter.com/sesa_uok',
    instagram: 'https://instagram.com/sesa.uok',
    linkedin: 'https://linkedin.com/company/sesa-uok',
    youtube: 'https://youtube.com/@sesa-uok',
    email: 'mailto:sesa@kln.ac.lk'
}

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'icons', className = '' }) => {
    if (variant === 'buttons') {
        return (
            <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
                <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-rose-50 shadow-lg">
                        <Facebook className="w-5 h-5 mr-2" />
                        Follow on Facebook
                    </Button>
                </a>
                <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                        <Instagram className="w-5 h-5 mr-2" />
                        Follow on Instagram
                    </Button>
                </a>
            </div>
        )
    }

    return (
        <div className={`flex gap-4 ${className}`}>
            <a
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
            >
                <Facebook className="w-5 h-5" />
            </a>
            <a
                href={socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
            >
                <Twitter className="w-5 h-5" />
            </a>
            <a
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
            >
                <Instagram className="w-5 h-5" />
            </a>
            <a
                href={socialMediaLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
            >
                <Linkedin className="w-5 h-5" />
            </a>
            <a
                href={socialMediaLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
            >
                <Youtube className="w-5 h-5" />
            </a>
            <a
                href={socialMediaLinks.email}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Email"
            >
                <Mail className="w-5 h-5" />
            </a>
        </div>
    )
}

export default SocialLinks
