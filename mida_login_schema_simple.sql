-- =============================================
-- MIDAS LOGIN TABLE SCHEMA (SIMPLIFIED FOR TESTING)
-- Tabel untuk menyimpan data registrasi user
-- =============================================

-- Drop table if exists (untuk reset)
DROP TABLE IF EXISTS public."Mida_Login";

-- Create Mida_Login table
CREATE TABLE public."Mida_Login" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed password dengan bcrypt
    perusahaan VARCHAR(255),
    no_telepon VARCHAR(20),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes untuk performance
CREATE INDEX idx_mida_login_email ON public."Mida_Login"(email);
CREATE INDEX idx_mida_login_status ON public."Mida_Login"(status);
CREATE INDEX idx_mida_login_created_at ON public."Mida_Login"(created_at);

-- Add comments untuk dokumentasi
COMMENT ON TABLE public."Mida_Login" IS 'Tabel untuk menyimpan data registrasi user MIDAS';
COMMENT ON COLUMN public."Mida_Login".id IS 'Primary key dengan UUID';
COMMENT ON COLUMN public."Mida_Login".nama_lengkap IS 'Nama lengkap user';
COMMENT ON COLUMN public."Mida_Login".email IS 'Email user (unique)';
COMMENT ON COLUMN public."Mida_Login".password IS 'Password yang sudah di-hash dengan bcrypt';
COMMENT ON COLUMN public."Mida_Login".perusahaan IS 'Nama perusahaan user (opsional)';
COMMENT ON COLUMN public."Mida_Login".no_telepon IS 'Nomor telepon user (opsional)';
COMMENT ON COLUMN public."Mida_Login".status IS 'Status user: active, inactive, pending';
COMMENT ON COLUMN public."Mida_Login".last_login IS 'Timestamp terakhir kali login';
COMMENT ON COLUMN public."Mida_Login".created_at IS 'Timestamp saat user registrasi';
COMMENT ON COLUMN public."Mida_Login".updated_at IS 'Timestamp terakhir data diupdate';

-- DISABLE RLS for easier testing (enable later when everything works)
ALTER TABLE public."Mida_Login" DISABLE ROW LEVEL SECURITY;

-- Function untuk auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mida_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger untuk auto-update updated_at
CREATE TRIGGER update_mida_login_updated_at_trigger
    BEFORE UPDATE ON public."Mida_Login"
    FOR EACH ROW
    EXECUTE FUNCTION update_mida_login_updated_at();

-- Insert sample user untuk testing (password: TestPassword123)
-- Hashed dengan bcrypt rounds 12
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
) ON CONFLICT (email) DO NOTHING;

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Cek struktur tabel
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Mida_Login' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Cek data yang ada
SELECT id, nama_lengkap, email, perusahaan, status, created_at 
FROM public."Mida_Login" 
ORDER BY created_at DESC;

COMMIT; 