import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft, Info } from 'lucide-react';

const EVSavingsCalculator = () => {
  const [values, setValues] = useState({
    annualMiles: '',
    gasPrice: '',
    mpg: '',
    kwhPrice: '',
    evEfficiency: ''
  });
  const [result, setResult] = useState<{
    annualGasCost: number;
    annualEvCost: number;
    savings: number;
    co2Reduction: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const miles = parseFloat(values.annualMiles) || 0;
    const gasPrice = parseFloat(values.gasPrice) || 0;
    const mpg = parseFloat(values.mpg) || 0;
    const kwhPrice = parseFloat(values.kwhPrice) || 0;
    const evEfficiency = parseFloat(values.evEfficiency) || 0;

    const annualGasCost = (miles / mpg) * gasPrice;
    const annualEvCost = (miles / evEfficiency) * kwhPrice;
    const savings = annualGasCost - annualEvCost;
    const co2Reduction = (miles / mpg) * 8.887; // kg CO2 per gallon of gasoline

    setResult({
      annualGasCost,
      annualEvCost,
      savings,
      co2Reduction
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
        <Link to="/calculators/energy" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold">EV Savings Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Miles Driven
            </label>
            <input
              type="number"
              name="annualMiles"
              value={values.annualMiles}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual miles"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gas Price ($ per gallon)
            </label>
            <input
              type="number"
              name="gasPrice"
              value={values.gasPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter gas price"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gas Vehicle MPG
            </label>
            <input
              type="number"
              name="mpg"
              value={values.mpg}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter MPG"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Price ($ per kWh)
            </label>
            <input
              type="number"
              name="kwhPrice"
              value={values.kwhPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter electricity price"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EV Efficiency (miles per kWh)
            </label>
            <input
              type="number"
              name="evEfficiency"
              value={values.evEfficiency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter EV efficiency"
              step="0.1"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate EV Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Annual Gas Cost: ${result.annualGasCost.toFixed(2)}</p>
              <p className="text-xl">Annual EV Cost: ${result.annualEvCost.toFixed(2)}</p>
              <p className="text-xl">Annual Savings: ${result.savings.toFixed(2)}</p>
              <p className="text-xl">CO2 Reduction: {result.co2Reduction.toFixed(0)} kg/year</p>
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
                <li>Enter your annual miles driven</li>
                <li>Input current gas price per gallon</li>
                <li>Enter your gas vehicle's MPG</li>
                <li>Input your electricity rate per kWh</li>
                <li>Enter EV efficiency (typical range: 3-4 miles/kWh)</li>
                <li>Click "Calculate EV Savings" to see potential benefits</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Typical Values:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Average annual miles: 12,000-15,000</li>
                  <li>Gas vehicle MPG: 25-35</li>
                  <li>EV efficiency: 3-4 miles/kWh</li>
                  <li>Average electricity rate: $0.12-0.15/kWh</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/environmental/carbon-footprint" className="text-blue-600 hover:text-blue-700">
                      Carbon Footprint Calculator
                    </Link>
                    {" - Calculate your environmental impact"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/roi" className="text-blue-600 hover:text-blue-700">
                      ROI Calculator
                    </Link>
                    {" - Calculate return on investment"}
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

export default EVSavingsCalculator;