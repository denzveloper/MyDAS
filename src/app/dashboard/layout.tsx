"use client"

import { ReactNode, useEffect } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  useEffect(() => {
    // Hide footer for dashboard but keep navbar
    const footer = document.querySelector('footer')
    const main = document.querySelector('main')
    
    if (footer) footer.style.display = 'none'
    if (main) {
      main.style.padding = '0'
      main.style.margin = '0'
    }
    
    // Cleanup on unmount
    return () => {
      if (footer) footer.style.display = ''
      if (main) {
        main.style.padding = ''
        main.style.margin = ''
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 top-16 bg-background z-40">
      {/* Dashboard dengan space untuk navbar (top-16 = 64px) */}
      {children}
    </div>
  )
} 