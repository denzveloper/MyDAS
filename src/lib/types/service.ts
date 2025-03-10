import { LucideIcon } from "lucide-react"

export interface Service {
  title: string
  description: string
  iconName: string
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