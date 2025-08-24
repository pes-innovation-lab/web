import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'History',
}

export default function HistoryLayout({
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
