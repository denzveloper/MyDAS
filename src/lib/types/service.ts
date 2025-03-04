import { LucideIcon } from "lucide-react"

export interface Service {
  title: string
  description: string
  icon: LucideIcon
  longDescription?: string
  features?: string[]
  benefits?: string[]
  process?: {
    title: string
    description: string
  }[]
}

export interface ServicePageProps {
  params: {
    slug: string
  }
} 