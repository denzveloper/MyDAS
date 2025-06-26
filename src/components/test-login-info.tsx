'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Info, Key, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function TestLoginInfo() {
  const testCredentials = {
    email: 'test@midas.com',
    password: 'TestPassword123'
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${type} copied to clipboard`)
    }).catch(() => {
      toast.error('Failed to copy to clipboard')
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Test Login Credentials
          <Badge variant="secondary">Demo</Badge>
        </CardTitle>
        <CardDescription>
          Gunakan kredensial ini untuk test login setelah database setup selesai
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{testCredentials.email}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(testCredentials.email, 'Email')}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Password</p>
                <p className="text-sm text-muted-foreground font-mono">{testCredentials.password}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(testCredentials.password, 'Password')}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>📝 Note:</strong> User test ini dibuat otomatis saat menjalankan SQL schema</p>
          <p><strong>🔐 Security:</strong> Password di-hash dengan bcrypt rounds 12</p>
          <p><strong>✅ Status:</strong> Active user, siap untuk login</p>
        </div>
        
        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Jika login gagal, pastikan database test berhasil dan user test sudah terbuat
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 