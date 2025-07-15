"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [maxResults, setMaxResults] = useState("1")

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Masukkan URL atau kata kunci pencarian..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Max results per URL
        </span>
        <Select value={maxResults} onValueChange={setMaxResults}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={() => setSearchTerm("")}>
        Cancel changes
      </Button>
    </div>
  )
}
