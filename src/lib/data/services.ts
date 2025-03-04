import { Bot, Video, Palette, LineChart, Users, Megaphone, Brain } from "lucide-react"
import { type Service } from "../types/service"

export const services: Record<string, Service> = {
  "digital-automation": {
    title: "Digital Automation",
    description: "Streamline your operations with cutting-edge automation solutions",
    icon: Bot,
    longDescription: "Transform your business operations with our state-of-the-art digital automation solutions. We help organizations reduce manual work, minimize errors, and increase efficiency through intelligent automation.",
    features: [
      "Workflow Automation",
      "Process Optimization",
      "Custom Automation Solutions",
      "Integration Services",
      "RPA Implementation",
      "AI-Powered Automation"
    ],
    benefits: [
      "Increased Operational Efficiency",
      "Reduced Human Error",
      "Cost Savings",
      "Improved Customer Experience",
      "Scalable Solutions",
      "24/7 Operation Capability"
    ],
    process: [
      {
        title: "Assessment",
        description: "We analyze your current processes and identify automation opportunities"
      },
      {
        title: "Strategy",
        description: "Develop a comprehensive automation roadmap aligned with your goals"
      },
      {
        title: "Implementation",
        description: "Deploy and integrate automation solutions seamlessly"
      },
      {
        title: "Optimization",
        description: "Continuous monitoring and improvement of automated processes"
      }
    ]
  },
  "it-systems": {
    title: "IT Systems",
    description: "Custom IT solutions designed to scale with your business",
    icon: Brain,
    longDescription: "Empower your business with robust, scalable IT systems tailored to your specific needs. We design and implement solutions that drive efficiency and growth.",
    features: [
      "Custom Software Development",
      "System Integration",
      "Cloud Solutions",
      "Infrastructure Management",
      "Security Implementation",
      "Technical Support"
    ],
    benefits: [
      "Improved Operational Efficiency",
      "Enhanced Security",
      "Scalable Architecture",
      "Reduced IT Costs",
      "Better Data Management",
      "Increased Productivity"
    ],
    process: [
      {
        title: "Analysis",
        description: "Understanding your business needs and technical requirements"
      },
      {
        title: "Design",
        description: "Creating a comprehensive system architecture"
      },
      {
        title: "Development",
        description: "Building and testing your custom IT solution"
      },
      {
        title: "Deployment",
        description: "Implementing the solution with minimal disruption"
      }
    ]
  },
  "video-production": {
    title: "Video Production",
    description: "Compelling visual content that tells your brand story",
    icon: Video,
    longDescription: "Create engaging video content that captures your audience's attention and effectively communicates your message. From concept to final delivery, we handle every aspect of video production.",
    features: [
      "Corporate Videos",
      "Commercial Production",
      "Social Media Content",
      "Event Coverage",
      "Animation",
      "Drone Footage"
    ],
    benefits: [
      "Professional Quality Content",
      "Increased Engagement",
      "Brand Storytelling",
      "Multi-Platform Optimization",
      "High-Impact Messaging",
      "Visual Brand Building"
    ],
    process: [
      {
        title: "Pre-Production",
        description: "Planning, scripting, and storyboarding"
      },
      {
        title: "Production",
        description: "Professional filming with high-end equipment"
      },
      {
        title: "Post-Production",
        description: "Editing, effects, and final touches"
      },
      {
        title: "Delivery",
        description: "Multiple format exports for various platforms"
      }
    ]
  },
  "branding": {
    title: "Branding",
    description: "Build a strong, memorable brand identity that resonates",
    icon: Palette,
    longDescription: "Develop a powerful brand identity that sets you apart from competitors and connects with your target audience. Our branding solutions are strategic, creative, and impactful.",
    features: [
      "Brand Strategy",
      "Visual Identity Design",
      "Brand Guidelines",
      "Logo Design",
      "Brand Voice Development",
      "Brand Architecture"
    ],
    benefits: [
      "Strong Market Positioning",
      "Brand Recognition",
      "Consistent Brand Message",
      "Emotional Connection",
      "Competitive Advantage",
      "Long-term Brand Value"
    ],
    process: [
      {
        title: "Discovery",
        description: "Understanding your brand values and vision"
      },
      {
        title: "Strategy",
        description: "Developing your brand positioning and strategy"
      },
      {
        title: "Design",
        description: "Creating your visual brand elements"
      },
      {
        title: "Implementation",
        description: "Rolling out your new brand identity"
      }
    ]
  },
  "marketing-strategy": {
    title: "Marketing Strategy",
    description: "Data-driven strategies to achieve your business goals",
    icon: LineChart,
    longDescription: "Develop comprehensive marketing strategies that drive results. Our data-driven approach ensures your marketing efforts are targeted, effective, and measurable.",
    features: [
      "Market Research",
      "Competitor Analysis",
      "Campaign Planning",
      "Channel Strategy",
      "Budget Optimization",
      "Performance Tracking"
    ],
    benefits: [
      "Targeted Campaigns",
      "Better ROI",
      "Market Insights",
      "Competitive Edge",
      "Measurable Results",
      "Sustainable Growth"
    ],
    process: [
      {
        title: "Research",
        description: "Market and competitor analysis"
      },
      {
        title: "Planning",
        description: "Strategy development and goal setting"
      },
      {
        title: "Execution",
        description: "Campaign implementation across channels"
      },
      {
        title: "Analysis",
        description: "Performance monitoring and optimization"
      }
    ]
  },
  "kol-endorsement": {
    title: "KOL Endorsement",
    description: "Connect with influential voices in your industry",
    icon: Users,
    longDescription: "Leverage the power of Key Opinion Leaders to amplify your brand message and reach new audiences. We connect you with the right influencers for authentic partnerships.",
    features: [
      "Influencer Selection",
      "Campaign Management",
      "Content Strategy",
      "Performance Tracking",
      "Relationship Building",
      "ROI Analysis"
    ],
    benefits: [
      "Extended Reach",
      "Authentic Advocacy",
      "Trust Building",
      "Targeted Exposure",
      "Enhanced Credibility",
      "Social Proof"
    ],
    process: [
      {
        title: "Selection",
        description: "Identifying the right KOLs for your brand"
      },
      {
        title: "Outreach",
        description: "Establishing partnerships and agreements"
      },
      {
        title: "Execution",
        description: "Managing campaign delivery and content"
      },
      {
        title: "Reporting",
        description: "Measuring campaign impact and results"
      }
    ]
  },
  "performance-marketing": {
    title: "Performance Marketing",
    description: "Results-focused campaigns that drive real ROI",
    icon: Megaphone,
    longDescription: "Drive measurable results with our performance marketing solutions. We focus on data-driven campaigns that deliver clear ROI and business growth.",
    features: [
      "PPC Campaigns",
      "Social Media Advertising",
      "Conversion Optimization",
      "Retargeting",
      "Analytics & Tracking",
      "A/B Testing"
    ],
    benefits: [
      "Measurable Results",
      "Cost-Effective",
      "Real-Time Optimization",
      "Targeted Reach",
      "Higher Conversion Rates",
      "Clear ROI"
    ],
    process: [
      {
        title: "Setup",
        description: "Campaign structure and tracking implementation"
      },
      {
        title: "Launch",
        description: "Campaign activation and monitoring"
      },
      {
        title: "Optimize",
        description: "Continuous performance improvement"
      },
      {
        title: "Scale",
        description: "Expanding successful campaigns"
      }
    ]
  }
} 