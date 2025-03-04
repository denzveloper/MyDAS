import { StaticImageData } from "next/image"

export interface Project {
  id: string
  title: string
  category: 'digital-automation' | 'it-systems' | 'video-production' | 'branding' | 'marketing-strategy' | 'kol-endorsement' | 'performance-marketing'
  description: string
  thumbnail: StaticImageData | string
  images: (StaticImageData | string)[]
  challenge: string
  approach: string
  deliverables: string[]
  results: {
    metric: string
    value: string
  }[]
  clientName: string
  clientLogo?: StaticImageData | string
  testimonial?: {
    quote: string
    author: string
    position: string
    avatar?: StaticImageData | string
    rating?: number
  }
}

export interface CaseStudy extends Project {
  background: string
  objectives: string[]
  process: {
    phase: string
    description: string
  }[]
}

export interface WorkPageProps {
  params: {
    category?: string
  }
} 