"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Separator } from "@/components/ui/separator"
import { Award, BarChart, Building, Globe, Users } from "lucide-react"
import { useState, useEffect } from "react"

// Mock client data
const clients = [
  { id: 1, name: "Acme Corp", logo: "A" },
  { id: 2, name: "Globex", logo: "G" },
  { id: 3, name: "Soylent", logo: "S" },
  { id: 4, name: "Initech", logo: "I" },
  { id: 5, name: "Umbrella", logo: "U" },
  { id: 6, name: "Stark Industries", logo: "S" },
  { id: 7, name: "Cyberdyne", logo: "C" },
  { id: 8, name: "Wayne Enterprises", logo: "W" },
]

// Stats with animated counters
const stats = [
  { 
    icon: Globe, 
    value: 50, 
    label: "Countries Reached", 
    prefix: "", 
    suffix: "+" 
  },
  { 
    icon: Users, 
    value: 200, 
    label: "Happy Clients", 
    prefix: "", 
    suffix: "+" 
  },
  { 
    icon: Award, 
    value: 15, 
    label: "Industry Awards", 
    prefix: "", 
    suffix: "" 
  },
  { 
    icon: BarChart, 
    value: 300, 
    label: "ROI Average", 
    prefix: "", 
    suffix: "%" 
  },
]

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) {
      const duration = 2000 // animation duration in ms
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      
      let frame = 0
      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        // Use easeOutQuad easing function for natural animation
        const easeProgress = progress * (2 - progress)
        setCount(Math.floor(easeProgress * value))
        
        if (frame === totalFrames) {
          clearInterval(counter)
          setCount(value)
        }
      }, frameDuration)
      
      return () => clearInterval(counter)
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-3xl font-bold text-primary">
      {prefix}{count}{suffix}
    </div>
  )
}

export function ClientShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We've helped companies of all sizes transform their digital presence and achieve remarkable results.
          </p>
        </motion.div>

        {/* Client logo carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll hover:[animation-play-state:paused]">
              {/* First set of client logos */}
              <div className="flex items-center justify-around min-w-full gap-8 px-4">
                {clients.map((client) => (
                  <motion.div 
                    key={client.id}
                    className="h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mx-2 flex-shrink-0 w-[180px]"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
                      borderColor: "var(--primary)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold text-primary">{client.logo}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">{client.name}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Duplicated set for seamless looping */}
              <div className="flex items-center justify-around min-w-full gap-8 px-4">
                {clients.map((client) => (
                  <motion.div 
                    key={`dup-${client.id}`}
                    className="h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mx-2 flex-shrink-0 w-[180px]"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
                      borderColor: "var(--primary)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-bold text-primary">{client.logo}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">{client.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <Separator className="my-12" />

        {/* Stats with animated counters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              whileHover={{ y: -5 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-12 w-12 text-primary mb-4" />
              </motion.div>
              <AnimatedCounter 
                value={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
              />
              <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 