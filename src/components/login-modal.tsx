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
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react"
import { useSupabaseContext } from "@/lib/providers/SupabaseProvider"
import { RegisterModal } from "@/components/register-modal"
import { toast } from "sonner"

interface LoginModalProps {
  children: React.ReactNode
  onSuccess?: () => void
}

export function LoginModal({ children, onSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { signIn } = useSupabaseContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email dan password harus diisi")
      return
    }
    
    setIsLoading(true)
    
    try {
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        throw error
      }

      toast.success("Login berhasil! Selamat datang kembali.")
      
      // Reset form
      setFormData({
        email: "",
        password: ""
      })
      
      // Close modal
      setIsOpen(false)
      
      // Call success callback if provided
      onSuccess?.()
      
    } catch (error: any) {
      console.error("Login error:", error)
      
      // Handle specific error messages
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Email atau password salah")
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Silakan verifikasi email Anda terlebih dahulu")
      } else {
        toast.error(`Gagal login: ${error.message}`)
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6" />
            Login
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Masuk ke akun MIDAS Anda
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
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
          
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm text-muted-foreground"
              disabled={isLoading}
            >
              Lupa password?
            </Button>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Masuk...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <RegisterModal
              onSuccess={() => {
                setIsOpen(false)
                toast.success("Silakan login dengan akun baru Anda")
              }}
            >
              <Button 
                type="button"
                variant="link" 
                className="px-0 text-sm"
                disabled={isLoading}
              >
                Daftar sekarang
              </Button>
            </RegisterModal>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 