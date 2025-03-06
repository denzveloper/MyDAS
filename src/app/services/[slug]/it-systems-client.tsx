"use client"

import React, { useState } from 'react';
import { Server, Shield, Cpu, LucideIcon } from 'lucide-react';
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

interface ITSystemsClientProps {
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

export default function ITSystemsClient({ service }: ITSystemsClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!service) return <div>No service data provided.</div>;

  const stats: StatItem[] = [
    { value: '99.9%', label: 'System Uptime', icon: Server },
    { value: '100%', label: 'Security Compliance', icon: Shield },
    { value: '70%', label: 'Performance Boost', icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        description={service.description}
        iconName={service.iconName}
        tags={['Infrastructure', 'Security', 'Performance']}
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
        title="Ready to Upgrade Your IT Infrastructure?"
        description="Let our IT experts build reliable, secure, and high-performance systems for your business."
        buttonText="Schedule a Consultation"
        buttonLink="/contact"
      />
    </div>
  );
} 