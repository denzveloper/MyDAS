import Link from "next/link"

// Force dynamic rendering untuk mengatasi masalah environment variables
export const dynamic = 'force-dynamic'

// Mock case study data
const caseStudies = [
  { id: "digital-transformation", title: "Digital Transformation for Enterprise Retail" },
  { id: "ecommerce-automation", title: "E-commerce Automation for Global Brand" },
  { id: "marketing-campaign", title: "Data-Driven Marketing Campaign" },
];

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Case Studies</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Explore our successful projects and client success stories
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <Link href={`/case-studies/${study.id}`} key={study.id} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
              <h2 className="text-xl font-semibold mb-2">{study.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A case study showcasing our expertise in digital solutions.
              </p>
              <span className="text-primary">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 