import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Members',
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
