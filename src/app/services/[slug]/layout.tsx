"use client"

import React from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

interface ServiceLayoutProps {
  children: React.ReactNode;
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <div className="bg-gray-950 min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
} 