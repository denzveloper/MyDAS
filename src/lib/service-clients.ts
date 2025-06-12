import { type Service } from './types/service'

interface ServiceClientProps {
  service: Service
}

// Ini adalah fungsi dummy untuk mengembalikan null
// Karena kita tidak memiliki client component khusus untuk setiap service
export function getServiceClientComponent(slug: string) {
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
