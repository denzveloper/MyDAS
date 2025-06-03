import { SupabaseProvider } from '@/lib/providers/SupabaseProvider'
import { SupabaseTest } from '@/components/SupabaseTest'
import { ContactForm } from '@/components/examples/ContactForm'
import { LoginModal } from '@/components/login-modal'
import { RegisterModal } from '@/components/register-modal'
import { UserStatus } from '@/components/user-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, UserPlus } from 'lucide-react'

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

export default function TestSupabasePage() {
  return (
    <SupabaseProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Koneksi Supabase
            </h1>
            <p className="text-gray-600">
              Halaman untuk menguji koneksi database Supabase MIDAS
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-8">
              <SupabaseTest />
              <UserStatus />
            </div>
            
            <div className="space-y-8">
              <ContactForm />
              
              {/* Auth Demo Card */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Demo Authentication
                  </CardTitle>
                  <CardDescription>
                    Test login dan register dengan Supabase Auth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LoginModal>
                    <Button className="w-full" variant="outline">
                      <LogIn className="mr-2 h-4 w-4" />
                      Test Login Modal
                    </Button>
                  </LoginModal>
                  
                  <RegisterModal>
                    <Button className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Test Register Modal
                    </Button>
                  </RegisterModal>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-2">
                      <strong>Login:</strong> Gunakan email dan password yang sudah terdaftar
                    </p>
                    <p>
                      <strong>Register:</strong> Buat akun baru dengan email valid
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Jika koneksi berhasil, Anda siap menggunakan Supabase di aplikasi MIDAS
            </p>
          </div>
        </div>
      </div>
    </SupabaseProvider>
  )
} 