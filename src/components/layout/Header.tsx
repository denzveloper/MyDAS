'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/lib/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const navigation = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleDashboardClick = () => {
    router.push('/dashboard')
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Berhasil logout. Sampai jumpa!')
      router.push('/')
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Gagal logout, silakan coba lagi')
    }
  }

  const AuthButton = () => {
    if (user) {
      return (
        <div className="flex items-center gap-2">
          <Button onClick={handleDashboardClick}>Dashboard</Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      )
    }
    return (
      <LoginModal>
        <Button>Login</Button>
      </LoginModal>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold">
            MIDAS
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <AuthButton />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <ThemeToggle />
          <AuthButton />
        </div>
      </nav>
    </header>
  )
} 