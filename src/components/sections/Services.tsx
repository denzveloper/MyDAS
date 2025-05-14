"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Video, Palette, LineChart, Users, Megaphone, Brain, LucideIcon } from "lucide-react"
import Link from "next/link"
import { services } from "@/lib/data/services"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { getIconComponent } from "@/lib/utils/icons"
import { useSpring, animated, config } from '@react-spring/web'
import { useState } from 'react'

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const getIconSpring = (slug: string) => useSpring({
    transform: hoveredIcon === slug 
      ? 'rotate(5deg) scale(1.08)' 
      : 'rotate(0deg) scale(1)',
    config: { tension: 300, friction: 20 }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  }

  return (
    <section id="services" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive digital solutions to elevate your brand and drive growth
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {Object.entries(services).map(([slug, service]: [string, { title: string, description: string, iconName: string }], index) => {
            const Icon = getIconComponent(service.iconName);
            const iconSpring = getIconSpring(slug);
            
            return (
              <motion.div 
                key={slug}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Link href={`/services/${slug}`}>
                  <Card className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer h-full overflow-hidden group">
                    <CardHeader>
                      <animated.div
                        style={iconSpring}
                        onMouseEnter={() => setHoveredIcon(slug)}
                        onMouseLeave={() => setHoveredIcon(null)}
                      >
                        <Icon className="h-12 w-12 text-primary mb-4" />
                      </animated.div>
                      <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.p 
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Click to learn more 
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="ml-1"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </motion.svg>
                      </motion.p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 