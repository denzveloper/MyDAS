"use client";

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Zap, BarChart, TrendingUp, Award, Users } from "lucide-react"

interface FeatureTab {
  id: string
  title: string
  description: string
  icon: React.ElementType
  benefits: string[]
  image: string
}

const features: FeatureTab[] = [
  {
    id: "digital-automation",
    title: "Digital Automation",
    description: "Streamline your business processes with our cutting-edge automation solutions that save time and reduce errors.",
    icon: Zap,
    benefits: [
      "Reduce manual tasks by up to 80%",
      "Improve data accuracy and consistency",
      "Scale operations without increasing headcount",
      "Gain real-time insights into business processes"
    ],
    image: "automation.jpg" // This would be a real image in production
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: "Drive measurable results with data-driven marketing strategies tailored to your business goals.",
    icon: TrendingUp,
    benefits: [
      "Increase ROI on marketing spend",
      "Target high-value customer segments",
      "Optimize campaigns in real-time",
      "Track and attribute conversions accurately"
    ],
    image: "marketing.jpg" // This would be a real image in production
  },
  {
    id: "brand-development",
    title: "Brand Development",
    description: "Build a compelling brand identity that resonates with your audience and stands out in the market.",
    icon: Award,
    benefits: [
      "Create a cohesive visual identity",
      "Develop a consistent brand voice",
      "Increase brand recognition and recall",
      "Build emotional connections with customers"
    ],
    image: "branding.jpg" // This would be a real image in production
  },
  {
    id: "user-experience",
    title: "User Experience",
    description: "Create intuitive, engaging user experiences that convert visitors into loyal customers.",
    icon: Users,
    benefits: [
      "Reduce bounce rates and increase time on site",
      "Improve conversion rates across all devices",
      "Enhance customer satisfaction and loyalty",
      "Create accessible experiences for all users"
    ],
    image: "ux.jpg" // This would be a real image in production
  },
];

export function FeaturesTab() {
  const [activeTab, setActiveTab] = useState(features[0].id)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  // Add animation cycle
  const [animationCycle, setAnimationCycle] = useState(0)
  
  useEffect(() => {
    // Trigger animation refresh when tab changes
    setAnimationCycle(prev => prev + 1)
  }, [activeTab])

  // Get active feature
  const activeFeature = features.find((feature) => feature.id === activeTab) || features[0]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
  
  const floatingVariants = {
    hidden: { y: 0 },
    animate: { 
      y: [-15, 0, -15],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={ref} 
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden min-h-[1050px]"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Our Core Solutions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover how our comprehensive suite of services can transform your digital presence
          </p>
        </motion.div>

        <Tabs defaultValue={features[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full min-h-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 lg:gap-2 w-full max-w-4xl mx-auto mb-12 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="relative flex flex-col py-4 px-2 items-center space-y-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary rounded-lg transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                      className="relative"
                    >
                      {activeTab === feature.id && (
                        <motion.div
                          className="absolute -inset-1 rounded-full bg-primary/10"
                          layoutId="iconBackground"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className="h-6 w-6 relative z-10" />
                    </motion.div>
                    <span className="text-sm font-medium">{feature.title}</span>
                    {activeTab === feature.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500"
                        layoutId="activeTabIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${animationCycle}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <TabsContent value={activeFeature.id} className="mt-0">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0 h-[600px]">
                    {/* Feature content */}
                    <motion.div 
                      className="p-8 flex flex-col justify-center"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 text-primary"
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -10, 10, -5, 0],
                          transition: { duration: 0.6 }
                        }}
                      >
                        <activeFeature.icon className="h-8 w-8" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
                        variants={itemVariants}
                      >
                        {activeFeature.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-600 dark:text-gray-400 mb-6"
                        variants={itemVariants}
                      >
                        {activeFeature.description}
                      </motion.p>
                      
                      <motion.h4 
                        className="font-semibold mb-3 text-lg"
                        variants={itemVariants}
                      >
                        Key Benefits:
                      </motion.h4>
                      
                      <ul className="space-y-3">
                        {activeFeature.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="bg-green-100 dark:bg-green-900/30 rounded-full p-1"
                            >
                              <Check className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                            </motion.div>
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    {/* Feature image/visualization */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 flex items-center justify-center overflow-hidden relative">
                      {/* Decorative elements */}
                      <motion.div 
                        className="absolute top-12 right-12 w-24 h-24 bg-primary/5 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          x: [0, 10, 0],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      
                      <motion.div 
                        className="absolute bottom-12 left-12 w-32 h-32 bg-blue-500/5 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          y: [0, 10, 0],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />
                      
                      <motion.div
                        variants={floatingVariants}
                        initial="hidden"
                        animate="animate"
                        className="relative z-10 w-full h-full min-h-[300px] rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-500/10 border border-white/20 dark:border-gray-700/20 shadow-inner"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="relative flex items-center justify-center"
                        >
                          {/* Animated icon */}
                          <motion.div
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 0.95, 1]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                          >
                            <activeFeature.icon className="h-24 w-24 text-primary opacity-80" />
                          </motion.div>
                          
                          {/* Decorative text */}
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center font-bold overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            <span className="text-4xl font-extrabold tracking-wider text-primary/10 dark:text-white/5">
                              {activeFeature.title.split(" ")[0]}
                            </span>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
} 