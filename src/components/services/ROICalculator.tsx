"use client"

import { useState, useEffect } from 'react'
import { DollarSign, Clock, Users, Calculator } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

export function ROICalculator() {
  // Input states
  const [employeeCount, setEmployeeCount] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursSpent, setHoursSpent] = useState(20);
  const [automationCost, setAutomationCost] = useState(5000);
  
  // Result states
  const [monthlyLabor, setMonthlyLabor] = useState(0);
  const [annualLabor, setAnnualLabor] = useState(0);
  const [potentialSavings, setPotentialSavings] = useState(0);
  const [roi, setRoi] = useState(0);
  const [paybackMonths, setPaybackMonths] = useState(0);
  
  // Animation states
  const [calculationPerformed, setCalculationPerformed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  
  // Animate the savings number
  useEffect(() => {
    if (!calculationPerformed) return;
    
    let start = 0;
    const increment = potentialSavings / 30; // Animate in 30 steps
    const timer = setInterval(() => {
      start += increment;
      if (start >= potentialSavings) {
        setAnimatedSavings(potentialSavings);
        clearInterval(timer);
      } else {
        setAnimatedSavings(start);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [potentialSavings, calculationPerformed]);
  
  // Calculate ROI when inputs change
  const calculateROI = () => {
    const monthlyLaborCost = employeeCount * hourlyRate * hoursSpent;
    const annualLaborCost = monthlyLaborCost * 12;
    const automationSavings = annualLaborCost * 0.7; // Assuming 70% reduction
    const returnOnInvestment = (automationSavings / automationCost) * 100;
    const paybackPeriod = (automationCost / (automationSavings / 12));
    
    setMonthlyLabor(monthlyLaborCost);
    setAnnualLabor(annualLaborCost);
    setPotentialSavings(automationSavings);
    setRoi(returnOnInvestment);
    setPaybackMonths(paybackPeriod);
    setCalculationPerformed(true);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="py-12 bg-gray-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">ROI Calculator</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estimate how much your business could save with our automation solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-medium text-white mb-6">Enter Your Information</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="employeeCount" className="text-gray-300">
                    Number of Employees
                  </Label>
                  <span className="text-gray-400">{employeeCount}</span>
                </div>
                <Slider 
                  id="employeeCount"
                  value={[employeeCount]} 
                  min={1} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setEmployeeCount(value[0])}
                  className="my-4"
                />
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Employees involved in the process</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="hourlyRate" className="text-gray-300">
                    Average Hourly Rate
                  </Label>
                  <span className="text-gray-400">${hourlyRate}</span>
                </div>
                <Slider 
                  id="hourlyRate"
                  value={[hourlyRate]} 
                  min={15} 
                  max={200} 
                  step={5} 
                  onValueChange={(value) => setHourlyRate(value[0])}
                  className="my-4"
                />
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>Average hourly cost per employee</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="hoursSpent" className="text-gray-300">
                    Monthly Hours Spent
                  </Label>
                  <span className="text-gray-400">{hoursSpent} hrs</span>
                </div>
                <Slider 
                  id="hoursSpent"
                  value={[hoursSpent]} 
                  min={1} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setHoursSpent(value[0])}
                  className="my-4"
                />
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Hours spent on tasks per month</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="automationCost" className="text-gray-300">
                    Estimated Automation Cost
                  </Label>
                  <span className="text-gray-400">${automationCost}</span>
                </div>
                <Slider 
                  id="automationCost"
                  value={[automationCost]} 
                  min={1000} 
                  max={50000} 
                  step={1000} 
                  onValueChange={(value) => setAutomationCost(value[0])}
                  className="my-4"
                />
                <div className="flex items-center text-sm text-gray-500">
                  <Calculator className="h-4 w-4 mr-1" />
                  <span>One-time implementation cost</span>
                </div>
              </div>
              
              <div 
                className={`transition-transform duration-200 ${isHovering ? 'scale-105' : 'scale-100'}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Button 
                  onClick={calculateROI} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Calculate Savings
                </Button>
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${calculationPerformed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ height: calculationPerformed ? 'auto' : '0' }}
          >
            <h3 className="text-xl font-medium text-white mb-6">Your Potential Savings</h3>
            
            <div className="mb-8 text-center">
              <p className="text-sm text-gray-400 mb-2">Estimated Annual Savings</p>
              <div className="text-4xl font-bold text-purple-400">
                {formatCurrency(animatedSavings)}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Current Monthly Labor Cost</p>
                <p className="text-lg font-medium text-white">{formatCurrency(monthlyLabor)}</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Current Annual Labor Cost</p>
                <p className="text-lg font-medium text-white">{formatCurrency(annualLabor)}</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">ROI (First Year)</p>
                <p className="text-lg font-medium text-green-400">{roi.toFixed(0)}%</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Payback Period</p>
                <p className="text-lg font-medium text-white">{paybackMonths.toFixed(1)} months</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                *Calculations are estimates based on industry averages and assume approximately 70% 
                efficiency improvement through automation. Actual results may vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
