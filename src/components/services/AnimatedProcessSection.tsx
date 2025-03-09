"use client"

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Check } from 'lucide-react'

interface ProcessStep {
  title: string;
  description: string;
}

interface AnimatedProcessSectionProps {
  process: ProcessStep[];
}

export function AnimatedProcessSection({ process }: AnimatedProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animation states for steps
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const [visibleConnectors, setVisibleConnectors] = useState<boolean[]>([]);
  
  // Handle animations when section comes into view
  useEffect(() => {
    if (inView) {
      // Animate steps one by one
      const stepTimers = process.map((_, index) => {
        return setTimeout(() => {
          setVisibleSteps(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 200 + (index * 150));
      });
      
      // Animate connectors one by one with delay
      const connectorTimers = process.slice(0, -1).map((_, index) => {
        return setTimeout(() => {
          setVisibleConnectors(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 400 + (index * 150));
      });
      
      return () => {
        stepTimers.forEach(t => clearTimeout(t));
        connectorTimers.forEach(t => clearTimeout(t));
      };
    }
  }, [inView, process.length]);

  return (
    <div ref={ref} className="py-12">
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We follow a proven methodology to implement automation solutions that deliver real results
          </p>
        </div>

        <div className="relative">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div 
                className={`mb-10 flex items-start border border-gray-700 rounded-xl p-6 relative z-10 bg-gray-800/60 backdrop-blur-sm transition-all duration-500 ${visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${activeStep === index ? 'scale-103 shadow-lg border-purple-500/60' : 'scale-100 shadow-none border-gray-700'}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-500/20 border border-purple-500/40 text-purple-400">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              
              {index < process.length - 1 && (
                <div className="absolute left-5 top-16 ml-0.5 w-0.5 h-[calc(100%-1rem)] z-0">
                  <div 
                    className={`bg-gradient-to-b from-purple-500/70 to-purple-500/20 w-full origin-top transition-all duration-700 ${visibleConnectors[index] ? 'h-full' : 'h-0'}`}
                  />
                </div>
              )}
            </div>
          ))}
          
          <div 
            className={`flex items-center justify-center mt-4 transition-all duration-500 ${visibleSteps[process.length-1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500/20 border border-green-500/40">
              <Check className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
