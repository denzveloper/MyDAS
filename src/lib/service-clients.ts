import { type Service } from './types/service'

import { ComponentType } from 'react'

interface ServiceClientProps {
  service: Service
}

type ServiceClientComponent = ComponentType<ServiceClientProps>

// Ini adalah fungsi dummy untuk mengembalikan null
// Karena kita tidak memiliki client component khusus untuk setiap service
export function getServiceClientComponent(slug: string): ServiceClientComponent | null {
  return null
}

export function serializeServiceForClient(service: Service): Service {
  return {
    ...service,
    // Pastikan semua properti bisa di-serialize
    iconName: service.iconName || 'Box',
    features: service.features || [],
    benefits: service.benefits || [],
    process: service.process || []
  }
}
