import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const CompoundInterestCalculator = () => {
  const [values, setValues] = useState({
    principal: '',
    rate: '',
    time: '',
    contribution: '',
    frequency: 'monthly'
  });
  const [result, setResult] = useState<number | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const p = parseFloat(values.principal);
    const r = parseFloat(values.rate) / 100;
    const t = parseFloat(values.time);
    const c = parseFloat(values.contribution) || 0;
    const n = values.frequency === 'monthly' ? 12 : 4;

    const amount = p * Math.pow(1 + r/n, n*t) + 
      c * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
    
    setResult(amount);
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
        <h2 className="text-2xl font-bold">Compound Interest Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Principal ($)
            </label>
            <input
              type="number"
              name="principal"
              value={values.principal}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter initial amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              name="rate"
              value={values.rate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              name="time"
              value={values.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter time period"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Contribution ($)
            </label>
            <input
              type="number"
              name="contribution"
              value={values.contribution}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contribution amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Frequency
            </label>
            <select
              name="frequency"
              value={values.frequency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Future Value
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl">
              Future Value: ${result.toFixed(2)}
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
                <li>Enter your initial investment amount</li>
                <li>Enter the annual interest rate</li>
                <li>Enter the investment time period</li>
                <li>Enter any regular contributions (optional)</li>
                <li>Select contribution frequency</li>
                <li>Click "Calculate Future Value" to see your investment growth</li>
              </ol>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/roi" className="text-blue-600 hover:text-blue-700">
                      ROI Calculator
                    </Link>
                    {" - Calculate return on investment"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate loan payments"}
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

export default CompoundInterestCalculator;