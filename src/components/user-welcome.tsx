'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, LogOut, Calendar, Building2, Phone, Mail } from 'lucide-react'
import { useAuth } from '@/lib/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function UserWelcome() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.success('Berhasil logout. Sampai jumpa!')
    router.push('/')
  }

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading user information...</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Selamat Datang Kembali!
          </div>
          <Badge variant="default" className="bg-green-500">
            {user.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.nama_lengkap}</p>
              <p className="text-sm text-muted-foreground">Nama Lengkap</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">Email</p>
            </div>
          </div>
          
          {user.perusahaan && (
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.perusahaan}</p>
                <p className="text-sm text-muted-foreground">Perusahaan</p>
              </div>
            </div>
          )}
          
          {user.no_telepon && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.no_telepon}</p>
                <p className="text-sm text-muted-foreground">No. Telepon</p>
              </div>
            </div>
          )}
          
          {user.created_at && (
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{formatDate(user.created_at)}</p>
                <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          <p>🎉 <strong>Selamat!</strong> Anda berhasil login ke dashboard MIDAS</p>
          <p>Sistem authentication custom dengan tabel Mida_Login</p>
        </div>
      </CardContent>
    </Card>
  )
} 