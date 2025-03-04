import { Layout } from "@/components/layout/Layout"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { Testimonials } from "@/components/sections/Testimonials"
import { CTA } from "@/components/sections/CTA"

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </Layout>
  )
}
