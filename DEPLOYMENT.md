# 🚀 Panduan Deployment MIDAS

## ❌ Error yang Sering Terjadi

### "supabaseUrl is required"

Error ini terjadi karena environment variables tidak tersedia saat build process. Berikut cara mengatasinya:

## 🔧 Solusi untuk Platform Deployment

### 1. Railway

1. **Buka Railway Dashboard**
2. **Pilih project Anda**
3. **Masuk ke tab "Variables"**
4. **Tambahkan environment variables berikut:**

```
NEXT_PUBLIC_SUPABASE_URL=https://ycsorzkykxyfeazkmoei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc29yemt5a3h5ZmVhemttb2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzk3NzYsImV4cCI6MjA2MzkxNTc3Nn0.xt2aFoHnX0fw9mYsWEtlFVPVx9y57QmMXN_-q1H2uyE
```

5. **Deploy ulang aplikasi**

### 2. Vercel

1. **Buka Vercel Dashboard**
2. **Pilih project Anda**
3. **Masuk ke Settings > Environment Variables**
4. **Tambahkan variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://ycsorzkykxyfeazkmoei.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

5. **Redeploy dari Deployments tab**

### 3. Netlify

1. **Buka Netlify Dashboard**
2. **Pilih site Anda**
3. **Site settings > Environment variables**
4. **Tambahkan variables yang sama**
5. **Trigger new deploy**

### 4. Docker/Manual Deployment

Buat file `.env.production`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ycsorzkykxyfeazkmoei.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc29yemt5a3h5ZmVhemttb2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzk3NzYsImV4cCI6MjA2MzkxNTc3Nn0.xt2aFoHnX0fw9mYsWEtlFVPVx9y57QmMXN_-q1H2uyE
```

## 🧪 Test Deployment

Setelah mengatur environment variables:

1. **Cek build lokal:**
```bash
npm run build
```

2. **Test production build:**
```bash
npm run start
```

3. **Akses halaman test:**
```
https://your-domain.com/test-supabase
```

## 🔍 Debugging

### Cek Environment Variables

Tambahkan di `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Log environment variables saat build
  webpack: (config, { dev }) => {
    if (dev) {
      console.log('🔍 Environment Variables:')
      console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing')
    }
    return config
  }
}

export default nextConfig
```

### Build Error Logs

Jika masih error, cek:

1. **Spelling environment variable names**
2. **Whitespace di values**
3. **Special characters yang perlu di-escape**
4. **Platform-specific requirements**

## ✅ Checklist Deployment

- [ ] Environment variables sudah diset di platform
- [ ] Build berhasil tanpa error
- [ ] Test page `/test-supabase` berfungsi
- [ ] Authentication flow bekerja
- [ ] Database connection aktif

## 🆘 Bantuan Lebih Lanjut

Jika masih mengalami masalah:

1. **Cek logs deployment** di platform Anda
2. **Pastikan Supabase project aktif**
3. **Verify API keys masih valid**
4. **Test koneksi dari local development**

---

**Catatan:** Jangan commit file `.env.local` atau `.env.production` ke Git. Gunakan `.env.example` sebagai template. 