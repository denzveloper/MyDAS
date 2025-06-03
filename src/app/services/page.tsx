import Link from "next/link"
import { services } from "@/lib/data/services"
import { LucideIcon } from "lucide-react"
import { getIconComponent } from "@/lib/utils/icons"

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore our comprehensive range of digital marketing and technology services
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(services).map(([slug, service]) => {
          const Icon = getIconComponent(service.iconName);
          return (
            <Link href={`/services/${slug}`} key={slug} className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                {Icon && (
                  <div className="mb-4 text-primary">
                    <Icon size={24} />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <span className="text-primary">Learn more →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 