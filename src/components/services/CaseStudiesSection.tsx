"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    before: string;
    after: string;
  }[];
  logoSrc?: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverNav, setHoverNav] = useState<string | null>(null);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleResults, setVisibleResults] = useState<boolean[]>([]);
  
  // Get the active case study
  const activeCase = caseStudies[activeIndex] || caseStudies[0];
  
  // Handle case study change animations
  useEffect(() => {
    if (!activeCase) return;
    
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    // Reset result animations
    setVisibleResults([]);
    const resultTimers = activeCase.results.map((_, index) => {
      return setTimeout(() => {
        setVisibleResults(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 300 + (index * 150));
    });
    
    return () => {
      clearTimeout(timer);
      resultTimers.forEach(t => clearTimeout(t));
    };
  }, [activeIndex, activeCase?.results?.length]);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };
  
  if (!activeCase) return null;
  
  return (
    <div className="py-12 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Case Studies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our automation solutions have transformed operations for real businesses
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-purple-400">
            {activeCase.title}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              onMouseEnter={() => setHoverNav('left')}
              onMouseLeave={() => setHoverNav(null)}
              className={`p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 ${hoverNav === 'left' ? 'scale-110 -translate-x-0.5' : 'scale-100 translate-x-0'}`}
            >
              <ChevronLeft className="h-6 w-6 text-gray-300" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNav('right')}
              onMouseLeave={() => setHoverNav(null)}
              className={`p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 ${hoverNav === 'right' ? 'scale-110 translate-x-0.5' : 'scale-100 translate-x-0'}`}
            >
              <ChevronRight className="h-6 w-6 text-gray-300" />
            </button>
          </div>
        </div>
        
        <div 
          className={`bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`}
          key={activeCase.id}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-center mb-4">
                {activeCase.logoSrc && (
                  <div className="w-12 h-12 mr-4 rounded bg-white p-2">
                    {/* Replace with actual image once available */}
                    <div className="w-full h-full bg-purple-400 rounded-sm"></div>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-white">{activeCase.company}</h4>
                  <p className="text-sm text-gray-400">{activeCase.industry}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2">The Challenge</h5>
                <p className="text-gray-300">{activeCase.challenge}</p>
              </div>
              
              <div>
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Our Solution</h5>
                <p className="text-gray-300">{activeCase.solution}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-900 p-6 md:p-8">
              <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Results</h5>
              
              <div className="space-y-6">
                {activeCase.results.map((result, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 gap-2 transition-all duration-300 ${visibleResults[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  >
                    <div className="col-span-1">
                      <p className="text-sm text-gray-400">{result.label}</p>
                    </div>
                    <div className="col-span-2 flex justify-between">
                      <div className="text-center px-3 py-2 rounded bg-red-900/30">
                        <p className="text-sm text-gray-400">Before</p>
                        <p className="font-semibold text-red-400">{result.before}</p>
                      </div>
                      <div className="text-center px-3 py-2 rounded bg-green-900/30">
                        <p className="text-sm text-gray-400">After</p>
                        <p className="font-semibold text-green-400">{result.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-purple-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
