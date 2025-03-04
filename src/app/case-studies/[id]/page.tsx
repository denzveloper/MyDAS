import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/work/CaseStudy'
import { getCaseStudyById } from '@/lib/data/caseStudies'

interface CaseStudyPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = getCaseStudyById(params.id)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | MIDAS',
    }
  }
  
  return {
    title: `${caseStudy.title} | MIDAS Case Study`,
    description: caseStudy.description,
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyById(params.id)
  
  if (!caseStudy) {
    notFound()
  }
  
  return (
    <main className="pt-16 pb-20">
      <CaseStudy caseStudy={caseStudy} />
    </main>
  )
} 