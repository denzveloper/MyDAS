"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { services } from "@/lib/data/services"
import { useSpring, animated } from '@react-spring/web'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const chevronSpring = useSpring({
    transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 20 }
  })
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
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
            <Link 
              href="/" 
              className="relative font-bold text-2xl group overflow-hidden"
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const target = e.currentTarget.querySelector('.shimmer-effect') as HTMLElement;
                if (target) {
                  target.style.opacity = '0.7';
                  target.style.animation = 'shimmer 2.5s linear infinite';
                }
                const textTarget = e.currentTarget.querySelector('.gold-text-effect') as HTMLElement;
                if (textTarget) {
                  textTarget.style.animation = 'shine 1.5s ease-in-out infinite';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                const target = e.currentTarget.querySelector('.shimmer-effect') as HTMLElement;
                if (target) {
                  target.style.opacity = '0';
                  target.style.animation = 'none';
                }
                const textTarget = e.currentTarget.querySelector('.gold-text-effect') as HTMLElement;
                if (textTarget) {
                  textTarget.style.animation = 'subtle-pulse 3s ease infinite';
                }
              }}
            >
              <span className="relative z-10 gold-text-effect" style={{
                background: 'linear-gradient(to right, #f9d423 0%, #e6b422 25%, #f9d423 50%, #e2a90c 75%, #f9d423 100%)',
                backgroundSize: '200% auto',
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'subtle-pulse 3s ease infinite'
              }}>MIDAS</span>
              <span 
                className="absolute inset-0 shimmer-effect" 
                style={{
                  background: 'linear-gradient(to right, #f9d423 0%, #e6b422 25%, #f9d423 50%, #e2a90c 75%, #f9d423 100%)',
                  opacity: 0,
                  maskImage: 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.7) 50%, transparent 75%)',
                  maskSize: '200% 100%',
                  WebkitMaskImage: 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.7) 50%, transparent 75%)',
                  WebkitMaskSize: '200% 100%',
                  transition: 'opacity 0.3s ease'
                }}
              ></span>
            </Link>
          </motion.div>
          
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Services Dropdown */}
            <motion.div
              ref={servicesRef}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <div className="flex items-center cursor-pointer text-gray-200 hover:text-primary transition-colors">
                <span>Services</span>
                <animated.div style={chevronSpring} className="ml-1">
                  <ChevronDown size={16} />
                </animated.div>
              </div>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      {Object.entries(services).map(([slug, service]: [string, { title: string }]) => (
                        <Link 
                          key={slug}
                          href={`/services/${slug}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Other Nav Items */}
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
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
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative group p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget.querySelector('span');
                  if (target) {
                    target.style.opacity = '0.3';
                    target.style.animation = 'shimmer 2.5s linear infinite';
                  }
                  const iconTarget = e.currentTarget.querySelector('svg');
                  if (iconTarget) {
                    iconTarget.style.animation = 'shine 1.5s ease-in-out infinite';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget.querySelector('span');
                  if (target) {
                    target.style.opacity = '0';
                    target.style.animation = 'none';
                  }
                  const iconTarget = e.currentTarget.querySelector('svg');
                  if (iconTarget) {
                    iconTarget.style.animation = 'none';
                  }
                }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 group-hover:opacity-100" style={{
                    color: 'transparent',
                    background: 'linear-gradient(to right, #f9d423 0%, #e6b422 25%, #f9d423 50%, #e2a90c 75%, #f9d423 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }} />
                ) : (
                  <Menu className="h-6 w-6 group-hover:opacity-100" style={{
                    color: 'transparent',
                    background: 'linear-gradient(to right, #f9d423 0%, #e6b422 25%, #f9d423 50%, #e2a90c 75%, #f9d423 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }} />
                )}
                <span 
                  className="absolute inset-0 rounded-md" 
                  style={{
                    background: 'linear-gradient(to right, #f9d423 0%, #e6b422 25%, #f9d423 50%, #e2a90c 75%, #f9d423 100%)',
                    opacity: 0,
                    maskImage: 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.7) 50%, transparent 75%)',
                    maskSize: '200% 100%',
                    WebkitMaskImage: 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.7) 50%, transparent 75%)',
                    WebkitMaskSize: '200% 100%',
                    transition: 'opacity 0.3s ease'
                  }}></span>
              </motion.button>
            </div>
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
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
            {/* Services Section */}
            <div className="block px-3 py-2 text-gray-300 font-medium">
              Services
            </div>
            <div className="pl-4 space-y-1">
              {Object.entries(services).map(([slug, service]) => (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={`/services/${slug}`} 
                    className="block text-gray-400 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    {service.title}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Other Nav Items */}
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