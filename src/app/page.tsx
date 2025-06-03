import { Layout } from "@/components/layout/Layout"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { Testimonials } from "@/components/sections/Testimonials"
import { CTA } from "@/components/sections/CTA"
import { ParallaxSection } from "@/components/sections/ParallaxSection"
import { FeaturesTab } from "@/components/sections/FeaturesTab"
import { ClientShowcase } from "@/components/sections/ClientShowcase"

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ClientShowcase />
      <Services />
      <ParallaxSection />
      <FeaturesTab />
      <Portfolio />
      <Testimonials />
      <CTA />
    </Layout>
  )
}
