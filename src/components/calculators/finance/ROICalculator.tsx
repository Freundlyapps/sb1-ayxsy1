import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const ROICalculator = () => {
  const [values, setValues] = useState({
    initialInvestment: '',
    finalValue: '',
    timePeriod: '',
  });
  const [result, setResult] = useState<number | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const initial = parseFloat(values.initialInvestment);
    const final = parseFloat(values.finalValue);
    const time = parseFloat(values.timePeriod);
    
    const roi = ((final - initial) / initial) * 100;
    const annualizedRoi = (Math.pow((final / initial), 1/time) - 1) * 100;
    
    setResult(annualizedRoi);
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
        <h2 className="text-2xl font-bold">ROI Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment ($)
            </label>
            <input
              type="number"
              name="initialInvestment"
              value={values.initialInvestment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Value ($)
            </label>
            <input
              type="number"
              name="finalValue"
              value={values.finalValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              name="timePeriod"
              value={values.timePeriod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter years"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate ROI
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl">
              Annualized ROI: {result.toFixed(2)}%
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
                <li>Enter the final value of your investment</li>
                <li>Enter the time period in years</li>
                <li>Click "Calculate ROI" to see your annualized return</li>
              </ol>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/compound" className="text-blue-600 hover:text-blue-700">
                      Compound Interest Calculator
                    </Link>
                    {" - See how your money grows over time"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/retirement" className="text-blue-600 hover:text-blue-700">
                      Retirement Calculator
                    </Link>
                    {" - Plan for your retirement goals"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate loan payments and interest"}
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

export default ROICalculator;