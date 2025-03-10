"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingPaperProps {
  count?: number
  className?: string
}

export function FloatingPaper({ count = 5, className = "" }: FloatingPaperProps) {
  const [papers, setPapers] = useState<{ id: number; x: number; y: number; rotation: number; scale: number; duration: number }[]>([])
  
  useEffect(() => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    
    const handleResize = () => {
      const newPapers = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight * 0.8,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 15
      }))
      setPapers(newPapers)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [count])
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {papers.map((paper) => (
        <motion.div
          key={paper.id}
          className="absolute w-16 h-20 bg-white/5 rounded-md border border-white/10 shadow-lg"
          initial={{ 
            x: paper.x, 
            y: paper.y, 
            rotate: paper.rotation,
            scale: paper.scale
          }}
          animate={{ 
            y: [paper.y, paper.y + 100, paper.y],
            rotate: [paper.rotation, paper.rotation + 10, paper.rotation - 10, paper.rotation],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: paper.duration,
            ease: "linear"
          }}
        >
          <div className="h-2 w-8 bg-white/20 rounded-full m-2"></div>
          <div className="h-1 w-12 bg-white/10 rounded-full mx-2"></div>
          <div className="h-1 w-10 bg-white/10 rounded-full m-2"></div>
          <div className="h-1 w-6 bg-white/10 rounded-full mx-2"></div>
          <div className="h-1 w-8 bg-white/10 rounded-full m-2"></div>
        </motion.div>
      ))}
    </div>
  )
} 