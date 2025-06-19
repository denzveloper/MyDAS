"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Type untuk data kontak
interface ContactData {
  Nama_Lengkap: string
  Email: string
  Nama_Perusahaan?: string | null
  Pesan: string
}

export function CTA() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validasi input
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Mohon lengkapi semua field yang wajib diisi')
      }

      // Persiapkan data kontak
      const contactData: ContactData = {
        Nama_Lengkap: formData.name,
        Email: formData.email,
        Nama_Perusahaan: formData.company || null,
        Pesan: formData.message
      }

      // Kirim data menggunakan fetch API
      const response = await fetch(
        'https://supabasekong-joc0wg4wkwo8o48swgswgo0g.217.15.164.63.sslip.io/rest/v1/Contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoiYW5vbiJ9.s0n5WLXlYRMK-Zk09DAgazMbdHzqIQAqLTHrid068mU',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0ODk0MDEyMCwiZXhwIjo0OTA0NjEzNzIwLCJyb2xlIjoiYW5vbiJ9.s0n5WLXlYRMK-Zk09DAgazMbdHzqIQAqLTHrid068mU',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(contactData)
        }
      )

      // Untuk response sukses, Supabase mengembalikan status 201 Created
      if (response.status === 201) {
        console.log('Pesan berhasil terkirim')
        toast({
          variant: "success",
          title: "Berhasil!",
          description: "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda."
        })
        setFormData({ name: '', email: '', company: '', message: '' })
        return
      }

      // Jika bukan 201, coba parse response untuk error handling
      const responseData = await response.json()
      console.error('Error response:', responseData)
      throw new Error(responseData.message || 'Gagal mengirim pesan. Silakan coba lagi.')
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast({
        variant: "destructive",
        title: "Error!",
        description: error.message || 'Maaf, terjadi kesalahan. Silakan coba lagi.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-sm font-medium px-3 py-1 rounded-full">
              Get Started
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Let's discuss how MIDAS can help you achieve your business goals.
            Fill out the form below and we'll get back to you shortly.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                required
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Input
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Nama Perusahaan (Opsional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="mb-6">
              <Textarea
                required
                placeholder="Pesan Anda"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="text-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300 border-none min-w-[200px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 