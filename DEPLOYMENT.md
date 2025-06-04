# 🚀 Panduan Deployment MIDAS

## ❌ Error yang Sering Terjadi

### "supabaseUrl is required"

Error ini terjadi karena environment variables tidak tersedia saat build process. Berikut cara mengatasinya:

## ✅ **SOLUSI SUDAH DITERAPKAN**

Aplikasi sekarang sudah dilengkapi dengan:

1. **🔄 Dynamic Rendering**: Semua halaman menggunakan `export const dynamic = 'force-dynamic'`
2. **🛡️ Fallback Mode**: Supabase client dengan mock functions saat env vars tidak tersedia
3. **📝 Better Error Handling**: Tidak akan crash saat build tanpa environment variables
4. **🔧 TypeScript Fixes**: Semua type errors sudah diperbaiki

**Status Build**: ✅ **BERHASIL** - Aplikasi bisa di-build tanpa environment variables!

## 🔧 Solusi untuk Platform Deployment

### 1. Railway (RECOMMENDED)

**Langkah-langkah:**

1. **Buka Railway Dashboard** → [railway.app](https://railway.app)
2. **Pilih project Anda**
3. **Masuk ke tab "Variables"**
4. **Tambahkan environment variables berikut:**

```bash
NEXT_PUBLIC_SUPABASE_URL=http://supabasekong-joc0wg4wkwo8o48swgswgo0g.217.15.164.63.sslip.io
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoiYW5vbiJ9.s0n5WLXlYRMK-Zk09DAgazMbdHzqIQAqLTHrid068mU
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.j_gG3Pz6qnmVjvrQK9ab313Wl2HdJ96sbOkx-rxYQYc
```

5. **Deploy ulang aplikasi** (otomatis setelah menambah env vars)

**Hasil yang Diharapkan:**
- ✅ Build berhasil (bahkan tanpa env vars)
- ✅ Aplikasi berjalan normal setelah env vars ditambahkan
- ✅ Supabase authentication berfungsi penuh

### 2. Vercel

1. **Buka Vercel Dashboard**
2. **Pilih project Anda**
3. **Masuk ke Settings > Environment Variables**
4. **Tambahkan variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`: `http://supabasekong-joc0wg4wkwo8o48swgswgo0g.217.15.164.63.sslip.io`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`
   - `SUPABASE_SERVICE_ROLE_KEY`: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`

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
NEXT_PUBLIC_SUPABASE_URL=http://supabasekong-joc0wg4wkwo8o48swgswgo0g.217.15.164.63.sslip.io
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoiYW5vbiJ9.s0n5WLXlYRMK-Zk09DAgazMbdHzqIQAqLTHrid068mU
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.j_gG3Pz6qnmVjvrQK9ab313Wl2HdJ96sbOkx-rxYQYc
```

## 🧪 Test Deployment

### Local Testing

1. **Test build tanpa env vars:**
```bash
# Rename .env.local temporarily
mv .env.local .env.local.backup
npm run build  # Should work now!
mv .env.local.backup .env.local
```

2. **Test dengan env vars:**
```bash
npm run build:check  # Includes env check
```

3. **Test production build:**
```bash
npm run start
```

### Production Testing

Setelah deploy, akses:
- `https://your-domain.com/` - Homepage
- `https://your-domain.com/test-supabase` - Test Supabase connection
- `https://your-domain.com/services` - Services page

## 🔍 Debugging

### Cek Status Supabase

Di browser console, Anda akan melihat:

**Dengan Environment Variables:**
```
✅ Supabase configuration loaded successfully
📍 Supabase URL: http://supabasekong-joc0wg4wkwo8o48swgswgo0g.217.15.164.63.sslip.io
```

**Tanpa Environment Variables:**
```