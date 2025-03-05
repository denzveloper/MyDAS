import React from "react"
import { cn } from "@/lib/utils"

interface CardDarkProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function CardDark({ children, className, hover = true }: CardDarkProps) {
  return (
    <div 
      className={cn(
        "bg-gray-800 border border-gray-700 rounded-xl p-6", 
        hover && "hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10",
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-row items-center justify-between pb-4", className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-white text-xl font-bold", className)}>
      {children}
    </h3>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("text-gray-300", className)}>
      {children}
    </div>
  )
} 