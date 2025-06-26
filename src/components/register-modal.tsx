"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { authHelpers } from "@/lib/auth-helpers"

interface RegisterModalProps {
  children: React.ReactNode
  onSuccess?: (email: string) => void
}

export function RegisterModal({ children, onSuccess }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    password: "",
    confirmPassword: "",
    perusahaan: "",
    no_telepon: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.nama_lengkap.trim()) {
      toast.error("Nama lengkap harus diisi")
      return false
    }
    
    if (!formData.email.trim()) {
      toast.error("Email harus diisi")
      return false
    }
    
    if (!authHelpers.validateEmail(formData.email)) {
      toast.error("Format email tidak valid")
      return false
    }
    
    if (!formData.password) {
      toast.error("Password harus diisi")
      return false
    }
    
    const passwordValidation = authHelpers.validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message)
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Siapkan data untuk registrasi (exclude confirmPassword)
      const { confirmPassword, ...registerData } = formData
      
      // Call auth helper
      const result = await authHelpers.registerUser(registerData)

      if (result.success) {
        toast.success('🎉 Registrasi berhasil! Silakan login dengan akun baru Anda.')
        
        // Reset form
        setFormData({
          nama_lengkap: "",
          email: "",
          password: "",
          confirmPassword: "",
          perusahaan: "",
          no_telepon: ""
        })
        
        // Close modal
        setIsOpen(false)
        
        // Call success callback - ini akan menampilkan modal login
        onSuccess?.(result.data.email)
        
        console.log('✅ User registered successfully:', result.data.email)
        
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <UserPlus className="h-6 w-6" />
            Daftar Akun
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Buat akun MIDAS untuk mengakses layanan eksklusif
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

          <div className="space-y-2">
            <Label htmlFor="no_telepon">Nomor Telepon</Label>
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
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Membuat Akun...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Daftar Sekarang
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Button 
              type="button"
              variant="link" 
              className="px-0 text-sm"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Login di sini
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Dengan mendaftar, Anda menyetujui{" "}
            <Button variant="link" className="px-0 text-xs h-auto">
              Syarat & Ketentuan
            </Button>{" "}
            dan{" "}
            <Button variant="link" className="px-0 text-xs h-auto">
              Kebijakan Privasi
            </Button>{" "}
            MIDAS.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 