import { Metadata } from "next"
import { CaseStudy as CaseStudyType } from "@/lib/types/work"
import { CaseStudy } from "@/components/work/CaseStudy"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react"
import { CASE_STUDIES, getFeaturedCaseStudies } from "@/lib/data/caseStudies"

export const metadata: Metadata = {
  title: "Our Work | MIDAS",
  description: "Explore our portfolio of successful digital automation, IT systems, video production, branding, marketing strategy, KOL endorsement, and performance marketing projects.",
}

const CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "digital-automation", label: "Digital Automation" },
  { value: "it-systems", label: "IT Systems" },
  { value: "video-production", label: "Video Production" },
  { value: "branding", label: "Branding" },
  { value: "marketing-strategy", label: "Marketing Strategy" },
  { value: "kol-endorsement", label: "KOL Endorsement" },
  { value: "performance-marketing", label: "Performance Marketing" },
] as const

interface Testimonial {
  quote: string
  author: string
  position: string
}

// Using our data
const FEATURED_CASE_STUDIES = getFeaturedCaseStudies();
const PROJECTS = CASE_STUDIES;

// Sample testimonials
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "MIDAS transformed our digital operations completely. Their automation solutions saved us thousands in operational costs while improving accuracy.",
    author: "Sarah Johnson",
    position: "COO at TechRetail Co."
  },
  {
    quote: "The brand transformation MIDAS delivered exceeded our expectations. Our sales have tripled since the rebrand.",
    author: "Michael Chen",
    position: "Marketing Director at FreshStart Foods"
  },
  {
    quote: "Working with MIDAS on our video campaign was seamless. Their creativity and technical execution were outstanding.",
    author: "Alex Rodriguez",
    position: "Product Manager at SportsFit"
  }
];

export default function WorkPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="animate-fade-up text-4xl font-bold md:text-5xl">Our Work</h1>
        <p className="animate-fade-up animation-delay-100 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover how we've helped businesses transform their digital presence through innovative solutions
          and strategic marketing approaches.
        </p>
      </section>

      {/* Project Filter & Grid */}
      <section className="mb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="animate-fade-up animation-delay-200"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="animate-fade-up animation-delay-300">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <CaseStudy key={project.id} caseStudy={project} isPreview={true} />
              ))}
            </div>
          </TabsContent>
          {CATEGORIES.slice(1).map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.filter((p) => p.category === category.value).map((project) => (
                  <CaseStudy key={project.id} caseStudy={project} isPreview={true} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Featured Case Studies */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Case Studies</h2>
        <div className="space-y-12">
          {FEATURED_CASE_STUDIES.map((caseStudy) => (
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} isPreview={true} />
          ))}
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-3xl font-bold">What Our Clients Say</h2>
        <Carousel className="mx-auto max-w-4xl">
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="text-center">
                  <blockquote className="mx-auto max-w-2xl text-xl italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to Transform Your Business?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Let's discuss how we can help you achieve your business goals through our comprehensive digital solutions.
        </p>
        <Button size="lg" className="mt-6 gap-2">
          Schedule a Consultation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </main>
  )
} 