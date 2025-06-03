import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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