import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'PIL',
}

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
