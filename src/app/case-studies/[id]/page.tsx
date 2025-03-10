import { notFound } from "next/navigation"
import Link from "next/link"

// Mock case study data
const caseStudies = {
  "digital-transformation": {
    title: "Digital Transformation for Enterprise Retail",
    description: "How we helped a major retail chain transform their digital presence and operations.",
    challenge: "The client was struggling with outdated systems, siloed data, and inefficient processes that were hindering growth and customer experience.",
    solution: "We implemented a comprehensive digital transformation strategy, including a new e-commerce platform, integrated CRM, and automated inventory management.",
    results: [
      "35% increase in online sales",
      "42% improvement in customer satisfaction",
      "28% reduction in operational costs",
      "Seamless omnichannel experience across all touchpoints"
    ]
  },
  "ecommerce-automation": {
    title: "E-commerce Automation for Global Brand",
    description: "Streamlining operations and enhancing customer experience through automation.",
    challenge: "The client's manual processes were causing delays, errors, and customer dissatisfaction as they scaled their global e-commerce operations.",
    solution: "We developed custom automation solutions for order processing, inventory management, customer communications, and analytics reporting.",
    results: [
      "60% reduction in order processing time",
      "99.8% order accuracy (up from 92%)",
      "24/7 operations capability without additional staffing",
      "Real-time inventory visibility across global warehouses"
    ]
  },
  "marketing-campaign": {
    title: "Data-Driven Marketing Campaign",
    description: "Leveraging customer data to create highly targeted marketing campaigns.",
    challenge: "The client was spending significant budget on marketing with limited visibility into ROI and customer engagement metrics.",
    solution: "We implemented a data-driven marketing strategy with advanced analytics, customer segmentation, and personalized content delivery.",
    results: [
      "320% increase in campaign ROI",
      "47% higher engagement rates",
      "28% reduction in customer acquisition cost",
      "Detailed attribution modeling for all marketing channels"
    ]
  }
};

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const caseStudy = caseStudies[params.id as keyof typeof caseStudies];

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <Link
        href="/case-studies"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
      >
        ← Back to Case Studies
      </Link>
      
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
        {caseStudy.title}
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
        {caseStudy.description}
      </p>
      
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
          <p className="text-gray-600 dark:text-gray-300">{caseStudy.challenge}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
          <p className="text-gray-600 dark:text-gray-300">{caseStudy.solution}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold mb-6">Results</h2>
        <ul className="space-y-3">
          {caseStudy.results.map((result, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span className="text-gray-600 dark:text-gray-300">{result}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-center">
        <Link 
          href="/contact" 
          className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
        >
          Start Your Success Story
        </Link>
      </div>
    </div>
  );
} 