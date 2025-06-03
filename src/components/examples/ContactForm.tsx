'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Contoh: Simpan ke tabel 'contacts' di Supabase
      // Pastikan tabel 'contacts' sudah dibuat di Supabase dashboard
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        throw error
      }

      toast.success('Pesan berhasil dikirim! Tim MIDAS akan segera menghubungi Anda.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })

    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast.error(`Gagal mengirim pesan: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Hubungi MIDAS
        </CardTitle>
        <CardDescription>
          Kirim pesan kepada tim marketing agency MIDAS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Perusahaan</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Nama perusahaan (opsional)"
              value={formData.company}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Ceritakan tentang kebutuhan marketing Anda..."
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Pesan
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-600">
            <strong>Note:</strong> Pastikan tabel 'contacts' sudah dibuat di Supabase dashboard dengan kolom: name, email, company, message, created_at
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 