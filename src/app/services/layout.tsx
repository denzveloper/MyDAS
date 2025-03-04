import { type ReactNode } from "react"

interface ServicesLayoutProps {
  children: ReactNode
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  )
} 