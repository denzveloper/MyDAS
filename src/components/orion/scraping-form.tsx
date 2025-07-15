"use client"

import { useState } from "react"
import { useAuth } from '@/lib/providers/AuthProvider'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ScrapingForm() {
  const { user, isAuthenticated } = useAuth()
  const [url, setUrl] = useState("")
  const [maxResults, setMaxResults] = useState("1")
  const [selectedAction, setSelectedAction] = useState("Menu Aksi")
  const [isLoading, setIsLoading] = useState(false)

  const handleStartScraping = async () => {
    if (!url) {
      alert('Mohon masukkan URL terlebih dahulu')
      return
    }

    if (!isAuthenticated || !user) {
      alert('Anda harus login terlebih dahulu')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/scraping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          maxResults: parseInt(maxResults),
          userEmail: user.email,
          userid: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Gagal mengirim data ke webhook')
      }

      alert('Scraping berhasil dimulai!')
    } catch (error) {
      console.error('Error:', error)
      alert('Gagal memulai scraping. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg bg-background shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter URL or search term..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Max results per URL (optional)
          </span>
          <Select value={maxResults} onValueChange={setMaxResults}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleStartScraping}
          disabled={isLoading}
        >
          {isLoading ? 'Starting...' : 'Start Scraping'}
        </Button>
        <Button variant="outline">
          Stop Scraping
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedAction} ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
              setUrl("")
              setSelectedAction("URL Cleared")
            }}>Clear URL</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setMaxResults("1")
              setSelectedAction("Max Results Reset")
            }}>Reset Max Results</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setUrl("")
              setMaxResults("1")
              setSelectedAction("All Reset")
            }}>Reset All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-auto">
          Export Results
        </Button>
      </div>
    </div>
  )
}
