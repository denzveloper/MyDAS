'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase, supabaseHelpers, Database } from '@/lib/supabase'

type UserProfile = Database['public']['Tables']['users']['Row']

interface SupabaseContextType {
  user: User | null
  userProfile: UserProfile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  refreshUserProfile: () => Promise<void>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch user profile from users table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabaseHelpers.users.getById(userId)
      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Function to refresh user profile
  const refreshUserProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id)
      setUserProfile(profile)
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      // Fetch user profile if user exists
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id)
        setUserProfile(profile)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Fetch user profile when user signs in
          const profile = await fetchUserProfile(session.user.id)
          setUserProfile(profile)
        } else {
          // Clear user profile when user signs out
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await supabaseHelpers.auth.signIn(email, password)
    
    // Fetch user profile after successful sign in
    if (result.data?.user && !result.error) {
      const profile = await fetchUserProfile(result.data.user.id)
      setUserProfile(profile)
    }
    
    return result
  }

  const signUp = async (email: string, password: string) => {
    return await supabaseHelpers.auth.signUp(email, password)
  }

  const signOut = async () => {
    const result = await supabaseHelpers.auth.signOut()
    setUserProfile(null) // Clear user profile on sign out
    return result
  }

  const value = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUserProfile
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabaseContext() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider')
  }
  return context
} 