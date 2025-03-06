import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "MIDAS transformed our digital presence completely. Their automation solutions saved us countless hours and significantly improved our efficiency.",
    author: "Sarah Chen",
    position: "CEO",
    company: "TechRetail Co.",
  },
  {
    quote:
      "The branding and video production team at MIDAS are exceptional. They captured our vision perfectly and delivered beyond our expectations.",
    author: "Michael Rodriguez",
    position: "Marketing Director",
    company: "FreshStart Foods",
  },
  {
    quote:
      "Working with MIDAS on our performance marketing campaigns has been a game-changer. The results speak for themselves.",
    author: "David Kim",
    position: "Founder",
    company: "SportsFit",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-sm font-medium px-3 py-1 rounded-full">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400">
            Don't just take our word for it - hear from some of our satisfied
            clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="relative border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300"
            >
              <CardContent className="pt-12">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-yellow-400/30" />
                <blockquote className="text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.position} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 