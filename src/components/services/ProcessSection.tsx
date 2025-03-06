"use client"

import { motion } from 'framer-motion';

interface ProcessItem {
  title: string;
  description: string;
}

interface ProcessSectionProps {
  process?: ProcessItem[];
}

export function ProcessSection({ process }: ProcessSectionProps) {
  if (!process || process.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-xl border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-8 text-white">Our Process</h2>
      <div className="relative">
        {process.map((step, index) => (
          <div key={index} className="mb-12 last:mb-0 relative pl-8 md:pl-10">
            {/* Step number circle */}
            <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-purple-400/20 text-purple-400 font-bold text-sm">
              {index + 1}
            </div>
            {/* Line connecting steps */}
            {index < process.length - 1 && (
              <div className="absolute left-3.5 top-7 h-full w-0.5 bg-gray-700" />
            )}
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 