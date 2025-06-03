"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Loader2, 
  Shield,
  Building,
  Phone,
  Clock
} from "lucide-react"
import { useSupabaseContext } from "@/lib/providers/SupabaseProvider"
import { toast } from "sonner"

export function UserStatus() {
  const { user, userProfile, loading, signOut } = useSupabaseContext()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsSigningOut(true)
      try {
        const { error } = await signOut()
        if (error) {
          toast.error(`Gagal keluar: ${error.message}`)
        } else {
          toast.success("Berhasil keluar")
        }
      } catch (error: any) {
        toast.error(`Gagal keluar: ${error.message}`)
      } finally {
        setIsSigningOut(false)
      }
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Memuat status user...</span>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Status Authentication
          </CardTitle>
          <CardDescription>
            Anda belum login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="w-full justify-center">
            Tidak Login
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profil User
        </CardTitle>
        <CardDescription>
          Informasi akun MIDAS Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Avatar dan Nama */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={userProfile?.avatar_url || undefined} 
              alt={userProfile?.name || user.email || "User"} 
            />
            <AvatarFallback>
              {userProfile?.name ? getInitials(userProfile.name) : user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">
              {userProfile?.name || "User"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {userProfile?.role || "Member"}
            </p>
          </div>
          <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
            {user.email_confirmed_at ? "Verified" : "Unverified"}
          </Badge>
        </div>

        {/* Informasi Detail */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>

          {userProfile?.company && (
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{userProfile.company}</span>
            </div>
          )}

          {userProfile?.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{userProfile.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Bergabung: {formatDate(userProfile?.created_at || user.created_at)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span>ID: {user.id.slice(0, 8)}...</span>
          </div>

          {user.last_sign_in_at && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Login terakhir: {formatDate(user.last_sign_in_at)}</span>
            </div>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {user.email_confirmed_at ? "Email Verified" : "Email Unverified"}
          </Badge>
          {userProfile && (
            <Badge variant="outline">
              Profile Complete
            </Badge>
          )}
        </div>

        {/* Logout Button */}
        <Button 
          onClick={handleSignOut} 
          variant="outline" 
          className="w-full"
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Keluar...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
} 