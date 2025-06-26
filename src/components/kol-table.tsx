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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRows, setTotalRows] = useState(0)
  const itemsPerPage = 100

  useEffect(() => {
    async function fetchKol() {
      try {
        setLoading(true)
        // Ambil slug project & table dari ENV agar mudah dikonfigurasi
        const projectSlug = process.env.NEXT_PUBLIC_NOCODB_PROJECT as string
        const tableSlug = process.env.NEXT_PUBLIC_NOCODB_TABLE as string
        const viewSlug = process.env.NEXT_PUBLIC_NOCODB_VIEW as string | undefined
        const fieldSetSlug = process.env.NEXT_PUBLIC_NOCODB_FIELDSET as string | undefined

        if (!projectSlug || !tableSlug) {
          throw new Error("Env NEXT_PUBLIC_NOCODB_PROJECT atau NEXT_PUBLIC_NOCODB_TABLE belum diset")
        }

        let res
        const offset = (currentPage - 1) * itemsPerPage
        if (viewSlug) {
          // gunakan view spesifik dengan pagination
          res = await nocodb.dbViewRow.list(projectSlug!, tableSlug!, viewSlug!, fieldSetSlug ?? "", {
            limit: itemsPerPage,
            offset: offset
          })
        } else {
          // fallback ambil row tabel dengan pagination
          res = await nocodb.dbTableRow.list(projectSlug!, tableSlug!, {
            limit: itemsPerPage,
            offset: offset
          })
        }
        // @ts-ignore
        setData(res.list as KolRecord[])
        // @ts-ignore
        setTotalRows(res.pageInfo?.totalRows ?? 0)
      } catch (e: any) {
        console.error(e)
        setError("Gagal mengambil data KOL")
      } finally {
        setLoading(false)
      }
    }
    fetchKol()
  }, [currentPage])

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

  // Buat tabel dinamis berdasarkan kunci object, kecuali kolom id
  const columns = data.length > 0 ? Object.keys(data[0]).filter(col => col !== 'id') : []

  // Hitung total halaman
  const totalPages = Math.ceil(totalRows / itemsPerPage);

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-muted text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-3 py-2 text-left font-medium uppercase tr``acking-wider whitespace-nowrap">
              No
            </th>
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
              <td className="px-3 py-2 whitespace-nowrap">{((currentPage - 1) * itemsPerPage) + idx + 1}</td>
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
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-3">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-muted/50 rounded disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="text-sm">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-muted/50 rounded disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  )
}
