import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications',
}

export default function PublicationsLayout({
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
