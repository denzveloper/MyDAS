"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { RegisterModal } from "@/components/register-modal"
import { toast } from "sonner"
import { authHelpers } from "@/lib/auth-helpers"
import { useAuth } from "@/lib/providers/AuthProvider"

interface LoginModalProps {
  children: React.ReactNode
  onSuccess?: () => void
  prefilledEmail?: string
}

export function LoginModal({ children, onSuccess, prefilledEmail }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState<string>("")
  const router = useRouter()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Auto-fill email jika ada prefilledEmail atau registeredEmail
  useEffect(() => {
    const emailToFill = prefilledEmail || registeredEmail
    if (emailToFill && emailToFill !== formData.email) {
      setFormData(prev => ({
        ...prev,
        email: emailToFill
      }))
    }
  }, [prefilledEmail, registeredEmail, formData.email])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email harus diisi")
      return false
    }
    
    if (!formData.password.trim()) {
      toast.error("Password harus diisi")
      return false
    }
    
    if (!authHelpers.validateEmail(formData.email)) {
      toast.error("Format email tidak valid")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      console.log("🔄 Starting login for:", formData.email)
      
      // Call auth helper for login
      const result = await authHelpers.loginUser(formData)

      if (result.success) {
        toast.success("Login berhasil! Mengarahkan ke dashboard...")
        
        // Save user to auth context
        login(result.data)
        
        // Reset form
        setFormData({
          email: "",
          password: ""
        })
        
        // Clear registered email
        setRegisteredEmail("")
        
        // Close modal
        setIsOpen(false)
        
        // Call success callback if provided
        onSuccess?.()
        
        console.log("✅ User logged in and saved to context:", result.data)
        
        // Redirect to dashboard
        console.log("🚀 Redirecting to dashboard...")
        router.push("/dashboard")
        
      } else {
        toast.error(result.error || "Login gagal")
      }

    } catch (error: any) {
      console.error("❌ Login error:", error)
      toast.error("Terjadi kesalahan sistem. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegistrationSuccess = (email: string) => {
    // Set email yang baru didaftarkan
    setRegisteredEmail(email)
    // Clear password untuk keamanan
    setFormData(prev => ({
      ...prev,
      password: ""
    }))
    toast.success("🎉 Registrasi berhasil! Email sudah diisi, masukkan password untuk login.")
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
            {registeredEmail && (
              <p className="text-xs text-green-500">
                ✅ Email dari registrasi berhasil sudah diisi
              </p>
            )}
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
              onSuccess={handleRegistrationSuccess}
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
          
          <div className="text-xs text-muted-foreground text-center mt-4">
            <p>💡 <strong>Test Login:</strong></p>
            <p>Email: test@midas.com</p>
            <p>Password: TestPassword123</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 