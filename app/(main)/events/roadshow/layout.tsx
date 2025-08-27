import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Roadshow',
}

export default function RoadshowLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
