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
import { useSupabaseContext } from "@/lib/providers/SupabaseProvider"
import { supabaseHelpers } from "@/lib/supabase"
import { toast } from "sonner"

interface RegisterModalProps {
  children: React.ReactNode
  onSuccess?: () => void
}

export function RegisterModal({ children, onSuccess }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: ""
  })

  const { signUp } = useSupabaseContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Nama lengkap harus diisi")
      return false
    }
    
    if (!formData.email.trim()) {
      toast.error("Email harus diisi")
      return false
    }
    
    if (formData.password.length < 6) {
      toast.error("Password minimal 6 karakter")
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
      // 1. Registrasi user di Supabase Auth
      const { data: authData, error: authError } = await signUp(formData.email, formData.password)
      
      if (authError) {
        throw authError
      }

      // 2. Jika registrasi auth berhasil, simpan data user ke tabel users
      if (authData.user) {
        const userData = {
          id: authData.user.id, // Gunakan ID dari auth user
          email: formData.email,
          name: formData.name,
          company: formData.company || undefined,
          phone: formData.phone || undefined,
          role: 'user', // Default role
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const { data: userRecord, error: userError } = await supabaseHelpers.users.create(userData)
        
        if (userError) {
          console.error("Error creating user record:", userError)
          // Jangan throw error di sini karena auth sudah berhasil
          // Hanya log error untuk debugging
          toast.warning("Akun berhasil dibuat, namun ada masalah menyimpan profil. Silakan lengkapi profil nanti.")
        } else {
          console.log("User record created successfully:", userRecord)
        }
      }
      
      toast.success("Akun berhasil dibuat! Silakan cek email untuk verifikasi.")
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
        phone: ""
      })
      
      // Close modal
      setIsOpen(false)
      
      // Call success callback if provided
      onSuccess?.()
      
    } catch (error: any) {
      console.error("Registration error:", error)
      
      // Handle specific error messages
      if (error.message.includes("already registered") || error.message.includes("User already registered")) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain atau login.")
      } else if (error.message.includes("invalid email") || error.message.includes("Invalid email")) {
        toast.error("Format email tidak valid")
      } else if (error.message.includes("Password should be at least")) {
        toast.error("Password minimal 6 karakter")
      } else {
        toast.error(`Gagal membuat akun: ${error.message}`)
      }
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
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
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
            <Label htmlFor="company">Perusahaan</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Nama perusahaan (opsional)"
              value={formData.company}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="08xxxxxxxxxx (opsional)"
              value={formData.phone}
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
                placeholder="Minimal 6 karakter"
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