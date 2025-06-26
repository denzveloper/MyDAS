# Authentication Modals untuk MIDAS

## 📋 Overview

Sistem authentication lengkap dengan modal login dan register yang terintegrasi dengan Supabase. Setelah registrasi berhasil, data user akan disimpan ke tabel `users` di Supabase.

## 🚀 Komponen yang Tersedia

### 1. RegisterModal (`src/components/register-modal.tsx`)

Modal untuk registrasi user baru dengan fitur:

- ✅ **Form Validation**: Validasi real-time untuk semua field
- ✅ **Password Visibility**: Toggle show/hide untuk password dan konfirmasi password
- ✅ **Supabase Integration**: Registrasi auth + simpan ke tabel users
- ✅ **Error Handling**: Pesan error yang user-friendly
- ✅ **Loading States**: Loading indicator saat proses registrasi
- ✅ **Toast Notifications**: Feedback sukses/error menggunakan Sonner
- ✅ **Additional Fields**: Nama, perusahaan, nomor telepon

**Fields yang tersedia:**
- Nama Lengkap (required)
- Email (required)
- Perusahaan (optional)
- Nomor Telepon (optional)
- Password (required, min 6 karakter)
- Konfirmasi Password (required)

**Proses Registrasi:**
1. Validasi form client-side
2. Registrasi user di Supabase Auth
3. Simpan data lengkap ke tabel `users`
4. Tampilkan notifikasi sukses/error
5. Reset form dan tutup modal

### 2. LoginModal (`src/components/login-modal.tsx`)

Modal untuk login user yang sudah terdaftar dengan fitur:

- ✅ **Email/Password Login**: Login menggunakan Supabase Auth
- ✅ **Password Visibility**: Toggle show/hide password
- ✅ **Error Handling**: Pesan error yang spesifik
- ✅ **Loading States**: Loading indicator saat proses login
- ✅ **Profile Fetching**: Otomatis ambil data dari tabel users setelah login
- ✅ **Link to Register**: Link ke modal register

### 3. UserStatus (`src/components/user-status.tsx`)

Komponen untuk menampilkan status dan informasi user dengan fitur:

- ✅ **Real-time Status**: Update otomatis saat login/logout
- ✅ **User Profile**: Tampilkan data dari tabel users
- ✅ **Avatar**: Avatar dengan initials atau foto profil
- ✅ **Detailed Info**: Email, nama, perusahaan, telepon, tanggal bergabung
- ✅ **Status Badges**: Verification status, profile completion
- ✅ **Logout Function**: Tombol logout dengan konfirmasi

## 📊 Database Schema

### Tabel Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  company VARCHAR,
  phone VARCHAR,
  role VARCHAR DEFAULT 'user',
  avatar_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## 🔧 Cara Penggunaan

### 1. Import Komponen

```typescript
import { RegisterModal } from '@/components/register-modal'
import { LoginModal } from '@/components/login-modal'
import { UserStatus } from '@/components/user-status'
```

### 2. Gunakan Modal Register

```typescript
function MyComponent() {
  const handleRegistrationSuccess = () => {
    console.log("User berhasil registrasi!")
    // Redirect atau action lainnya
  }

  return (
    <RegisterModal onSuccess={handleRegistrationSuccess}>
      <Button>Daftar Sekarang</Button>
    </RegisterModal>
  )
}
```

### 3. Gunakan Modal Login

```typescript
function MyComponent() {
  return (
    <LoginModal>
      <Button variant="outline">Login</Button>
    </LoginModal>
  )
}
```

### 4. Tampilkan Status User

```typescript
function MyComponent() {
  return (
    <div className="max-w-md mx-auto">
      <UserStatus />
    </div>
  )
}
```

### 5. Akses Data User di Komponen Lain

```typescript
import { useSupabaseContext } from '@/lib/providers/SupabaseProvider'

function MyComponent() {
  const { user, userProfile, loading } = useSupabaseContext()

  if (loading) return <div>Loading...</div>
  
  if (!user) return <div>Please login</div>

  return (
    <div>
      <h1>Welcome, {userProfile?.name || user.email}!</h1>
      {userProfile?.company && (
        <p>Company: {userProfile.company}</p>
      )}
      {userProfile?.phone && (
        <p>Phone: {userProfile.phone}</p>
      )}
    </div>
  )
}
```

## 🎯 Fitur Utama

### Authentication Flow

1. **Register**: 
   - User mengisi form registrasi
   - Sistem membuat akun di Supabase Auth
   - Data lengkap disimpan ke tabel `users`
   - Email verifikasi dikirim otomatis

2. **Login**:
   - User login dengan email/password
   - Sistem mengambil data dari tabel `users`
   - Context provider update dengan data lengkap

3. **Session Management**:
   - Auto-refresh session
   - Persistent login state
   - Auto-logout saat session expired

### Data Synchronization

- **Auth User ↔ Users Table**: ID user di auth sama dengan ID di tabel users
- **Real-time Updates**: Context provider otomatis update saat ada perubahan
- **Profile Refresh**: Function untuk refresh data user manual

## 🛡️ Security Features

### Row Level Security (RLS)

- Users hanya bisa akses data mereka sendiri
- Insert/Update/Select policies sudah dikonfigurasi
- Data aman dari akses unauthorized

### Validation

- **Client-side**: Validasi real-time di form
- **Server-side**: Supabase Auth validation
- **Type Safety**: TypeScript interfaces untuk semua data

### Error Handling

- **Specific Messages**: Pesan error yang jelas dan actionable
- **Graceful Degradation**: Jika gagal simpan ke users table, auth tetap berhasil
- **User Feedback**: Toast notifications untuk semua action

## 📱 Responsive Design

- Modal responsive untuk semua ukuran layar
- Form layout yang optimal di mobile
- Touch-friendly button sizes
- Accessible keyboard navigation

## 🔄 State Management

### Context Provider

```typescript
interface SupabaseContextType {
  user: User | null                    // Supabase Auth User
  userProfile: UserProfile | null      // Data dari tabel users
  session: Session | null              // Supabase Session
  loading: boolean                     // Loading state
  signIn: (email, password) => Promise // Login function
  signUp: (email, password) => Promise // Register function
  signOut: () => Promise               // Logout function
  refreshUserProfile: () => Promise    // Refresh profile data
}
```

### Loading States

- **Initial Load**: Loading saat check session
- **Authentication**: Loading saat login/register
- **Profile Fetch**: Loading saat ambil data user
- **Logout**: Loading saat proses logout

## 🧪 Testing

### Test Page

Kunjungi `/test-supabase` untuk melihat demo semua komponen:

- Form registrasi lengkap
- Modal login
- Status user real-time
- Test koneksi Supabase

### Manual Testing

1. **Register Flow**:
   - Isi form registrasi dengan data lengkap
   - Cek email untuk verifikasi
   - Cek data tersimpan di Supabase dashboard

2. **Login Flow**:
   - Login dengan akun yang sudah dibuat
   - Cek data user tampil di UserStatus
   - Cek session persistent setelah refresh

3. **Error Handling**:
   - Test dengan email yang sudah ada
   - Test dengan password yang lemah
   - Test dengan koneksi internet terputus

## 🐛 Troubleshooting

### Error: "User already registered"

**Penyebab**: Email sudah terdaftar di Supabase Auth

**Solusi**: 
- Gunakan email lain untuk registrasi
- Atau gunakan modal login jika sudah punya akun

### Error: "Failed to create user record"

**Penyebab**: Gagal menyimpan ke tabel users (mungkin RLS policy)

**Solusi**:
- Cek RLS policies di Supabase dashboard
- Pastikan policy "Users can insert own data" aktif
- Auth tetap berhasil, user bisa login normal

### Data User Tidak Muncul

**Penyebab**: Gagal fetch data dari tabel users

**Solusi**:
- Cek koneksi ke Supabase
- Cek RLS policies untuk SELECT
- Call `refreshUserProfile()` manual

### Modal Tidak Buka

**Penyebab**: State management issue

**Solusi**:
- Pastikan komponen dibungkus `SupabaseProvider`
- Cek console untuk error JavaScript
- Restart development server

## 📈 Next Steps

### Enhancements

1. **Email Verification**: Handle email verification flow
2. **Password Reset**: Implement forgot password
3. **Profile Edit**: Modal untuk edit profil user
4. **Avatar Upload**: Upload dan crop avatar
5. **Social Login**: Google, GitHub, dll
6. **Two-Factor Auth**: Implementasi 2FA

### Database Extensions

1. **User Preferences**: Tabel untuk settings user
2. **Activity Log**: Track user activities
3. **Notifications**: System notifikasi
4. **Teams/Organizations**: Multi-tenant support

## ✅ Status Implementasi

- ✅ **Register Modal**: Complete dengan Supabase integration
- ✅ **Login Modal**: Complete dengan profile fetching
- ✅ **User Status**: Complete dengan detailed info
- ✅ **Context Provider**: Complete dengan users table sync
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Documentation**: Complete setup guide
- ✅ **Test Page**: Full demo available

Sistem authentication MIDAS siap digunakan untuk production! 🚀 