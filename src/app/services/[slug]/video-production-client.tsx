"use client"

import React, { useState } from 'react';
import { Play, Camera, Award, LucideIcon } from 'lucide-react';
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
  
  if (!service) return <div>No service data provided.</div>;

  const stats: StatItem[] = [
    { value: '100+', label: 'Videos Produced', icon: Play },
    { value: '15+', label: 'Industry Awards', icon: Award },
    { value: '4K', label: 'Ultra HD Resolution', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        description={service.description}
        iconName={service.iconName}
        tags={['Creative', 'Production', 'Cinematic']}
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
        title="Ready to Create Stunning Videos?"
        description="Let our creative team produce high-quality videos that captivate your audience and tell your story."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </div>
  );
}
