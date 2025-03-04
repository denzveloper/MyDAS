import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const portfolioItems = [
  {
    id: "ecommerce-automation",
    title: "E-commerce Automation",
    client: "TechRetail Co.",
    description:
      "Implemented automated inventory and order management systems, resulting in 40% operational cost reduction.",
    image: "/portfolio/ecommerce.jpg",
    results: ["40% cost reduction", "60% faster order processing", "99.9% accuracy"],
  },
  {
    id: "brand-transformation",
    title: "Brand Transformation",
    client: "FreshStart Foods",
    description:
      "Complete brand overhaul including visual identity, packaging, and digital presence.",
    image: "/portfolio/branding.jpg",
    results: ["150% social media growth", "85% brand recognition", "3x sales increase"],
  },
  {
    id: "video-marketing-campaign",
    title: "Video Marketing Campaign",
    client: "SportsFit",
    description:
      "Created viral video content series that showcased product benefits and user success stories.",
    image: "/portfolio/video.jpg",
    results: ["1M+ views", "200% engagement rate", "45% conversion rate"],
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-gray-600">
            Discover how we've helped businesses achieve their digital goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Card key={item.title} className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                {/* Replace with actual image */}
                <div className="w-full h-full bg-gray-200" />
              </div>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="font-medium text-primary">
                  {item.client}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{item.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Results:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {item.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
                <Button variant="ghost" className="group" asChild>
                  <Link href={`/case-studies/${item.id}`}>
                    View Case Study{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/work">
              View All Case Studies <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 