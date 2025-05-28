import { Service } from "@/lib/types/service"

/**
 * Prepares a service object for client-side rendering by removing non-serializable properties
 */
export function serializeServiceForClient(service: Service): Omit<Service, 'icon'> {
  // Create a shallow copy without the icon property
  const { icon, ...serializedService } = service as Service & { icon?: unknown }
  return serializedService
} 