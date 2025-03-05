"use client";

import { useState } from "react"
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

  // Get active feature
  const activeFeature = features.find((feature) => feature.id === activeTab) || features[0]

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Solutions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover how our comprehensive suite of services can transform your digital presence
          </p>
        </motion.div>

        <Tabs defaultValue={features[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl mx-auto mb-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="relative flex flex-col py-4 items-center space-y-2 data-[state=active]:text-primary"
                  >
                    <Icon className="h-6 w-6" />
                    <span>{feature.title}</span>
                    {activeTab === feature.id && (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
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
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value={activeFeature.id} className="mt-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Feature content */}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        <activeFeature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{activeFeature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeFeature.description}</p>
                      
                      <h4 className="font-semibold mb-3 text-lg">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {activeFeature.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Feature image/visualization */}
                    <div className="bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-blue-500/20"
                      >
                        {/* In a real project, this would be a proper image */}
                        <activeFeature.icon className="h-24 w-24 text-primary opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary/20">
                          {activeFeature.title} Visualization
                        </div>
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