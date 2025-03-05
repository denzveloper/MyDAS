"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ParallaxSection() {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Parallax effect for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  
  return (
    <section 
      ref={ref}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-black/70 z-10" />
      
      {/* Parallax background circles */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl top-10 left-20 -z-10"
      />
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute w-64 h-64 rounded-full bg-blue-500/20 blur-3xl bottom-20 right-20 -z-10"
      />
      
      <motion.div 
        style={{ y: y3 }}
        className="absolute w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl bottom-40 left-40 -z-10"
      />
      
      {/* Content that fades and scales with scroll */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-20 text-center max-w-4xl mx-auto px-4 text-white"
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Vision Into Reality
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our team of experts will help you build a digital presence that stands out and delivers results.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" className="text-lg">
            Start Your Journey
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-blue-500 rounded-full"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-yellow-500 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  )
} 