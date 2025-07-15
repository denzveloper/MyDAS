'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Shield } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = '/' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    // Skip authentication check in development mode
    if (isDevelopment) {
      console.log('🔓 Development mode: Bypassing authentication check')
      setIsChecking(false)
      return
    }

    if (!isLoading) {
      if (!isAuthenticated) {
        console.log('❌ User not authenticated, redirecting to:', redirectTo)
        router.push(redirectTo)
        return
      }
      console.log('✅ User authenticated, allowing access')
      setIsChecking(false)
    }
  }, [isAuthenticated, isLoading, router, redirectTo, isDevelopment])

  if (!isDevelopment && (isLoading || isChecking)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
            <Shield className="h-8 w-8 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-muted-foreground">Memeriksa autentikasi...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isDevelopment && !isAuthenticated) {
    return null // Will redirect
  }

  return <>{children}</>
} 