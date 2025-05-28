import Link from "next/link"
import { Service } from "@/lib/types/service"

interface ServiceHeaderProps {
  service: Service
}

export function ServiceHeader({ service }: ServiceHeaderProps): JSX.Element {
  return (
    <>
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
    </>
  )
} 