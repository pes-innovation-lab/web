import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Summer Internship Program',
}

export default function InternshipLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
