import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navbar />
            <main className="">{children}</main>
            <Footer />
        </div>
    )
}