import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

// Type definitions untuk tabel Mida_Login
export interface MidaLoginUser {
  id?: string
  nama_lengkap: string
  email: string
  password: string
  perusahaan?: string
  no_telepon?: string
  status?: 'active' | 'inactive' | 'pending'
  created_at?: string
  updated_at?: string
}

export interface RegisterData {
  nama_lengkap: string
  email: string
  password: string
  perusahaan?: string
  no_telepon?: string
}

export interface LoginData {
  email: string
  password: string
}

// Password utilities
export const authHelpers = {
  // Hash password menggunakan bcrypt
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  },

  // Verify password
  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
  },

  // Validate email format
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validate password strength
  validatePassword: (password: string): { isValid: boolean; message: string } => {
    if (password.length < 6) {
      return { isValid: false, message: 'Password minimal 6 karakter' }
    }
    
    if (password.length > 128) {
      return { isValid: false, message: 'Password maksimal 128 karakter' }
    }

    // Check for at least one number, one lowercase, one uppercase
    const hasNumber = /\d/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    
    if (!hasNumber || !hasLower || !hasUpper) {
      return { 
        isValid: false, 
        message: 'Password harus mengandung huruf besar, huruf kecil, dan angka' 
      }
    }

    return { isValid: true, message: 'Password valid' }
  },

  // Register new user
  registerUser: async (userData: RegisterData): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      console.log('🔄 Starting registration for:', userData.email)
      
      // 1. Validate input
      if (!authHelpers.validateEmail(userData.email)) {
        console.log('❌ Email validation failed:', userData.email)
        return { success: false, error: 'Format email tidak valid' }
      }

      const passwordValidation = authHelpers.validatePassword(userData.password)
      if (!passwordValidation.isValid) {
        console.log('❌ Password validation failed:', passwordValidation.message)
        return { success: false, error: passwordValidation.message }
      }

      console.log('✅ Input validation passed')

      // 2. Check if email already exists
      console.log('🔍 Checking if email exists...')
      const { data: existingUser, error: checkError } = await supabase
        .from('Mida_Login')
        .select('email')
        .eq('email', userData.email.toLowerCase())
        .maybeSingle() // Use maybeSingle instead of single to avoid error when no data

      if (checkError) {
        console.log('❌ Error checking existing user:', checkError)
        // Don't return error here, continue with registration
      }

      if (existingUser) {
        console.log('❌ Email already exists:', userData.email)
        return { success: false, error: 'Email sudah terdaftar' }
      }

      console.log('✅ Email is available')

      // 3. Hash password
      console.log('🔐 Hashing password...')
      const hashedPassword = await authHelpers.hashPassword(userData.password)
      console.log('✅ Password hashed successfully')

      // 4. Prepare insert data
      const insertData = {
        nama_lengkap: userData.nama_lengkap.trim(),
        email: userData.email.toLowerCase().trim(),
        password: hashedPassword,
        perusahaan: userData.perusahaan?.trim() || null,
        no_telepon: userData.no_telepon?.trim() || null,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('📝 Insert data prepared:', {
        ...insertData,
        password: '[HIDDEN]'
      })

      // 5. Insert user data
      console.log('💾 Inserting user data...')
      const { data: newUser, error: insertError } = await supabase
        .from('Mida_Login')
        .insert(insertData)
        .select('id, nama_lengkap, email, perusahaan, no_telepon, status, created_at')
        .single()

      if (insertError) {
        console.error('❌ Insert error details:', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        })
        
        // Handle specific errors
        if (insertError.code === '23505') {
          return { success: false, error: 'Email sudah terdaftar' }
        } else if (insertError.message.includes('relation') && insertError.message.includes('does not exist')) {
          return { success: false, error: 'Tabel Mida_Login belum dibuat di database' }
        } else if (insertError.code === '42501') {
          return { success: false, error: 'Permission denied - RLS policy issue' }
        } else {
          return { success: false, error: `Database error: ${insertError.message}` }
        }
      }

      console.log('✅ User registered successfully:', newUser)
      return { success: true, data: newUser }

    } catch (error: any) {
      console.error('❌ Registration error:', error)
      return { success: false, error: 'Terjadi kesalahan sistem. Silakan coba lagi.' }
    }
  },

  // Login user
  loginUser: async (loginData: LoginData): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      console.log('🔄 Starting login for:', loginData.email)
      
      // 1. Validate input
      if (!authHelpers.validateEmail(loginData.email)) {
        console.log('❌ Email validation failed:', loginData.email)
        return { success: false, error: 'Format email tidak valid' }
      }

      if (!loginData.password) {
        console.log('❌ Password is empty')
        return { success: false, error: 'Password harus diisi' }
      }

      console.log('✅ Input validation passed')

      // 2. Find user by email
      console.log('🔍 Looking for user with email:', loginData.email.toLowerCase())
      const { data: user, error: userError } = await supabase
        .from('Mida_Login')
        .select('*')
        .eq('email', loginData.email.toLowerCase())
        .eq('status', 'active')
        .maybeSingle() // Use maybeSingle instead of single

      if (userError) {
        console.log('❌ Database error when finding user:', userError)
        return { success: false, error: 'Terjadi kesalahan saat mencari user' }
      }

      if (!user) {
        console.log('❌ User not found or inactive for email:', loginData.email)
        return { success: false, error: 'Email atau password salah' }
      }

      console.log('✅ User found:', { id: user.id, email: user.email, status: user.status })

      // 3. Verify password
      console.log('🔐 Verifying password...')
      const isPasswordValid = await authHelpers.verifyPassword(loginData.password, user.password)
      
      if (!isPasswordValid) {
        console.log('❌ Password verification failed')
        return { success: false, error: 'Email atau password salah' }
      }

      console.log('✅ Password verified successfully')

      // 4. Update last login
      console.log('📝 Updating last login timestamp...')
      const { error: updateError } = await supabase
        .from('Mida_Login')
        .update({ 
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) {
        console.log('⚠️ Warning: Failed to update last login:', updateError)
        // Don't fail login for this error
      } else {
        console.log('✅ Last login updated successfully')
      }

      // 5. Return user data (exclude password)
      const { password, ...userWithoutPassword } = user
      console.log('✅ Login successful for user:', userWithoutPassword.email)
      
      return { success: true, data: userWithoutPassword }

    } catch (error: any) {
      console.error('❌ Login error:', error)
      return { success: false, error: 'Terjadi kesalahan sistem. Silakan coba lagi.' }
    }
  },

  // Get user by ID
  getUserById: async (id: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const { data: user, error } = await supabase
        .from('Mida_Login')
        .select('id, nama_lengkap, email, perusahaan, no_telepon, status, created_at, updated_at, last_login')
        .eq('id', id)
        .eq('status', 'active')
        .single()

      if (error || !user) {
        return { success: false, error: 'User tidak ditemukan' }
      }

      return { success: true, data: user }

    } catch (error: any) {
      console.error('Get user error:', error)
      return { success: false, error: 'Terjadi kesalahan sistem' }
    }
  },

  // Update user profile
  updateUser: async (id: string, updateData: Partial<RegisterData>): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const updateFields: any = {
        updated_at: new Date().toISOString()
      }

      if (updateData.nama_lengkap) {
        updateFields.nama_lengkap = updateData.nama_lengkap.trim()
      }

      if (updateData.email) {
        if (!authHelpers.validateEmail(updateData.email)) {
          return { success: false, error: 'Format email tidak valid' }
        }
        updateFields.email = updateData.email.toLowerCase().trim()
      }

      if (updateData.perusahaan !== undefined) {
        updateFields.perusahaan = updateData.perusahaan?.trim() || null
      }

      if (updateData.no_telepon !== undefined) {
        updateFields.no_telepon = updateData.no_telepon?.trim() || null
      }

      if (updateData.password) {
        const passwordValidation = authHelpers.validatePassword(updateData.password)
        if (!passwordValidation.isValid) {
          return { success: false, error: passwordValidation.message }
        }
        updateFields.password = await authHelpers.hashPassword(updateData.password)
      }

      const { data: updatedUser, error } = await supabase
        .from('Mida_Login')
        .update(updateFields)
        .eq('id', id)
        .select('id, nama_lengkap, email, perusahaan, no_telepon, status, created_at, updated_at')
        .single()

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Email sudah digunakan oleh user lain' }
        }
        return { success: false, error: `Database error: ${error.message}` }
      }

      return { success: true, data: updatedUser }

    } catch (error: any) {
      console.error('Update user error:', error)
      return { success: false, error: 'Terjadi kesalahan sistem' }
    }
  }
}

// Export untuk kemudahan penggunaan
export default authHelpers 