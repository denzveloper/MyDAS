import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Your Digital Presence with{" "}
            <span className="text-primary">MIDAS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your partner in digital automation, branding, and performance marketing.
            We turn your vision into measurable success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 