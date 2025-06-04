'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react'
import { authHelpers, RegisterData } from '@/lib/auth-helpers'

interface RegisterFormData extends RegisterData {
  confirmPassword: string
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nama_lengkap: '',
    email: '',
    password: '',
    confirmPassword: '',
    perusahaan: '',
    no_telepon: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): string | null => {
    if (!formData.nama_lengkap.trim()) {
      return 'Nama lengkap harus diisi'
    }
    
    if (!formData.email.trim()) {
      return 'Email harus diisi'
    }
    
    if (!authHelpers.validateEmail(formData.email)) {
      return 'Format email tidak valid'
    }
    
    if (!formData.password) {
      return 'Password harus diisi'
    }
    
    const passwordValidation = authHelpers.validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      return passwordValidation.message
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Konfirmasi password tidak cocok'
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsLoading(true)

    try {
      // Siapkan data untuk registrasi (exclude confirmPassword)
      const { confirmPassword, ...registerData } = formData
      
      // Call auth helper
      const result = await authHelpers.registerUser(registerData)

      if (result.success) {
        toast.success('Registrasi berhasil! Selamat datang di MIDAS!')
        
        // Reset form
        setFormData({
          nama_lengkap: '',
          email: '',
          password: '',
          confirmPassword: '',
          perusahaan: '',
          no_telepon: ''
        })

        console.log('User registered:', result.data)
        
        // Optional: Redirect atau trigger event lain
        // router.push('/dashboard')
        
      } else {
        toast.error(result.error || 'Registrasi gagal')
      }

    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error('Terjadi kesalahan sistem. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <UserPlus className="h-6 w-6" />
          Daftar ke MIDAS
        </CardTitle>
        <CardDescription>
          Buat akun baru untuk mengakses layanan MIDAS
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div className="space-y-2">
            <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
            <Input
              id="nama_lengkap"
              name="nama_lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.nama_lengkap}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* Perusahaan (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="perusahaan">Perusahaan</Label>
            <Input
              id="perusahaan"
              name="perusahaan"
              type="text"
              placeholder="Nama perusahaan (opsional)"
              value={formData.perusahaan}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* No Telepon (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="no_telepon">No. Telepon</Label>
            <Input
              id="no_telepon"
              name="no_telepon"
              type="tel"
              placeholder="08xxxxxxxxxx (opsional)"
              value={formData.no_telepon}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 karakter, huruf besar, kecil, angka"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password harus mengandung huruf besar, huruf kecil, dan angka
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mendaftarkan...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Daftar Sekarang
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            <p>Dengan mendaftar, Anda menyetujui</p>
            <p>syarat dan ketentuan layanan MIDAS</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 