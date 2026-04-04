import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Athlete ID - Brand Portal',
  description: 'Manage your sports products and reach athletes worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
