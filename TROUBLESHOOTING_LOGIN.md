# 🔐 Troubleshooting Login MIDAS

## 🎉 **GOOD NEWS: Registrasi Sudah Berhasil!**

Berdasarkan feedback Anda, registrasi sudah bisa menyimpan data. Sekarang kita fokus menyelesaikan masalah login.

## 🚨 **Masalah yang Sudah Diperbaiki**

### ❌ **Sebelumnya:** Login menggunakan Supabase Auth
```typescript
// Error: invalid_credentials di /auth/v1/token
const { data, error } = await signIn(formData.email, formData.password)
```

### ✅ **Sekarang:** Login menggunakan sistem custom tabel Mida_Login
```typescript
// Login dari tabel Mida_Login dengan bcrypt verification
const result = await authHelpers.loginUser(formData)
```

## 🛠️ **Langkah Penyelesaian Login**

### 1. **Pastikan Schema Database Sudah Dijalankan**

Jika belum, jalankan `mida_login_schema_simple.sql` di Supabase SQL Editor:

```sql
-- File ini sudah include user test otomatis
INSERT INTO public."Mida_Login" (
    nama_lengkap, 
    email, 
    password, 
    perusahaan, 
    status
) VALUES (
    'Test User',
    'test@midas.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeU8t/sJHVxGDNQqa', -- TestPassword123
    'MIDAS Test Company',
    'active'
);
```

### 2. **Test Koneksi Database**

1. Buka halaman registrasi: `http://localhost:3000/register`
2. Klik tombol **"Jalankan Test Database"**
3. Pastikan hasil:
   - ✅ **Koneksi Supabase:** Success
   - ✅ **Tabel Mida_Login:** Success  
   - ✅ **Data Count:** Tabel berisi 1+ record (including test user)

### 3. **Test Login dengan Kredensial Test**

Gunakan kredensial yang sudah tersedia di card **"Test Login Credentials"**:

| Field | Value |
|-------|-------|
| **Email** | `test@midas.com` |
| **Password** | `TestPassword123` |

### 4. **Debug Console Log**

Buka Browser Developer Tools (F12) → Console, lalu coba login:

**Yang Harus Muncul (Success):**
```
🔄 Starting login for: test@midas.com
✅ Input validation passed
🔍 Looking for user with email: test@midas.com
✅ User found: {id: "...", email: "test@midas.com", status: "active"}
🔐 Verifying password...
✅ Password verified successfully
📝 Updating last login timestamp...
✅ Last login updated successfully
✅ Login successful for user: test@midas.com
```

**Jika Ada Error:**
```
❌ User not found or inactive for email: test@midas.com
❌ Password verification failed
❌ Database error when finding user: {...}
```

### 5. **Troubleshooting Error Spesifik**

| Error Message | Penyebab | Solusi |
|---------------|----------|--------|
| `User not found or inactive` | User test belum ada | Jalankan SQL schema lagi |
| `Password verification failed` | Password salah | Pastikan menggunakan `TestPassword123` |
| `Database error when finding user` | Koneksi/tabel issue | Cek test database dulu |
| `Format email tidak valid` | Email format salah | Gunakan `test@midas.com` |

### 6. **Verifikasi Manual di Supabase**

1. Buka **Supabase Dashboard** → **Table Editor**
2. Pilih tabel `Mida_Login`
3. Pastikan ada record dengan:
   - **email:** `test@midas.com`
   - **status:** `active`
   - **password:** starts with `$2b$12$...` (bcrypt hash)

### 7. **Test dengan User yang Baru Registrasi**

Jika test user tidak ada, coba:
1. **Registrasi user baru** lewat form
2. **Login dengan user baru** tersebut
3. Bandingkan console log

## 🎯 **Checklist Login**

- [ ] **SQL schema dijalankan** (`mida_login_schema_simple.sql`)
- [ ] **Test database berhasil** (semua ✅)
- [ ] **User test ada di database** (`test@midas.com`)
- [ ] **Login modal menggunakan authHelpers** (bukan Supabase Auth)
- [ ] **Console log menunjukkan proses login**
- [ ] **Login berhasil dengan test credentials**

## 🔍 **Quick Test Commands**

### Cek User Test Ada:
```sql
SELECT * FROM public."Mida_Login" 
WHERE email = 'test@midas.com' AND status = 'active';
```

### Reset User Test (jika perlu):
```sql
DELETE FROM public."Mida_Login" WHERE email = 'test@midas.com';

INSERT INTO public."Mida_Login" (nama_lengkap, email, password, status) 
VALUES ('Test User', 'test@midas.com', 
        '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeU8t/sJHVxGDNQqa', 
        'active');
```

## 🚀 **Langkah Selanjutnya**

Setelah login berhasil:

1. ✅ **Registrasi works** 
2. ✅ **Login works**
3. 🎯 **Next:** Implementasi session management dan protected routes
4. 🎯 **Next:** Dashboard user setelah login
5. 🎯 **Next:** Logout functionality

## 📞 **Jika Masih Bermasalah**

1. **Copy-paste console log** saat login (terutama yang ❌)
2. **Screenshot test database results**
3. **Pastikan menggunakan kredensial yang exact sama**

## 💡 **Tips**

- Jangan gunakan email/password dari Supabase Auth
- Gunakan kredensial dari tabel `Mida_Login`
- Pastikan tidak ada typo di email/password
- Clear browser cache jika perlu 