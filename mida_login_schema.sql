-- =============================================
-- MIDAS LOGIN TABLE SCHEMA
-- Tabel untuk menyimpan data registrasi user
-- =============================================

-- Create Mida_Login table
CREATE TABLE IF NOT EXISTS public."Mida_Login" (
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
CREATE INDEX IF NOT EXISTS idx_mida_login_email ON public."Mida_Login"(email);
CREATE INDEX IF NOT EXISTS idx_mida_login_status ON public."Mida_Login"(status);
CREATE INDEX IF NOT EXISTS idx_mida_login_created_at ON public."Mida_Login"(created_at);

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

-- Enable Row Level Security (RLS)
ALTER TABLE public."Mida_Login" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can register" ON public."Mida_Login";
DROP POLICY IF EXISTS "Users can view own data" ON public."Mida_Login";
DROP POLICY IF EXISTS "Users can update own data" ON public."Mida_Login";
DROP POLICY IF EXISTS "Only service role can delete" ON public."Mida_Login";

-- RLS Policies - Updated for better compatibility

-- Policy untuk INSERT (semua orang bisa registrasi tanpa auth)
CREATE POLICY "Enable insert for all users" ON public."Mida_Login"
    FOR INSERT WITH CHECK (true);

-- Policy untuk SELECT (hanya untuk service role dan admin untuk sekarang)
CREATE POLICY "Enable read access for service role" ON public."Mida_Login"
    FOR SELECT USING (
        auth.role() = 'service_role' OR
        auth.role() = 'authenticated'
    );

-- Policy untuk UPDATE (hanya service role untuk sekarang)
CREATE POLICY "Enable update for service role" ON public."Mida_Login"
    FOR UPDATE USING (
        auth.role() = 'service_role'
    );

-- Policy untuk DELETE (hanya service role)
CREATE POLICY "Enable delete for service role" ON public."Mida_Login"
    FOR DELETE USING (
        auth.role() = 'service_role'
    );

-- Function untuk auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mida_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_mida_login_updated_at_trigger ON public."Mida_Login";

-- Trigger untuk auto-update updated_at
CREATE TRIGGER update_mida_login_updated_at_trigger
    BEFORE UPDATE ON public."Mida_Login"
    FOR EACH ROW
    EXECUTE FUNCTION update_mida_login_updated_at();

-- =============================================
-- TEMPORARY: Disable RLS for testing
-- Uncomment these lines if you still have issues
-- =============================================

-- Disable RLS temporarily for testing
-- ALTER TABLE public."Mida_Login" DISABLE ROW LEVEL SECURITY;

-- =============================================
-- SAMPLE DATA (Optional - untuk testing)
-- =============================================

-- Insert sample user untuk testing (password: TestPassword123)
-- Hashed dengan bcrypt rounds 12
/*
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
*/

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Cek struktur tabel
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'Mida_Login' AND table_schema = 'public'
-- ORDER BY ordinal_position;

-- Cek indexes
-- SELECT indexname, indexdef FROM pg_indexes 
-- WHERE tablename = 'Mida_Login' AND schemaname = 'public';

-- Cek RLS policies
-- SELECT policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies 
-- WHERE tablename = 'Mida_Login' AND schemaname = 'public';

-- =============================================
-- BACKUP & RESTORE COMMANDS
-- =============================================

-- Backup data
-- COPY public."Mida_Login" TO '/path/to/backup/mida_login_backup.csv' DELIMITER ',' CSV HEADER;

-- Restore data  
-- COPY public."Mida_Login" FROM '/path/to/backup/mida_login_backup.csv' DELIMITER ',' CSV HEADER;

COMMIT; 