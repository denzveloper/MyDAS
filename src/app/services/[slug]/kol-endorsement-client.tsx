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
  Star,
  TrendingUp
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

interface KOLEndorsementClientProps {
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

export default function KOLEndorsementClient({ service }: KOLEndorsementClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!service) return <div>No service data provided.</div>;

  const IconComponent = getIconComponent(service.iconName);

  const stats: StatItem[] = [
    { value: '5x', label: 'Audience Reach Expansion', icon: TrendingUp },
    { value: '70%', label: 'Trust Increase', icon: Star },
    { value: '45%', label: 'Conversion Rate', icon: BarChart },
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
                <span className="text-pink-400 font-bold text-2xl">MIDAS</span>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/#services" className="text-pink-400 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium">
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
              <Link href="/#services" className="block text-pink-400 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-400">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-pink-400/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">Influence</span>
                <span className="bg-pink-400/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">Reach</span>
                <span className="bg-pink-400/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">Authenticity</span>
              </div>
            </div>
            <motion.div 
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="hidden md:flex rounded-lg bg-gradient-to-br from-pink-400/30 to-pink-500/20 p-8"
            >
              <IconComponent className="h-24 w-24 text-pink-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-gray-800 border-gray-700 hover:border-pink-400/50 transition-all hover:shadow-lg hover:shadow-pink-400/10">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white text-2xl font-bold">{stat.value}</CardTitle>
                    <stat.icon className="h-8 w-8 text-pink-400 opacity-80" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base">{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800 text-gray-300">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features & Benefits</TabsTrigger>
            <TabsTrigger value="process">Our Process</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            {service.longDescription && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 bg-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Overview</h2>
                <div className="text-lg text-gray-300 leading-relaxed">{service.longDescription}</div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Features Accordion */}
              {service.features && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6"
                >
                  <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <span className="mr-2">Key Features</span>
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.features.map((feature, index) => (
                      <AccordionItem key={index} value={`feature-${index}`} className="border-gray-700">
                        <AccordionTrigger className="text-lg text-white hover:text-pink-400 transition-colors py-4">
                          {feature.split(':')[0]}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 pt-2 pb-4">
                          {feature.split(':')[1] || feature}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}

              {/* Benefits List */}
              {service.benefits && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6"
                >
                  <h2 className="text-2xl font-bold mb-6 text-white">Key Benefits</h2>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-pink-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-4">
            {service.process && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-8 text-white">Our Process</h2>
                <div className="space-y-12">
                  {service.process.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Process step number */}
                      <div className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-pink-400 flex items-center justify-center text-gray-900 font-bold text-xl">
                        {index + 1}
                      </div>
                      
                      <div className="ml-8 pl-4 border-l-2 border-pink-400/30">
                        <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Amplify Your Brand?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Connect with influential voices that resonate with your target audience.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-pink-400 hover:bg-pink-500 text-gray-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-pink-400 font-bold text-xl">MIDAS</span>
              <p className="text-gray-400 text-sm mt-1">Your partner in digital transformation</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MIDAS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 