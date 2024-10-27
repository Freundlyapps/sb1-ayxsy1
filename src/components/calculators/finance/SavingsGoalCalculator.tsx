import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const SavingsGoalCalculator = () => {
  const [values, setValues] = useState({
    targetAmount: '',
    timeframe: '',
    initialSavings: '',
    interestRate: '',
    compoundingFrequency: 'monthly'
  });
  const [result, setResult] = useState<{
    monthlyContribution: number;
    totalContributions: number;
    totalInterest: number;
    finalAmount: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const target = parseFloat(values.targetAmount);
    const years = parseFloat(values.timeframe);
    const initial = parseFloat(values.initialSavings) || 0;
    const rate = parseFloat(values.interestRate) / 100;
    
    // Convert annual rate to monthly rate
    const monthlyRate = rate / 12;
    const months = years * 12;
    
    // Calculate required monthly contribution using PMT formula
    // PMT = (FV - PV * (1 + r)^n) / (((1 + r)^n - 1) / r)
    const futureValue = target;
    const presentValue = initial;
    const monthlyContribution = (futureValue - presentValue * Math.pow(1 + monthlyRate, months)) /
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalContributions = (monthlyContribution * months) + initial;
    const totalInterest = futureValue - totalContributions;

    setResult({
      monthlyContribution,
      totalContributions,
      totalInterest,
      finalAmount: futureValue
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
        <h2 className="text-2xl font-bold">Savings Goal Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount ($)
            </label>
            <input
              type="number"
              name="targetAmount"
              value={values.targetAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter target amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Frame (years)
            </label>
            <input
              type="number"
              name="timeframe"
              value={values.timeframe}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter time frame"
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
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={values.interestRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              name="compoundingFrequency"
              value={values.compoundingFrequency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Required Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Required Monthly Savings: ${result.monthlyContribution.toFixed(2)}</p>
              <p className="text-xl">Total Contributions: ${result.totalContributions.toFixed(2)}</p>
              <p className="text-xl">Total Interest Earned: ${result.totalInterest.toFixed(2)}</p>
              <p className="text-xl">Final Amount: ${result.finalAmount.toFixed(2)}</p>
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
                <li>Enter your target savings amount</li>
                <li>Specify the time frame in years</li>
                <li>Enter any initial savings (optional)</li>
                <li>Input expected annual interest rate</li>
                <li>Select compounding frequency</li>
                <li>Click "Calculate Required Savings" to see monthly contribution needed</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tips for Setting Goals:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Be realistic about your savings capacity</li>
                  <li>Consider inflation in long-term goals</li>
                  <li>Review and adjust goals periodically</li>
                  <li>Account for potential interest rate changes</li>
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
                    <Link to="/calculators/finance/retirement" className="text-blue-600 hover:text-blue-700">
                      Retirement Calculator
                    </Link>
                    {" - Plan for retirement"}
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

export default SavingsGoalCalculator;