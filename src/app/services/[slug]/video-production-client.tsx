"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  BarChart, 
  Clock, 
  ChevronDown,
  Menu,
  X,
  Bot,
  Brain,
  Video,
  Palette,
  LineChart,
  Users,
  Megaphone,
  LucideIcon,
  Film,
  Award
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getIconComponent } from "@/lib/utils/icons"

interface VideoProductionClientProps {
  service: {
    title: string;
    description: string;
    iconName: string;
    longDescription?: string;
    features?: string[];
    benefits?: string[];
    process?: { title: string; description: string }[];
  };
}

type StatItem = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export default function VideoProductionClient({ service }: VideoProductionClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!service) return <div>No service data provided.</div>;

  const IconComponent = getIconComponent(service.iconName);

  const stats: StatItem[] = [
    { value: '95%', label: 'Client Satisfaction', icon: Award },
    { value: '2x', label: 'Engagement Increase', icon: Film },
    { value: '70%', label: 'Conversion Improvement', icon: BarChart },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    show: { 
      opacity: 1, 
      x: 0,
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
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-red-400 font-bold text-2xl">MIDAS</span>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/#services" className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </Link>
                  <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </Link>
                  <Link href="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Portfolio
                  </Link>
                  <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 py-2 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/#services" className="block text-red-400 hover:text-red-300 px-3 py-2 rounded-md text-base font-medium">
                Services
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                About
              </Link>
              <Link href="/portfolio" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Portfolio
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-400">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">Cinematic</span>
                <span className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">Engaging</span>
                <span className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">Professional</span>
              </div>
            </div>
            <motion.div 
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="hidden md:flex rounded-lg bg-gradient-to-br from-red-400/30 to-red-500/20 p-8"
            >
              <IconComponent className="h-24 w-24 text-red-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
