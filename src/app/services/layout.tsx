import { type ReactNode } from "react"

interface ServicesLayoutProps {
  children: ReactNode
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
} 