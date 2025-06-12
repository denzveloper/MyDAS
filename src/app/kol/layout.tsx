"use client"

import { ReactNode, useEffect } from "react"

interface KolLayoutProps {
  children: ReactNode
}

export default function KolLayout({ children }: KolLayoutProps) {
  useEffect(() => {
    // Sembunyikan footer pada halaman Kol namun tetap pertahankan navbar
    const footer = document.querySelector('footer')
    const main = document.querySelector('main')

    if (footer) footer.style.display = 'none'
    if (main) {
      main.style.padding = '0'
      main.style.margin = '0'
    }

    return () => {
      if (footer) footer.style.display = ''
      if (main) {
        main.style.padding = ''
        main.style.margin = ''
      }
    }
  }, [])

  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Kol dengan space untuk navbar (top-16 = 64px) */}
      {children}
    </div>
  )
}
