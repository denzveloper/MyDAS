"use client"

import { motion } from 'framer-motion';

interface OverviewSectionProps {
  description?: string;
}

export function OverviewSection({ description }: OverviewSectionProps) {
  if (!description) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-gray-800 p-8 rounded-xl border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Overview</h2>
      <div className="text-lg text-gray-300 leading-relaxed">{description}</div>
    </motion.div>
  );
} 