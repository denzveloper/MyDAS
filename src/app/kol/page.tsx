import { AppSidebar } from "@/components/app-sidebar"
import KolTable from "@/components/kol-table"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <ProtectedRoute>
      <div className="flex h-full w-full">
        <SidebarProvider>
          <AppSidebar variant="inset" className="pt-16" />
          <SidebarInset className="flex-1">
            <div className="flex flex-col min-h-0 h-full pt-16">
              {/* Header Kol */}
              <header className="fixed top-16 right-0 left-64 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/">
                        MIDAS
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Kol</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>

              {/* Content Area */}
              <main className="pt-16 h-[calc(100vh-8rem)] overflow-auto">
                <div className="@container/main h-full">
                  <div className="px-4 lg:px-6 py-6">
                    <div className="rounded-lg border bg-card p-2 shadow-sm w-full">
                      <KolTable />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  )
}
