interface ServiceBenefitsProps {
  benefits: string[]
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps): JSX.Element {
  if (!benefits || benefits.length === 0) {
    return <></>
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold mb-6">Benefits</h2>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 