import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const EducationSavingsCalculator = () => {
  const [values, setValues] = useState({
    targetAmount: '',
    yearsUntilStart: '',
    initialSavings: '',
    expectedReturn: '',
    inflationRate: '3',
    educationLength: '4',
    annualIncrease: '5'
  });
  const [result, setResult] = useState<{
    monthlyContribution: number;
    totalContributions: number;
    totalInterest: number;
    inflationAdjustedTarget: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const target = parseFloat(values.targetAmount);
    const years = parseFloat(values.yearsUntilStart);
    const initial = parseFloat(values.initialSavings) || 0;
    const returnRate = parseFloat(values.expectedReturn) / 100;
    const inflation = parseFloat(values.inflationRate) / 100;
    const educationYears = parseFloat(values.educationLength);
    const annualIncrease = parseFloat(values.annualIncrease) / 100;

    // Adjust target for inflation and education length
    const inflationAdjustedTarget = target * Math.pow(1 + inflation, years) * 
      (1 - Math.pow(1 + annualIncrease, educationYears)) / (1 - (1 + annualIncrease));

    // Calculate monthly contribution needed
    const monthlyRate = returnRate / 12;
    const months = years * 12;
    
    const monthlyContribution = (inflationAdjustedTarget - initial * Math.pow(1 + monthlyRate, months)) /
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalContributions = (monthlyContribution * months) + initial;
    const totalInterest = inflationAdjustedTarget - totalContributions;

    setResult({
      monthlyContribution,
      totalContributions,
      totalInterest,
      inflationAdjustedTarget
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/calculators/finance" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Education Savings Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Education Cost ($)
            </label>
            <input
              type="number"
              name="targetAmount"
              value={values.targetAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years Until Start
            </label>
            <input
              type="number"
              name="yearsUntilStart"
              value={values.yearsUntilStart}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter years until start"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Savings ($)
            </label>
            <input
              type="number"
              name="initialSavings"
              value={values.initialSavings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter initial savings"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Return Rate (%)
            </label>
            <input
              type="number"
              name="expectedReturn"
              value={values.expectedReturn}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected return"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education Length (years)
            </label>
            <select
              name="educationLength"
              value={values.educationLength}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="2">2 years (Associate's)</option>
              <option value="4">4 years (Bachelor's)</option>
              <option value="6">6 years (Master's)</option>
              <option value="8">8 years (Doctorate)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Cost Increase (%)
            </label>
            <input
              type="number"
              name="annualIncrease"
              value={values.annualIncrease}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual increase"
              step="0.1"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Education Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Required Monthly Savings: ${result.monthlyContribution.toFixed(2)}</p>
              <p className="text-xl">Total Contributions: ${result.totalContributions.toFixed(2)}</p>
              <p className="text-xl">Total Interest Earned: ${result.totalInterest.toFixed(2)}</p>
              <p className="text-xl">Total Education Cost: ${result.inflationAdjustedTarget.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Info className="h-5 w-5 mr-2" />
            How to Use This Calculator
          </button>
          
          {showHowTo && (
            <div className="mt-4 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">How to Use</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter the current annual education cost</li>
                <li>Specify years until education starts</li>
                <li>Input any existing education savings</li>
                <li>Enter expected investment return rate</li>
                <li>Select education program length</li>
                <li>Adjust annual cost increase rate</li>
                <li>Click "Calculate Education Savings" to see required savings</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Monthly savings needed to reach goal</li>
                  <li>Total contributions over saving period</li>
                  <li>Expected interest earnings</li>
                  <li>Inflation-adjusted total cost</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Savings Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Start saving early for more compound growth</li>
                  <li>Consider tax-advantaged education accounts</li>
                  <li>Review and adjust savings plan annually</li>
                  <li>Research financial aid and scholarship options</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/compound" className="text-blue-600 hover:text-blue-700">
                      Compound Interest Calculator
                    </Link>
                    {" - See how your savings grow"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/savings-goal" className="text-blue-600 hover:text-blue-700">
                      Savings Goal Calculator
                    </Link>
                    {" - Plan other savings goals"}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationSavingsCalculator;