interface ProcessStep {
  title: string
  description: string
}

interface ServiceProcessProps {
  process: ProcessStep[]
}

export function ServiceProcess({ process }: ServiceProcessProps): JSX.Element {
  if (!process || process.length === 0) {
    return <></>
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Our Process</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {process.map((step, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 