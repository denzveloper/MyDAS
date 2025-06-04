'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { Database, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

interface TestResult {
  test: string
  status: 'success' | 'error' | 'warning'
  message: string
  details?: any
}

export function TestMidaLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  const runTests = async () => {
    setIsLoading(true)
    setResults([])
    const testResults: TestResult[] = []

    try {
      // Test 1: Cek koneksi Supabase
      try {
        const { data, error } = await supabase.from('Mida_Login').select('count').limit(1)
        if (error) {
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
            testResults.push({
              test: 'Koneksi Supabase',
              status: 'warning',
              message: 'Koneksi berhasil, tapi tabel Mida_Login belum dibuat',
              details: error.message
            })
          } else {
            testResults.push({
              test: 'Koneksi Supabase',
              status: 'error',
              message: 'Error koneksi ke Supabase',
              details: error.message
            })
          }
        } else {
          testResults.push({
            test: 'Koneksi Supabase',
            status: 'success',
            message: 'Koneksi ke Supabase berhasil'
          })
        }
      } catch (error: any) {
        testResults.push({
          test: 'Koneksi Supabase',
          status: 'error',
          message: 'Gagal terhubung ke Supabase',
          details: error.message
        })
      }

      // Test 2: Cek tabel Mida_Login exists
      try {
        const { data, error } = await supabase
          .from('Mida_Login')
          .select('id')
          .limit(1)

        if (error) {
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
            testResults.push({
              test: 'Tabel Mida_Login',
              status: 'error',
              message: 'Tabel Mida_Login belum dibuat di database',
              details: 'Jalankan SQL schema di Supabase SQL Editor'
            })
          } else {
            testResults.push({
              test: 'Tabel Mida_Login',
              status: 'error',
              message: 'Error mengakses tabel Mida_Login',
              details: error.message
            })
          }
        } else {
          testResults.push({
            test: 'Tabel Mida_Login',
            status: 'success',
            message: 'Tabel Mida_Login ditemukan dan dapat diakses'
          })
        }
      } catch (error: any) {
        testResults.push({
          test: 'Tabel Mida_Login',
          status: 'error',
          message: 'Error saat cek tabel',
          details: error.message
        })
      }

      // Test 3: Cek struktur tabel (jika tabel ada)
      const tableExists = testResults.find(r => r.test === 'Tabel Mida_Login')?.status === 'success'
      if (tableExists) {
        try {
          const { data, error } = await supabase
            .from('Mida_Login')
            .select('*')
            .limit(0)

          if (error) {
            testResults.push({
              test: 'Struktur Tabel',
              status: 'error',
              message: 'Error mengakses struktur tabel',
              details: error.message
            })
          } else {
            testResults.push({
              test: 'Struktur Tabel',
              status: 'success',
              message: 'Struktur tabel valid dan dapat diakses'
            })
          }
        } catch (error: any) {
          testResults.push({
            test: 'Struktur Tabel',
            status: 'error',
            message: 'Error saat cek struktur tabel',
            details: error.message
          })
        }

        // Test 4: Cek jumlah data
        try {
          const { count, error } = await supabase
            .from('Mida_Login')
            .select('*', { count: 'exact', head: true })

          if (error) {
            testResults.push({
              test: 'Data Count',
              status: 'warning',
              message: 'Tidak bisa menghitung data',
              details: error.message
            })
          } else {
            testResults.push({
              test: 'Data Count',
              status: 'success',
              message: `Tabel berisi ${count || 0} record`,
              details: `Total users: ${count || 0}`
            })
          }
        } catch (error: any) {
          testResults.push({
            test: 'Data Count',
            status: 'warning',
            message: 'Error menghitung data',
            details: error.message
          })
        }
      }

      // Test 5: Test environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseKey) {
        testResults.push({
          test: 'Environment Variables',
          status: 'success',
          message: 'Environment variables tersedia',
          details: `URL: ${supabaseUrl.substring(0, 30)}...`
        })
      } else {
        testResults.push({
          test: 'Environment Variables',
          status: 'error',
          message: 'Environment variables tidak lengkap',
          details: 'Cek file .env.local'
        })
      }

    } catch (error: any) {
      testResults.push({
        test: 'General Error',
        status: 'error',
        message: 'Terjadi kesalahan umum',
        details: error.message
      })
    }

    setResults(testResults)
    setIsLoading(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Success</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Warning</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Test Tabel Mida_Login
        </CardTitle>
        <CardDescription>
          Verifikasi koneksi dan struktur tabel Mida_Login di Supabase
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menjalankan Test...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Jalankan Test Database
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Hasil Test:</h4>
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.test}</span>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {result.message}
                </p>
                
                {result.details && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Detail
                    </summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                      {typeof result.details === 'string' ? result.details : JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h5 className="font-medium mb-2">📋 Langkah Selanjutnya:</h5>
            <div className="text-sm space-y-1">
              {results.some(r => r.test === 'Tabel Mida_Login' && r.status === 'error') && (
                <p>• <strong>Buat tabel:</strong> Jalankan SQL schema di Supabase SQL Editor</p>
              )}
              {results.some(r => r.test === 'Environment Variables' && r.status === 'error') && (
                <p>• <strong>Environment:</strong> Cek file .env.local</p>
              )}
              {results.every(r => r.status === 'success') && (
                <p className="text-green-600">✅ <strong>Semua test berhasil!</strong> Registrasi siap digunakan.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 