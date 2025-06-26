import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { type ServicePageProps } from "@/lib/types/service"
import { getServiceClientComponent } from "@/lib/service-clients"
import { serializeServiceForClient } from "@/lib/utils/service-utils"
import { ServiceHeader } from "@/components/services/ServiceHeader"
import { ServiceFeatures } from "@/components/services/ServiceFeatures"
import { ServiceBenefits } from "@/components/services/ServiceBenefits"
import { ServiceProcess } from "@/components/services/ServiceProcess"

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }))
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.slug]

  if (!service) {
    notFound()
  }

  // Get client component for this service
  const ClientComponent = getServiceClientComponent(params.slug)

  // If a specific client component exists for this slug, render it
  if (ClientComponent) {
    // Ensure we're only passing serializable data to client component
    const serializedService = serializeServiceForClient(service)
    
    return <ClientComponent service={serializedService} />
  }

  // Otherwise, fall back to the default static page
  return (
    <div className="container mx-auto py-20 px-4">
      <ServiceHeader service={service} />
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {service.features && <ServiceFeatures features={service.features} />}
        {service.benefits && <ServiceBenefits benefits={service.benefits} />}
      </div>
      
      {service.process && <ServiceProcess process={service.process} />}
    </div>
  )
} 