import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const RetirementCalculator = () => {
  const [values, setValues] = useState({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    monthlyContribution: '',
    expectedReturn: '',
    inflationRate: '2.5'
  });
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const currentAge = parseFloat(values.currentAge);
    const retirementAge = parseFloat(values.retirementAge);
    const currentSavings = parseFloat(values.currentSavings);
    const monthlyContribution = parseFloat(values.monthlyContribution);
    const expectedReturn = parseFloat(values.expectedReturn) / 100;
    const inflationRate = parseFloat(values.inflationRate) / 100;
    
    const years = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 12;
    const months = years * 12;
    
    const futureValue = currentSavings * Math.pow(1 + expectedReturn, years) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalContributions = currentSavings + (monthlyContribution * months);
    const totalInterest = futureValue - totalContributions;
    
    // Adjust for inflation
    const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate, years);
    
    setResult({
      futureValue: inflationAdjustedValue,
      totalContributions,
      totalInterest
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h2 className="text-2xl font-bold">Retirement Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Age
            </label>
            <input
              type="number"
              name="currentAge"
              value={values.currentAge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Age
            </label>
            <input
              type="number"
              name="retirementAge"
              value={values.retirementAge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter retirement age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Savings ($)
            </label>
            <input
              type="number"
              name="currentSavings"
              value={values.currentSavings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current savings"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              name="monthlyContribution"
              value={values.monthlyContribution}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly contribution"
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
              Inflation Rate (%)
            </label>
            <input
              type="number"
              name="inflationRate"
              value={values.inflationRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter inflation rate"
              step="0.1"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Retirement Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-2">
              Future Value (Today's Dollars): ${result.futureValue.toFixed(2)}
            </p>
            <p className="text-lg mb-2">
              Total Contributions: ${result.totalContributions.toFixed(2)}
            </p>
            <p className="text-lg">
              Total Interest Earned: ${result.totalInterest.toFixed(2)}
            </p>
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
                <li>Enter your current age</li>
                <li>Enter your planned retirement age</li>
                <li>Enter your current retirement savings</li>
                <li>Enter your monthly contribution</li>
                <li>Enter expected annual return rate</li>
                <li>Adjust inflation rate if needed</li>
                <li>Click "Calculate Retirement Savings" to see your projected retirement savings</li>
              </ol>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/compound" className="text-blue-600 hover:text-blue-700">
                      Compound Interest Calculator
                    </Link>
                    {" - See how your investments grow"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/roi" className="text-blue-600 hover:text-blue-700">
                      ROI Calculator
                    </Link>
                    {" - Calculate investment returns"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate loan payments"}
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

export default RetirementCalculator;