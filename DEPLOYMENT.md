# 🚀 Deployment Guide - MIDAS

Panduan lengkap untuk deploy aplikasi MIDAS ke production.

## 📋 Prerequisites

1. **Supabase Project** - Database dengan tabel `Mida_Login`
2. **Environment Variables** - URL dan keys dari Supabase
3. **Platform Deployment** - Vercel, Railway, atau hosting lainnya

## 🔧 Setup Environment Variables

### 1. Required Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Dapatkan Values dari Supabase

1. Login ke [supabase.com](https://supabase.com)
2. Pilih project Anda
3. Go to **Settings** > **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🗄️ Database Setup

### Tabel Mida_Login

```sql
CREATE TABLE IF NOT EXISTS Mida_Login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  perusahaan TEXT,
  no_telepon TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mida_login_email ON Mida_Login(email);
CREATE INDEX IF NOT EXISTS idx_mida_login_status ON Mida_Login(status);
```

### RLS Policies (Row Level Security)

```sql
-- Enable RLS
ALTER TABLE Mida_Login ENABLE ROW LEVEL SECURITY;

-- Policy untuk registrasi (anyone can insert)
CREATE POLICY "Allow registration" ON Mida_Login
FOR INSERT WITH CHECK (true);

-- Policy untuk login (anyone can read)
CREATE POLICY "Allow login" ON Mida_Login
FOR SELECT USING (true);

-- Policy untuk update profile (users can update their own data)
CREATE POLICY "Allow profile update" ON Mida_Login
FOR UPDATE USING (true);
```

## 🌐 Platform-Specific Deployment

### Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables**
   - Go to project dashboard
   - Settings > Environment Variables
   - Add kedua environment variables

### Railway

1. **Deploy via CLI**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login dan deploy
   railway login
   railway deploy
   ```

2. **Set Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_SUPABASE_URL=your-url
   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

### Netlify

1. **Deploy via drag & drop atau Git**
2. **Environment Variables**
   - Site settings > Environment variables
   - Add kedua variables

## 🔍 Debugging Production Issues

### 1. Check Environment Variables

```bash
npm run check-env
```

### 2. Build Locally

```bash
npm run build
npm run start
```

### 3. Common Issues

#### Error: "maybeSingle is not a function"
- **Cause**: Supabase client version mismatch atau environment variables missing
- **Fix**: Pastikan environment variables ter-set dengan benar

#### Error: "relation Mida_Login does not exist"
- **Cause**: Tabel belum dibuat di database
- **Fix**: Jalankan SQL script untuk membuat tabel

#### Error: "row-level security policy"
- **Cause**: RLS policies terlalu ketat atau belum dibuat
- **Fix**: Setup RLS policies yang benar

### 4. Test Production

1. **Registrasi User Baru**
   - Fill form registrasi
   - Check database apakah data ter-insert
   
2. **Login Test**
   - Gunakan akun yang sudah terdaftar
   - Pastikan redirect ke dashboard berhasil

## 📝 Environment Examples

### Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
NEXT_PUBLIC_DEBUG_MODE=true
```

### Production
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🆘 Support

Jika masih ada masalah:

1. Check browser console untuk error details
2. Check Supabase dashboard > Logs
3. Pastikan tabel dan RLS policies sudah benar
4. Test di local development dulu

---

**🎉 Selamat! Aplikasi MIDAS siap di production!**