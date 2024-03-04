import NavBar from '@/components/Navbar/Navbar'
import './globals.css'
import WalletProvider from '@/context/providers/WalletProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <WalletProvider>
        <NavBar />
        {children}
        </WalletProvider>
      </body>
    </html>
  )
}
