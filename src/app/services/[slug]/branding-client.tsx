"use client"

import React, { useState } from 'react';
import { BarChart, CheckCircle, Clock, LucideIcon } from 'lucide-react';
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

interface BrandingClientProps {
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

export default function BrandingClient({ service }: BrandingClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!service) return <div>No service data provided.</div>;

  const stats: StatItem[] = [
    { value: '90%', label: 'Brand Recognition Increase', icon: BarChart },
    { value: '75%', label: 'Customer Loyalty Improvement', icon: CheckCircle },
    { value: '60%', label: 'Market Differentiation', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        description={service.description}
        iconName={service.iconName}
        tags={['Identity', 'Design', 'Strategy']}
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

      {/* CTA Section */}
      <CTASection 
        title="Ready to Build a Memorable Brand?"
        description="Let our creative team craft a strong, distinctive identity that resonates with your audience."
        buttonText="Get In Touch"
        buttonLink="/contact"
      />
    </div>
  );
} 