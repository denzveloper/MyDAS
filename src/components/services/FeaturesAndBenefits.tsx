"use client"

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface FeaturesAndBenefitsProps {
  features?: string[];
  benefits?: string[];
}

export function FeaturesAndBenefits({ features, benefits }: FeaturesAndBenefitsProps) {
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

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Features Accordion */}
      {features && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Key Features</h2>
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <AccordionItem key={index} value={`feature-${index}`} className="border-gray-700">
                <AccordionTrigger className="text-gray-200 hover:text-purple-400">
                  Feature {index + 1}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {feature}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}

      {/* Benefits List */}
      {benefits && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Benefits</h2>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
} 