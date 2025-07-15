'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { MidaLoginUser } from '@/lib/auth-helpers'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: MidaLoginUser | null
  isLoading: boolean
  login: (userData: MidaLoginUser) => void
  logout: () => Promise<void>
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

  const logout = async () => {
    try {
      // Logout dari Supabase
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out from Supabase:', error)
      }
      
      // Clear local storage dan state
      setUser(null)
      localStorage.removeItem('midas_user')
    } catch (error) {
      console.error('Error during logout:', error)
      // Tetap clear local storage dan state meskipun ada error
      setUser(null)
      localStorage.removeItem('midas_user')
    }
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