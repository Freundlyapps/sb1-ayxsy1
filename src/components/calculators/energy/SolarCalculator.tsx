import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft, Info } from 'lucide-react';

const SolarCalculator = () => {
  const [values, setValues] = useState({
    monthlyBill: '',
    roofSize: '',
    sunlightHours: '',
    systemCost: ''
  });
  const [result, setResult] = useState<{
    annualSavings: number;
    paybackPeriod: number;
    co2Reduction: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const monthlyBill = parseFloat(values.monthlyBill) || 0;
    const roofSize = parseFloat(values.roofSize) || 0;
    const sunlightHours = parseFloat(values.sunlightHours) || 0;
    const systemCost = parseFloat(values.systemCost) || 0;

    // Simplified calculations
    const annualSavings = monthlyBill * 12 * 0.9; // Assume 90% offset
    const paybackPeriod = systemCost / annualSavings;
    const co2Reduction = (monthlyBill * 12 * 0.9) * 0.92; // kg CO2 per kWh

    setResult({
      annualSavings,
      paybackPeriod,
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
        <h2 className="text-2xl font-bold">Solar Savings Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electricity Bill ($)
            </label>
            <input
              type="number"
              name="monthlyBill"
              value={values.monthlyBill}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly bill"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Roof Size (sq ft)
            </label>
            <input
              type="number"
              name="roofSize"
              value={values.roofSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter roof size"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Daily Sunlight Hours
            </label>
            <input
              type="number"
              name="sunlightHours"
              value={values.sunlightHours}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sunlight hours"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated System Cost ($)
            </label>
            <input
              type="number"
              name="systemCost"
              value={values.systemCost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter system cost"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Solar Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Annual Savings: ${result.annualSavings.toFixed(2)}</p>
              <p className="text-xl">Payback Period: {result.paybackPeriod.toFixed(1)} years</p>
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
                <li>Enter your current monthly electricity bill</li>
                <li>Enter your available roof size for solar panels</li>
                <li>Input average daily sunlight hours in your area</li>
                <li>Enter estimated solar system cost</li>
                <li>Click "Calculate Solar Savings" to see potential benefits</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Important Considerations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Roof orientation and shading</li>
                  <li>Local solar incentives and rebates</li>
                  <li>Seasonal variations in sunlight</li>
                  <li>Future electricity rate increases</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/energy/home" className="text-blue-600 hover:text-blue-700">
                      Home Energy Calculator
                    </Link>
                    {" - Calculate total home energy costs"}
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

export default SolarCalculator;