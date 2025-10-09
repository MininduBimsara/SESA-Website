import React from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav>Nav</nav>
            {children}
            <footer>Footer</footer>
        </div>
    );
}