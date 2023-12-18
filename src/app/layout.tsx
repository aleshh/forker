import { ReactNode } from "react"
import { CssVarsProvider } from "@mui/joy/styles"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Forker",
  description: "Recent Pitchfork Reviews",
  appleWebApp: {
    capable: true,
    title: "Forker",
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <CssVarsProvider defaultMode="system">
        <body className={inter.className}>{children}</body>
      </CssVarsProvider>
    </html>
  )
}
