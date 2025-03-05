import React from "react"
import { cn } from "@/lib/utils"

interface ButtonAccentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
}

export function ButtonAccent({
  variant = "solid",
  size = "md",
  children,
  className,
  ...props
}: ButtonAccentProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  
  const variantStyles = {
    solid: "bg-yellow-400 text-gray-900 hover:bg-yellow-300",
    outline: "border border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-400/10",
    ghost: "text-yellow-400 hover:bg-yellow-400/10 border-0"
  }
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 