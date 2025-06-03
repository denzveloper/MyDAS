'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useSupabaseContext } from '@/lib/providers/SupabaseProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { user, session, loading } = useSupabaseContext()

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('loading')
      
      // Test basic connection
      const { data, error } = await supabase
        .from('_supabase_migrations')
        .select('*')
        .limit(1)

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "table not found" which is expected if no migrations table exists
        throw error
      }

      setConnectionStatus('connected')
      setErrorMessage('')
    } catch (error: any) {
      setConnectionStatus('error')
      setErrorMessage(error.message || 'Unknown error occurred')
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'loading':
        return 'Menguji koneksi...'
      case 'connected':
        return 'Terhubung ke Supabase'
      case 'error':
        return 'Gagal terhubung'
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'loading':
        return 'bg-blue-100 text-blue-800'
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'error':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Status Koneksi Supabase
        </CardTitle>
        <CardDescription>
          Test koneksi ke database Supabase MIDAS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status Koneksi:</span>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>URL:</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30)}...
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Auth Status:</span>
            <Badge variant={user ? 'default' : 'secondary'}>
              {loading ? 'Loading...' : user ? 'Authenticated' : 'Not Authenticated'}
            </Badge>
          </div>

          {user && (
            <div className="flex items-center justify-between text-sm">
              <span>User ID:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {user.id.slice(0, 8)}...
              </span>
            </div>
          )}
        </div>

        <Button 
          onClick={testConnection} 
          disabled={connectionStatus === 'loading'}
          className="w-full"
        >
          {connectionStatus === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Ulang Koneksi'
          )}
        </Button>
      </CardContent>
    </Card>
  )
} 