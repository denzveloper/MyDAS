import dynamic from "next/dynamic"
import { ReactElement } from "react"

const LoadingFallback = (): ReactElement => (
  <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-screen w-full"></div>
)

const serviceClientMap: Record<string, React.ComponentType<any>> = {
  "digital-automation": dynamic(() => import("@/app/services/[slug]/digital-automation-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "it-systems": dynamic(() => import("@/app/services/[slug]/it-systems-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "marketing-strategy": dynamic(() => import("@/app/services/[slug]/marketing-strategy-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "performance-marketing": dynamic(() => import("@/app/services/[slug]/performance-marketing-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "branding": dynamic(() => import("@/app/services/[slug]/branding-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "video-production": dynamic(() => import("@/app/services/[slug]/video-production-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  }),
  "kol-endorsement": dynamic(() => import("@/app/services/[slug]/kol-endorsement-client"), {
    loading: () => <LoadingFallback />,
    ssr: false
  })
}

export function getServiceClientComponent(slug: string): React.ComponentType<any> | null {
  return serviceClientMap[slug] || null
} 