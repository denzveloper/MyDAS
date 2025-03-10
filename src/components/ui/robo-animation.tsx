"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export function RoboAnimation() {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 rounded-full bg-primary/20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative"
      >
        <Bot className="h-12 w-12 text-primary" />
      </motion.div>
    </div>
  )
} 