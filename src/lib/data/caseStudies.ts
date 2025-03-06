import { CaseStudy } from '@/lib/types/work';

// We'll add image IDs to make it easier to reference the correct images
interface CaseStudyWithImageId extends CaseStudy {
  imageId: 'branding' | 'onlineMarketplace' | 'videoProduction';
}

export const CASE_STUDIES: CaseStudyWithImageId[] = [
  {
    id: 'ecommerce-automation',
    title: 'E-commerce Automation',
    category: 'digital-automation',
    description: 'Implemented automated inventory and order management systems, resulting in 40% operational cost reduction.',
    thumbnail: '/images/online marketplace.jpg',
    imageId: 'onlineMarketplace',
    images: [
      '/images/online marketplace.jpg',
      '/portfolio/ecommerce-detail-2.jpg',
      '/portfolio/ecommerce-detail-3.jpg',
      '/portfolio/ecommerce-detail-4.jpg',
    ],
    background: 'TechRetail Co. was struggling with manual inventory management and order processing, leading to errors, delays, and high operational costs. They needed a comprehensive automation solution to streamline their e-commerce operations.',
    challenge: 'The client needed to automate their entire e-commerce workflow while ensuring seamless integration with their existing ERP system and maintaining data accuracy across multiple sales channels.',
    objectives: [
      'Reduce operational costs by at least 30%',
      'Eliminate manual data entry errors',
      'Decrease order processing time by 50%',
      'Implement real-time inventory synchronization across all channels',
    ],
    approach: 'We developed a custom automation solution that integrated with their existing systems while introducing new technologies to streamline their workflow.',
    process: [
      {
        phase: 'Discovery & Analysis',
        description: 'We conducted a thorough analysis of their existing workflows, identifying bottlenecks and opportunities for automation.'
      },
      {
        phase: 'Solution Design',
        description: 'We designed a custom automation architecture that integrated with their existing ERP while adding new capabilities.'
      },
      {
        phase: 'Development & Integration',
        description: 'Our team built the automation platform with APIs connecting all sales channels and backend systems.'
      },
      {
        phase: 'Testing & Optimization',
        description: 'We rigorously tested the system under various scenarios and optimized for performance and reliability.'
      },
      {
        phase: 'Deployment & Training',
        description: 'We rolled out the solution in phases and provided comprehensive training to the client team.'
      }
    ],
    deliverables: [
      'Custom inventory management system',
      'Order processing automation platform',
      'Multi-channel integration APIs',
      'Real-time reporting dashboard',
      'Staff training and documentation'
    ],
    results: [
      {
        metric: 'Cost Reduction',
        value: '40%'
      },
      {
        metric: 'Order Processing Speed',
        value: '60% Faster'
      },
      {
        metric: 'Inventory Accuracy',
        value: '99.9%'
      }
    ],
    clientName: 'TechRetail Co.',
    clientLogo: '/clients/techretail.svg'
  },
  {
    id: 'brand-transformation',
    title: 'Brand Transformation',
    category: 'branding',
    description: 'Complete brand overhaul including visual identity, packaging, and digital presence.',
    thumbnail: '/images/branding.jpg',
    imageId: 'branding',
    images: [
      '/images/branding.jpg',
      '/portfolio/branding-detail-2.jpg',
      '/portfolio/branding-detail-3.jpg',
      '/portfolio/branding-detail-4.jpg',
    ],
    background: 'FreshStart Foods had been in the market for over a decade but was struggling with outdated branding that no longer resonated with their target audience. They needed a complete brand refresh to regain market relevance and appeal to health-conscious consumers.',
    challenge: 'The client needed to transform their brand identity without losing recognition among existing customers while attracting a younger, health-focused demographic.',
    objectives: [
      'Create a modern, appealing visual identity',
      'Develop a cohesive brand strategy',
      'Increase brand recognition by 50%',
      'Boost social media engagement by 100%',
      'Increase sales by 30% within 6 months'
    ],
    approach: 'We implemented a comprehensive brand transformation strategy focusing on authentic storytelling, visual consistency, and digital-first experiences.',
    process: [
      {
        phase: 'Brand Audit & Research',
        description: 'We analyzed current brand perception and conducted market research to identify opportunities.'
      },
      {
        phase: 'Brand Strategy Development',
        description: 'We crafted a new brand positioning, messaging framework, and tone of voice guidelines.'
      },
      {
        phase: 'Visual Identity Design',
        description: 'Our design team created a new logo, color palette, typography, and visual system.'
      },
      {
        phase: 'Packaging Redesign',
        description: 'We redesigned product packaging to reflect the new brand identity and improve shelf appeal.'
      },
      {
        phase: 'Digital Presence Overhaul',
        description: 'We reimagined their website, social media presence, and digital marketing materials.'
      }
    ],
    deliverables: [
      'Complete brand guidelines',
      'Logo and visual identity system',
      'Packaging design for 15 products',
      'Website redesign',
      'Social media strategy and templates',
      'Marketing collateral'
    ],
    results: [
      {
        metric: 'Brand Recognition',
        value: '85%'
      },
      {
        metric: 'Social Media Growth',
        value: '150%'
      },
      {
        metric: 'Sales Increase',
        value: '3x'
      }
    ],
    clientName: 'FreshStart Foods',
    clientLogo: '/clients/freshstart.svg'
  },
  {
    id: 'video-marketing-campaign',
    title: 'Video Marketing Campaign',
    category: 'video-production',
    description: 'Created viral video content series that showcased product benefits and user success stories.',
    thumbnail: '/images/video production.jpg',
    imageId: 'videoProduction',
    images: [
      '/images/video production.jpg',
      '/portfolio/video-detail-2.jpg',
      '/portfolio/video-detail-3.jpg',
      '/portfolio/video-detail-4.jpg',
    ],
    background: 'SportsFit was launching a new line of fitness equipment but struggled to demonstrate its unique benefits through traditional marketing channels. They needed a dynamic way to showcase the products in action and build buzz around the launch.',
    challenge: 'The client needed to create compelling video content that would demonstrate product features, inspire potential customers, and generate significant social media engagement.',
    objectives: [
      'Create a series of high-quality video content',
      'Generate at least 500,000 views across platforms',
      'Achieve 20% engagement rate on social media',
      'Drive pre-orders before official launch',
      'Establish brand as innovative in fitness space'
    ],
    approach: 'We developed a multi-format video campaign featuring influencer collaborations, user testimonials, and cinematic product demonstrations.',
    process: [
      {
        phase: 'Campaign Strategy',
        description: 'We developed a comprehensive video content strategy aligned with marketing objectives.'
      },
      {
        phase: 'Pre-Production',
        description: 'Our team managed script development, location scouting, talent casting, and technical planning.'
      },
      {
        phase: 'Production',
        description: 'We executed high-quality filming across multiple locations with professional crews.'
      },
      {
        phase: 'Post-Production',
        description: 'Our editors created compelling narratives with professional color grading, sound design, and visual effects.'
      },
      {
        phase: 'Distribution Strategy',
        description: 'We implemented a phased release across multiple platforms with optimized formats for each channel.'
      }
    ],
    deliverables: [
      'Brand anthem video (90 seconds)',
      'Product demonstration series (5 videos)',
      'User testimonial collection (8 videos)',
      'Social media shorts (20 videos)',
      'Behind-the-scenes content',
      'Optimization for multiple platforms'
    ],
    results: [
      {
        metric: 'Total Views',
        value: '1M+'
      },
      {
        metric: 'Engagement Rate',
        value: '200%'
      },
      {
        metric: 'Conversion Rate',
        value: '45%'
      }
    ],
    clientName: 'SportsFit',
    clientLogo: '/clients/sportsfit.svg'
  }
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find(caseStudy => caseStudy.id === id);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
} 