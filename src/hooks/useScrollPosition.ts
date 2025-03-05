"use client"

import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Call handler right away to update scroll position
    handleScroll()
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
} 