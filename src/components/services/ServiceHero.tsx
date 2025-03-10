"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getIconComponent } from "@/lib/utils/icons";

interface ServiceHeroProps {
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export function ServiceHero({ title, description, iconName, tags }: ServiceHeroProps) {
  const IconComponent = getIconComponent(iconName);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
        <Link
          href="/#services"
          className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>

        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="md:max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{description}</p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <span key={index} className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="hidden md:flex rounded-lg bg-gradient-to-br from-purple-400/30 to-purple-500/20 p-8"
          >
            <IconComponent className="h-24 w-24 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 