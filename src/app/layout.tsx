import "./globals.css"
import type { Metadata } from "next"
import ChakraProviders from "./components/ChakraProviders"

export const metadata: Metadata = {
  title: "Forker",
  description: "Recent Pitchfork Reviews",
  appleWebApp: {
    capable: true,
    title: "Forker",
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  )
}
