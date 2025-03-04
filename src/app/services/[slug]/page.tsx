import { notFound } from "next/navigation"
import { services } from "@/lib/data/services"
import { type ServicePageProps } from "@/lib/types/service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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

  const Icon = service.icon

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/#services"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Services
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <Icon className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>

      <p className="text-lg text-gray-700 mb-8">{service.longDescription}</p>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="process">Our Process</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-6">
          <div className="grid gap-4">
            {service.features?.map((feature) => (
              <div key={feature} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <div className="grid gap-4">
            {service.benefits?.map((benefit) => (
              <div key={benefit} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <div className="space-y-8">
            {service.process?.map((step, index) => (
              <div key={step.title}>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-700 ml-12">{step.description}</p>
                {index < (service.process?.length ?? 0) - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 