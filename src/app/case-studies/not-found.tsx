import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function CaseStudyNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">Case Study Not Found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        We couldn't find the case study you're looking for. It may have been moved or doesn't exist.
      </p>
      <Button asChild>
        <Link href="/work" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Our Work
        </Link>
      </Button>
    </div>
  )
} 