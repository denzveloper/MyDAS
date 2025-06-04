import { RegisterForm } from '@/components/register-form'
import { TestMidaLogin } from '@/components/test-mida-login'
import { TestLoginInfo } from '@/components/test-login-info'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Registrasi MIDAS
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Daftar untuk mengakses layanan marketing agency terbaik
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Test Database Component */}
          <div className="space-y-6">
            <TestMidaLogin />
            <TestLoginInfo />
          </div>
          
          {/* Registration Form */}
          <div>
            <RegisterForm />
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sudah punya akun?{' '}
                <a 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Login di sini
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">🛠️ Setup Database (WAJIB)</h3>
            <div className="space-y-3 text-sm">
              <p><strong>1. Buka Supabase Dashboard</strong> → SQL Editor</p>
              <p><strong>2. Copy paste isi file</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">mida_login_schema_simple.sql</code></p>
              <p><strong>3. Jalankan query</strong> untuk membuat tabel Mida_Login</p>
              <p><strong>4. Test koneksi</strong> dengan tombol "Jalankan Test Database" di atas</p>
              <p><strong>5. Test login</strong> dengan kredensial yang tersedia di card "Test Login Credentials"</p>
              <p><strong>6. Jika semua test berhasil</strong>, form registrasi dan login siap digunakan!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 