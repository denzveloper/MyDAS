"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, MousePointer } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { FloatingPaper } from "@/components/ui/floating-paper"
import { RoboAnimation } from "@/components/ui/robo-animation"
import { useScrollPosition } from "@/hooks/useScrollPosition"

export function Hero() {
  // Add a client-side loading state
  const [isClient, setIsClient] = useState(false)
  
  // Set isClient to true after component mounts to ensure we're running in the browser
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  const scrollY = useScrollPosition()
  
  // Threshold where animation completes
  const scrollThreshold = 800
  
  // Calculate progress (0 to 1)
  const progress = Math.min(1, scrollY / scrollThreshold)
  
  // Apply easing for acceleration effect (cubic easing)
  const easedProgress = progress * progress * progress
  
  // Calculate opacity
  const opacity = Math.max(0, 1 - progress * 1.5)
  
  // Calculate transform - accelerating away effect
  const translateY = -easedProgress * 300 // pixels to move up
  
  // If not client-side yet, render a simple placeholder with the same dimensions
  if (!isClient) {
    return (
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[60vh] flex items-center justify-center">
            {/* Pre-render static content for SEO, but hidden until client-side hydration */}
            <div className="animate-pulse w-full">
              <div className="h-32 w-32 bg-primary/20 rounded-full mx-auto mb-8"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md w-4/5 mx-auto mb-6"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 mx-auto mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 w-40 bg-primary/20 rounded-md mx-auto"></div>
                <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-md mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section 
      ref={ref} 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ 
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
        willChange: 'transform, opacity' // optimization for smoother animations
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      {/* Sparkles animation */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.2}
          particleDensity={70}
          className="w-full h-full"
          particleColor="hsl(var(--primary))"
        />
      </div>
      
      {/* Floating papers */}
      <FloatingPaper count={8} className="-z-10" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10"
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <RoboAnimation />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Transform Your Digital Presence with{" "}
              <motion.span 
                className="text-primary inline-block"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                MIDAS
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your partner in digital automation, branding, and performance marketing.
            We turn your vision into measurable success.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button size="lg" className="text-lg group">
              Get Started
              <motion.span 
                className="inline-block ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              View Our Work
            </Button>
          </motion.div>
          
          {/* Animated scroll indicator */}
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
              <MousePointer className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 