import { CaseStudy } from "@/components/services/CaseStudiesSection";

export const automationCaseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Invoice Processing Automation",
    description: "Streamlining financial operations for a manufacturing company",
    company: "MetalWorks Inc.",
    industry: "Manufacturing",
    challenge: "Manual invoice processing took over 15 hours per week, with frequent errors and delays in payment processing that affected vendor relationships.",
    solution: "We implemented an AI-powered document processing system that automatically captures invoice data, validates against purchase orders, and routes for approval.",
    results: [
      {
        label: "Processing Time",
        before: "4-5 days",
        after: "Same day"
      },
      {
        label: "Error Rate",
        before: "12%",
        after: "< 1%"
      },
      {
        label: "Staff Hours",
        before: "15 hrs/week",
        after: "2 hrs/week"
      }
    ]
  },
  {
    id: "case-2",
    title: "Customer Onboarding Automation",
    description: "Enhancing customer experience for a financial services firm",
    company: "Capital Finance",
    industry: "Financial Services",
    challenge: "Complex customer onboarding process involved 7 different departments and took an average of 2 weeks to complete, leading to customer frustration and drop-offs.",
    solution: "We deployed a centralized workflow automation platform that coordinates tasks across departments and provides real-time status updates to customers.",
    results: [
      {
        label: "Onboarding Time",
        before: "14 days",
        after: "3 days"
      },
      {
        label: "Customer Satisfaction",
        before: "65%",
        after: "94%"
      },
      {
        label: "Conversion Rate",
        before: "48%",
        after: "83%"
      }
    ]
  },
  {
    id: "case-3",
    title: "Supply Chain Process Automation",
    description: "Optimizing inventory and order management",
    company: "Global Retail Corp",
    industry: "Retail",
    challenge: "Fragmented supply chain processes across 12 warehouses led to inventory discrepancies, stockouts, and excessive manual reconciliation work.",
    solution: "We implemented an end-to-end supply chain automation system with real-time inventory tracking, predictive ordering, and exception-based alerts.",
    results: [
      {
        label: "Inventory Accuracy",
        before: "83%",
        after: "99.5%"
      },
      {
        label: "Stockout Rate",
        before: "7.2%",
        after: "1.8%"
      },
      {
        label: "Labor Cost",
        before: "$240K/yr",
        after: "$80K/yr"
      }
    ]
  }
];
