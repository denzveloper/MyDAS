"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 50) {
      setIsScrolled(true)
    } else if (latest < previous && latest < 50) {
      setIsScrolled(false)
    }
  })

  const navVariants = {
    visible: { 
      y: 0, 
      backgroundColor: isScrolled ? "rgba(2, 6, 23, 0.8)" : "transparent",
      backdropFilter: isScrolled ? "blur(10px)" : "none",
      boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
      borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      transition: { 
        y: { duration: 0.3 },
        backgroundColor: { duration: 0.3 }
      }
    },
    hidden: { 
      y: -100,
      transition: { duration: 0.3 }
    }
  }
  
  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]
  
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 py-4"
      variants={navVariants}
      initial="visible"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold text-white">
              MIDAS
            </Link>
          </motion.div>
          
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  href={item.href} 
                  className="text-gray-200 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button>Get Started</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 py-2 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link 
                  href={item.href} 
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
} 