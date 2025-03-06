import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="contact" className="py-20 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-sm font-medium px-3 py-1 rounded-full">
              Get Started
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Let's discuss how MIDAS can help you achieve your business goals.
            Schedule a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              className="text-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300 border-none"
            >
              Schedule a Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 