import { AppSidebar } from "@/components/app-sidebar"
import { ScrapingForm } from "@/components/orion/scraping-form"
import { InstagramTable } from "@/components/orion/instagram-table"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { createClient } from '@supabase/supabase-js'
import { cookies } from "next/headers"

// Interface untuk data Instagram scraping
interface DataScrapingInstagram {
  id: number
  inputUrl: string
  username: string | null
  followersCount: string | null
  followsCount: string | null
  biography: string | null
  postsCount: string | null
  highlightReelCount: string | null
  igtvVideoCount: string | null
  latestPostsTotal: string | null
  latestPostsLikes: string | null
  latestPostsComments: string | null
  Url: string | null
  User_Id: string | null
  gmail: string | null
}

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

// Mengambil data dari tabel data_scraping_instagram di Supabase
async function getInstagramData(): Promise<DataScrapingInstagram[]> {
  try {
    const cookieStore = cookies()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false
        },
        global: {
          headers: {
            'Cookie': cookieStore.getAll()
              .map(cookie => `${cookie.name}=${cookie.value}`)
              .join('; ')
          }
        }
      }
    )
    
    const { data, error } = await supabase
      .from('data_screping_instagram')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching data:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default async function Page() {
  const data = await getInstagramData()

  return (
    <ProtectedRoute>
      <div className="flex h-full w-full">
        <SidebarProvider>
          <AppSidebar variant="inset" className="pt-16" />
          <SidebarInset className="flex-1">
            <div className="flex flex-col min-h-0 h-full pt-16">
              {/* Header Orion */}
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
                      <BreadcrumbPage>Orion</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              
              {/* Content Area */}
              <main className="pt-16 h-[calc(100vh-8rem)] overflow-auto">
                <div className="@container/main h-full">
                  <div className="px-4 lg:px-6 py-6">
                    <div className="space-y-4">
                      <ScrapingForm />
                      <div className="rounded-lg border bg-card p-2 shadow-sm w-full">
                        <InstagramTable data={data} />
                      </div>
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
