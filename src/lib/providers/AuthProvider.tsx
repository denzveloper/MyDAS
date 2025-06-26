'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { MidaLoginUser } from '@/lib/auth-helpers'

interface AuthContextType {
  user: MidaLoginUser | null
  isLoading: boolean
  login: (userData: MidaLoginUser) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MidaLoginUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage on mount
    try {
      const savedUser = localStorage.getItem('midas_user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      }
    } catch (error) {
      console.error('Error loading saved user:', error)
      localStorage.removeItem('midas_user')
    }
    setIsLoading(false)
  }, [])

  const login = (userData: MidaLoginUser) => {
    setUser(userData)
    localStorage.setItem('midas_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('midas_user')
  }

  const isAuthenticated = !!user

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 