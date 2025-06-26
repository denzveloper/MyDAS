import { createClient } from '@supabase/supabase-js'

// Validasi environment variables dengan error handling yang lebih baik
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging untuk production
if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
  console.log('🔍 Debug Supabase Config:')
  console.log('📍 Original URL:', supabaseUrl)
  console.log('🔑 Has Key:', !!supabaseAnonKey)
  console.log('🌍 Environment:', process.env.NODE_ENV)
}

// FIX: Handle URL yang mungkin menyebabkan duplikasi /rest/v1/
if (supabaseUrl) {
  // Remove trailing /rest/v1 atau /rest/v1/ jika ada
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '')
  
  // Pastikan tidak ada double slashes
  supabaseUrl = supabaseUrl.replace(/\/+$/, '')
  
  // Special fix untuk proxy yang menambahkan /rest/v1 secara otomatis
  // Jika URL mengandung proxy pattern, gunakan base domain saja
  if (supabaseUrl.includes('sslip.io')) {
    // Extract just the base domain untuk proxy
    const urlParts = supabaseUrl.split('/')
    supabaseUrl = `${urlParts[0]}//${urlParts[2]}`
  }
  
  if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
    console.log('🔧 Fixed URL:', supabaseUrl)
    console.log('🔍 URL Analysis:')
    console.log('  - Contains sslip.io:', supabaseUrl.includes('sslip.io'))
    console.log('  - Final URL length:', supabaseUrl.length)
  }
}

// Flag untuk mengetahui apakah Supabase tersedia
export const isSupabaseAvailable = !!(supabaseUrl && supabaseAnonKey)

let supabaseClient: any = null

if (isSupabaseAvailable) {
  console.log('✅ Supabase configuration loaded successfully')
  console.log('📍 Supabase URL:', supabaseUrl!.substring(0, 50) + '...')
  
  // Simplified configuration - let Supabase handle the rest/v1 path correctly
  const supabaseConfig = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    db: {
      schema: 'public'
    }
  }
  
  supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!, supabaseConfig)
} else {
  console.warn('⚠️ Supabase environment variables not found. Running in fallback mode.')
  console.warn('📝 This is normal during build process without environment variables.')
  
  // Create a more comprehensive mock client untuk development/build
  supabaseClient = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => ({
      insert: (data: any) => ({
        select: (fields?: string) => ({
          single: () => Promise.resolve({ 
            data: null, 
            error: { message: 'Supabase not configured - please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY' } 
          }),
          limit: (count: number) => Promise.resolve({ 
            data: [], 
            error: { message: 'Supabase not configured - please set environment variables' } 
          })
        }),
        limit: (count: number) => Promise.resolve({ 
          data: [], 
          error: { message: 'Supabase not configured - please set environment variables' } 
        })
      }),
      select: (fields?: string) => ({
        eq: (column: string, value: any) => ({
          eq: (column2: string, value2: any) => ({
            single: () => Promise.resolve({ 
              data: null, 
              error: { message: 'Supabase not configured - please set environment variables' } 
            }),
            limit: (count: number) => Promise.resolve({ 
              data: [], 
              error: { message: 'Supabase not configured - please set environment variables' } 
            })
          }),
          single: () => Promise.resolve({ 
            data: null, 
            error: { message: 'Supabase not configured - please set environment variables' } 
          }),
          limit: (count: number) => Promise.resolve({ 
            data: [], 
            error: { message: 'Supabase not configured - please set environment variables' } 
          })
        }),
        single: () => Promise.resolve({ 
          data: null, 
          error: { message: 'Supabase not configured - please set environment variables' } 
        }),
        limit: (count: number) => Promise.resolve({ 
          data: [], 
          error: { message: 'Supabase not configured - please set environment variables' } 
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: (fields?: string) => ({
            single: () => Promise.resolve({ 
              data: null, 
              error: { message: 'Supabase not configured - please set environment variables' } 
            })
          })
        })
      })
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        download: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
}

export const supabase = supabaseClient

// Type untuk database schema (disesuaikan dengan tabel users yang ada)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
          avatar_url?: string
          phone?: string
          company?: string
          role?: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
          avatar_url?: string
          phone?: string
          company?: string
          role?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
          avatar_url?: string
          phone?: string
          company?: string
          role?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          company?: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper functions untuk operasi database umum
export const supabaseHelpers = {
  // Auth helpers
  auth: {
    signUp: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password })
    },
    signIn: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password })
    },
    signOut: async () => {
      return await supabase.auth.signOut()
    },
    getUser: async () => {
      return await supabase.auth.getUser()
    },
    getSession: async () => {
      return await supabase.auth.getSession()
    }
  },

  // Users helpers
  users: {
    create: async (userData: Database['public']['Tables']['users']['Insert']) => {
      return await supabase
        .from('users')
        .insert(userData)
        .select()
        .single()
    },
    getById: async (id: string) => {
      return await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
    },
    getByEmail: async (email: string) => {
      return await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
    },
    update: async (id: string, userData: Database['public']['Tables']['users']['Update']) => {
      return await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single()
    }
  },

  // Storage helpers
  storage: {
    uploadFile: async (bucket: string, path: string, file: File) => {
      return await supabase.storage.from(bucket).upload(path, file)
    },
    downloadFile: async (bucket: string, path: string) => {
      return await supabase.storage.from(bucket).download(path)
    },
    getPublicUrl: (bucket: string, path: string) => {
      return supabase.storage.from(bucket).getPublicUrl(path)
    }
  }
}

export default supabase 