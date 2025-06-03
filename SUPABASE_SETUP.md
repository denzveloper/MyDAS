# Setup Supabase untuk MIDAS

## 📋 Konfigurasi yang Sudah Dilakukan

### 1. Instalasi Dependencies
```bash
npm install @supabase/supabase-js sonner
npx shadcn@latest add dialog input label button card badge avatar textarea
```

### 2. Environment Variables
File `.env.local` sudah dibuat dengan konfigurasi:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ycsorzkykxyfeazkmoei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. File Structure yang Dibuat
```
src/
├── lib/
│   ├── supabase.ts                    # Konfigurasi client Supabase
│   └── providers/
│       └── SupabaseProvider.tsx       # Context provider untuk auth
├── hooks/
│   └── useSupabase.ts                 # Custom hook untuk auth
├── components/
│   ├── SupabaseTest.tsx               # Komponen test koneksi
│   ├── login-modal.tsx                # Modal login
│   ├── register-modal.tsx             # Modal register
│   ├── user-status.tsx                # Status user
│   └── examples/
│       └── ContactForm.tsx            # Contoh form
└── app/
    ├── layout.tsx                     # Root layout dengan SupabaseProvider
    └── test-supabase/
        └── page.tsx                   # Halaman test
```

### 4. Provider Integration
`SupabaseProvider` telah diintegrasikan di `src/app/layout.tsx` untuk membungkus seluruh aplikasi:

```typescript
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SupabaseProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 🚀 Cara Menggunakan

### 1. Test Koneksi
Kunjungi halaman test: `http://localhost:3001/test-supabase`

### 2. Menggunakan Supabase Client
```typescript
import { supabase } from '@/lib/supabase'

// Query data
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' })

// Update data
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', 1)

// Delete data
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', 1)
```

### 3. Menggunakan Authentication
```typescript
import { useSupabaseContext } from '@/lib/providers/SupabaseProvider'

function MyComponent() {
  const { user, signIn, signUp, signOut, loading } = useSupabaseContext()

  const handleSignIn = async () => {
    const { data, error } = await signIn('email@example.com', 'password')
    if (error) console.error('Error:', error.message)
  }

  const handleSignUp = async () => {
    const { data, error } = await signUp('email@example.com', 'password')
    if (error) console.error('Error:', error.message)
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) console.error('Error:', error.message)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}
    </div>
  )
}
```

### 4. Menggunakan Modal Authentication
```typescript
import { LoginModal } from '@/components/login-modal'
import { RegisterModal } from '@/components/register-modal'
import { UserStatus } from '@/components/user-status'

function MyComponent() {
  return (
    <div>
      {/* User status akan otomatis update */}
      <UserStatus />
      
      {/* Modal login */}
      <LoginModal>
        <button>Login</button>
      </LoginModal>
      
      {/* Modal register */}
      <RegisterModal>
        <button>Register</button>
      </RegisterModal>
    </div>
  )
}
```

### 5. Menggunakan Storage
```typescript
import { supabaseHelpers } from '@/lib/supabase'

// Upload file
const file = event.target.files[0]
const { data, error } = await supabaseHelpers.storage.uploadFile(
  'bucket-name',
  'path/to/file.jpg',
  file
)

// Get public URL
const { data } = supabaseHelpers.storage.getPublicUrl(
  'bucket-name',
  'path/to/file.jpg'
)
```

## 🔧 Konfigurasi Database Schema

### 1. Update Type Definitions
Edit file `src/lib/supabase.ts` dan update interface `Database` sesuai dengan schema database Anda:

```typescript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
      // Tambahkan tabel lainnya...
    }
  }
}
```

### 2. Generate Types Otomatis (Opsional)
Untuk generate types otomatis dari database:

```bash
# Install Supabase CLI
npm install -g supabase

# Login ke Supabase
supabase login

# Generate types
supabase gen types typescript --project-id ycsorzkykxyfeazkmoei > src/lib/database.types.ts
```

## 🛡️ Security Best Practices

### 1. Row Level Security (RLS)
Pastikan RLS diaktifkan di Supabase dashboard untuk semua tabel yang sensitif.

### 2. Environment Variables
- Jangan commit file `.env.local` ke git
- Gunakan environment variables yang berbeda untuk production

### 3. API Keys
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` aman untuk client-side
- Untuk operasi admin, gunakan service role key di server-side

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## 🐛 Troubleshooting

### Error: "useSupabaseContext must be used within a SupabaseProvider"
**Penyebab:** Komponen yang menggunakan `useSupabaseContext` tidak dibungkus dengan `SupabaseProvider`.

**Solusi:** 
1. Pastikan `SupabaseProvider` sudah ditambahkan di `src/app/layout.tsx` (sudah dilakukan)
2. Jika masih error, pastikan tidak ada komponen yang menggunakan Supabase context di luar provider

**Contoh yang benar:**
```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SupabaseProvider>
          {/* Semua komponen di sini bisa menggunakan useSupabaseContext */}
          <Navbar />
          <main>{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  )
}
```

### Error: "Invalid API key"
- Periksa kembali API key di `.env.local`
- Pastikan tidak ada spasi atau karakter tambahan

### Error: "Failed to fetch"
- Periksa URL Supabase
- Pastikan project Supabase aktif
- Cek network connection

### Error: "Table doesn't exist"
- Pastikan tabel sudah dibuat di Supabase dashboard
- Periksa nama tabel (case-sensitive)

### Toast Notifications Tidak Muncul
- Pastikan `<Toaster />` sudah ditambahkan di layout (sudah dilakukan)
- Import `toast` dari `sonner`: `import { toast } from "sonner"`

## 🎯 Next Steps

1. **Buat tabel di Supabase dashboard** sesuai kebutuhan aplikasi MIDAS
2. **Setup authentication** jika diperlukan
3. **Konfigurasi storage buckets** untuk file uploads
4. **Update database types** sesuai schema yang dibuat
5. **Implement RLS policies** untuk security
6. **Test semua functionality** menggunakan halaman test yang sudah dibuat

## ✅ Status Integrasi

- ✅ **Supabase Client**: Configured dan ready
- ✅ **Authentication**: Login/Register modal ready
- ✅ **Provider Integration**: Global SupabaseProvider setup
- ✅ **Toast Notifications**: Sonner integrated
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Type Safety**: TypeScript interfaces ready
- ✅ **Test Page**: Full demo available at `/test-supabase`

Semua komponen authentication sudah siap digunakan di seluruh aplikasi MIDAS! 🚀 