# 🔧 Troubleshooting Registrasi MIDAS

## 🚨 Error 400 Bad Request pada Registrasi

### Penyebab Umum:
1. **RLS (Row Level Security) terlalu ketat**
2. **Tabel belum dibuat dengan benar**
3. **Permission denied pada Supabase**
4. **Validasi data gagal**

## 🛠️ Langkah Penyelesaian

### 1. **SEGERA: Gunakan SQL Schema Sederhana**

Jalankan file `mida_login_schema_simple.sql` di Supabase SQL Editor:

```sql
-- Reset dan buat ulang tabel tanpa RLS
DROP TABLE IF EXISTS public."Mida_Login";

CREATE TABLE public."Mida_Login" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    perusahaan VARCHAR(255),
    no_telepon VARCHAR(20),
    status VARCHAR(20) DEFAULT 'active',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISABLE RLS sementara
ALTER TABLE public."Mida_Login" DISABLE ROW LEVEL SECURITY;
```

### 2. **Test Koneksi Database**

1. Buka halaman registrasi: `http://localhost:3000/register`
2. Klik tombol **"Jalankan Test Database"**
3. Pastikan semua test SUCCESS ✅

### 3. **Debug Console Log**

Buka Browser Developer Tools (F12) → Console, lalu coba registrasi:

**Yang Harus Muncul:**
```
🔄 Starting registration for: email@example.com
✅ Input validation passed
🔍 Checking if email exists...
✅ Email is available
🔐 Hashing password...
✅ Password hashed successfully
📝 Insert data prepared: {...}
💾 Inserting user data...
✅ User registered successfully
```

**Jika Ada Error:**
```
❌ Insert error details: {
  code: "...",
  message: "...",
  details: "...",
  hint: "..."
}
```

### 4. **Error Codes dan Solusi**

| Error Code | Penyebab | Solusi |
|------------|----------|--------|
| `42P01` | Tabel tidak ada | Jalankan SQL schema |
| `23505` | Email sudah ada | Gunakan email berbeda |
| `42501` | Permission denied | Disable RLS sementara |
| `22001` | Data terlalu panjang | Periksa panjang input |
| `23502` | Field required kosong | Pastikan field wajib diisi |

### 5. **Test Manual di Supabase**

1. Buka **Supabase Dashboard** → **Table Editor**
2. Pilih tabel `Mida_Login`
3. Coba **Insert Row** manual:

```json
{
  "nama_lengkap": "Test User",
  "email": "test123@example.com",
  "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeU8t/sJHVxGDNQqa",
  "status": "active"
}
```

### 6. **Verifikasi Environment Variables**

Pastikan file `.env.local` berisi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 7. **Test API Directly (Advanced)**

Test dengan curl:

```bash
curl -X POST "your_supabase_url/rest/v1/Mida_Login" \
  -H "apikey: your_anon_key" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "nama_lengkap": "Test User",
    "email": "test@example.com",
    "password": "hashedpassword",
    "status": "active"
  }'
```

## 🎯 Checklist Lengkap

- [ ] **SQL schema dijalankan** (`mida_login_schema_simple.sql`)
- [ ] **Test database berhasil** (semua ✅)
- [ ] **RLS disabled sementara** 
- [ ] **Environment variables valid**
- [ ] **Console log tidak ada error**
- [ ] **Insert manual berhasil**
- [ ] **Registrasi lewat form berhasil**

## 📞 Jika Masih Bermasalah

1. **Copy-paste console log error** yang muncul
2. **Screenshot test database results**
3. **Kirim detail error dari Supabase Dashboard**

## 🔄 Setelah Berhasil

Setelah registrasi bekerja, aktifkan kembali RLS:

```sql
-- Enable RLS kembali
ALTER TABLE public."Mida_Login" ENABLE ROW LEVEL SECURITY;

-- Tambah policy yang lebih baik
CREATE POLICY "Enable insert for registration" ON public."Mida_Login"
    FOR INSERT WITH CHECK (true);
``` 