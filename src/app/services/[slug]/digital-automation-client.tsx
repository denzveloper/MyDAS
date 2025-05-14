"use client"

import React, { useState } from 'react';
import { Zap, BarChart, Clock, LucideIcon } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ServiceHero } from "@/components/services/ServiceHero";
import { StatsSection } from "@/components/services/StatsSection";
import { OverviewSection } from "@/components/services/OverviewSection";
import { FeaturesAndBenefits } from "@/components/services/FeaturesAndBenefits";
import { ProcessSection } from "@/components/services/ProcessSection";
import { CTASection } from "@/components/shared/CTASection";
import { CaseStudiesSection } from "@/components/services/CaseStudiesSection";
import { AnimatedProcessSection } from "@/components/services/AnimatedProcessSection";
import { ROICalculator } from "@/components/services/ROICalculator";
import { automationCaseStudies } from "@/lib/data/case-studies";

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
  
  if (!service) return <div>No service data provided.</div>;

  const stats: StatItem[] = [
    { value: '85%', label: 'Efficiency Improvement', icon: Zap },
    { value: '50%', label: 'Cost Reduction', icon: BarChart },
    { value: '24/7', label: 'Operation Capability', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        description={service.description}
        iconName={service.iconName}
        tags={['Efficiency', 'Automation', 'Digital Transformation']}
      />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800 text-gray-300">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features & Benefits</TabsTrigger>
            <TabsTrigger value="process">Our Process</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <OverviewSection description={service.longDescription} />
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <FeaturesAndBenefits features={service.features} benefits={service.benefits} />
          </TabsContent>

          <TabsContent value="process" className="mt-4">
            <ProcessSection process={service.process} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Case Studies Section */}
      <CaseStudiesSection caseStudies={automationCaseStudies} />
      
      {/* ROI Calculator */}
      <ROICalculator />

      {/* CTA Section */}
      <CTASection 
        title="Ready to Automate Your Business Processes?"
        description="Let our technology experts optimize your operations with smart automation solutions."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </div>
  );
} 