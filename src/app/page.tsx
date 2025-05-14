// Removed import of Layout as Next.js app/layout.tsx handles layout
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { Testimonials } from "@/components/sections/Testimonials"
import { CTA } from "@/components/sections/CTA"
import { ParallaxSection } from "@/components/sections/ParallaxSection"
import { FeaturesTab } from "@/components/sections/FeaturesTab"
import { ClientShowcase } from "@/components/sections/ClientShowcase"

export default function Home() {
  return (
    <>
      <Hero />
      <ClientShowcase />
      <Services />
      <ParallaxSection />
      <FeaturesTab />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  )
}
