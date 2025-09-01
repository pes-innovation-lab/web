import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import '../../css/global.css'
import '../../css/new_projects.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: 'PIL | %s',
        default: 'PIL',
    },
    icons: {
        icon: '/images/icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="font-martian-mono h-screen flex flex-col overflow-hidden">
                <NavBar />
                <main className="flex-grow overflow-y-scroll snap-mandatory snap-y scroll-smooth">
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}
