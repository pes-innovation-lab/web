import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Summer Internship Recruitment',
}

export default function RecruitmentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
