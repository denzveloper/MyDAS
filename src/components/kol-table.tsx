"use client"

import { useEffect, useState } from "react"
import { nocodb } from "@/lib/nocodb"
import { LoaderIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface KolRecord {
  id: number
  name: string
  platform: string
  followers: number
  category: string
}

export default function KolTable() {
  const [data, setData] = useState<KolRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchKol() {
      try {
        // Ambil slug project & table dari ENV agar mudah dikonfigurasi
        const projectSlug = process.env.NEXT_PUBLIC_NOCODB_PROJECT as string
        const tableSlug = process.env.NEXT_PUBLIC_NOCODB_TABLE as string
        const viewSlug = process.env.NEXT_PUBLIC_NOCODB_VIEW as string | undefined
        const fieldSetSlug = process.env.NEXT_PUBLIC_NOCODB_FIELDSET as string | undefined

        if (!projectSlug || !tableSlug) {
          throw new Error("Env NEXT_PUBLIC_NOCODB_PROJECT atau NEXT_PUBLIC_NOCODB_TABLE belum diset")
        }

        let res
        if (viewSlug) {
          // gunakan view spesifik
          res = await nocodb.dbViewRow.list(projectSlug!, tableSlug!, viewSlug!, fieldSetSlug)
        } else {
          // fallback ambil semua row tabel
          res = await nocodb.dbTableRow.list(projectSlug!, tableSlug!)
        }
        // @ts-ignore
        setData(res.list as KolRecord[])
      } catch (e: any) {
        console.error(e)
        setError("Gagal mengambil data KOL")
      } finally {
        setLoading(false)
      }
    }
    fetchKol()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Buat tabel dinamis berdasarkan kunci object
  const columns = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-muted text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-medium uppercase tracking-wider whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted">
          {data.map((row, idx) => (
            <tr key={row.id ?? idx} className="hover:bg-muted/30">
              {columns.map((col) => (
                <td key={col} className="px-3 py-2 whitespace-nowrap">
                  {(() => {
                    const val: any = (row as any)[col]
                    if (val === null || val === undefined || val === '') return '-'
                    if (typeof val === 'number') return val.toLocaleString()
                    return String(val)
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
