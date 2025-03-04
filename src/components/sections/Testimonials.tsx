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
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from some of our satisfied
            clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="relative bg-white"
            >
              <CardContent className="pt-12">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                <blockquote className="text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">
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