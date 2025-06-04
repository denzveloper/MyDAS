import "@/app/globals.css"
import { Inter as FontSans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/lib/providers/SupabaseProvider"
import { AuthProvider } from "@/lib/providers/AuthProvider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "MIDAS - Marketing & Digital Agency",
  description: "MIDAS is a full-service marketing and digital agency specializing in brand development, digital marketing, and technology solutions.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-gray-950 text-gray-200 font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <SupabaseProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster />
            </SupabaseProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
