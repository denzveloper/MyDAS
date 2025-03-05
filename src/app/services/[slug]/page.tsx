import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { type ServicePageProps } from "@/lib/types/service"
import Link from "next/link"
import dynamic from "next/dynamic"

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

  // Dynamically load the client component based on the slug
  // This ensures the animations are properly handled by the client component
  const ClientComponent = (() => {
    switch (params.slug) {
      case "digital-automation":
        return dynamic(() => import("./digital-automation-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "it-systems":
        return dynamic(() => import("./it-systems-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "marketing-strategy":
        return dynamic(() => import("./marketing-strategy-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "performance-marketing":
        return dynamic(() => import("./performance-marketing-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "branding":
        return dynamic(() => import("./branding-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "video-production":
        return dynamic(() => import("./video-production-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      case "kol-endorsement":
        return dynamic(() => import("./kol-endorsement-client"), {
          loading: () => <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>,
        })
      default:
        return null
    }
  })()

  // If a specific client component exists for this slug, render it
  if (ClientComponent) {
    return <ClientComponent service={service} />
  }

  // Otherwise, fall back to the default static page
  return (
    <div className="container mx-auto py-20 px-4">
      <Link
        href="/#services"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
      >
        ← Back to Services
      </Link>
      
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
        {service.title}
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        {service.description}
      </p>
      
      {service.longDescription && (
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {service.longDescription}
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {service.features && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {service.benefits && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-6">Benefits</h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {service.process && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 