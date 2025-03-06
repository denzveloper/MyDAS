"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Zap, 
  BarChart, 
  Clock, 
  ChevronDown,
  LucideIcon,
  Menu,
  X,
  Bot,
  Brain,
  Video,
  Palette,
  LineChart,
  Users,
  Megaphone
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

interface DigitalAutomationClientProps {
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

export default function DigitalAutomationClient({ service }: DigitalAutomationClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!service) return <div>No service data provided.</div>;

  const IconComponent = getIconComponent(service.iconName);

  const stats: StatItem[] = [
    { value: '85%', label: 'Efficiency Improvement', icon: Zap },
    { value: '50%', label: 'Cost Reduction', icon: BarChart },
    { value: '24/7', label: 'Operation Capability', icon: Clock },
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">Efficiency</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">Automation</span>
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">Digital Transformation</span>
              </div>
            </div>
            <motion.div 
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="hidden md:flex rounded-lg bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 p-8"
            >
              <IconComponent className="h-24 w-24 text-yellow-400" />
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
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-gray-800 border-gray-700 hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white text-2xl font-bold">{stat.value}</CardTitle>
                    <stat.icon className="h-8 w-8 text-yellow-400 opacity-80" />
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
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
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
                  variants={fadeInLeft}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                  key={`features-${activeTab}`}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6"
                >
                  <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <span className="mr-2">Key Features</span>
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.features.map((feature, index) => (
                      <AccordionItem key={index} value={`feature-${index}`} className="border-gray-700">
                        <AccordionTrigger className="text-lg text-white hover:text-yellow-400 transition-colors py-4">
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
                  variants={fadeInRight}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6"
                >
                  <h2 className="text-2xl font-bold mb-6 text-white">Key Benefits</h2>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
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
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                key={`process-${activeTab}`}
                className="bg-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-8 text-white">Our Process</h2>
                <div className="space-y-12">
                  {service.process.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Process step number */}
                      <div className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-xl">
                        {index + 1}
                      </div>
                      
                      <div className="ml-8 pl-4 border-l-2 border-yellow-400/30">
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
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Let us help you automate your business processes and drive efficiency across your organization.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 