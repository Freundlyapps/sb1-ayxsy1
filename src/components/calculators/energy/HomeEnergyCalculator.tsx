import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft, Info } from 'lucide-react';

const HomeEnergyCalculator = () => {
  const [values, setValues] = useState({
    electricity: '',
    heating: '',
    cooling: '',
    waterHeating: '',
    otherAppliances: ''
  });
  const [result, setResult] = useState<{
    totalCost: number;
    breakdown: { [key: string]: number };
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const costs = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value) || 0;
      return acc;
    }, {} as { [key: string]: number });

    const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

    setResult({
      totalCost,
      breakdown: costs
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
        <h2 className="text-2xl font-bold">Home Energy Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electricity Cost ($)
            </label>
            <input
              type="number"
              name="electricity"
              value={values.electricity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Heating Cost ($)
            </label>
            <input
              type="number"
              name="heating"
              value={values.heating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Cooling Cost ($)
            </label>
            <input
              type="number"
              name="cooling"
              value={values.cooling}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Heating Cost ($)
            </label>
            <input
              type="number"
              name="waterHeating"
              value={values.waterHeating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Appliances Cost ($)
            </label>
            <input
              type="number"
              name="otherAppliances"
              value={values.otherAppliances}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly cost"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Total Energy Costs
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-4">
              Total Monthly Energy Cost: ${result.totalCost.toFixed(2)}
            </p>
            <h4 className="font-semibold mb-2">Cost Breakdown:</h4>
            <ul className="space-y-1">
              {Object.entries(result.breakdown).map(([category, cost]) => (
                <li key={category} className="flex justify-between">
                  <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span>${cost.toFixed(2)}</span>
                </li>
              ))}
            </ul>
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
                <li>Enter your monthly electricity costs</li>
                <li>Enter your heating costs (if separate from electricity)</li>
                <li>Enter your cooling costs (if separate)</li>
                <li>Enter water heating costs</li>
                <li>Enter costs for other appliances</li>
                <li>Click "Calculate Total Energy Costs" to see your total energy expenses</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tips for Accurate Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use your recent utility bills for accurate costs</li>
                  <li>Consider seasonal variations in energy usage</li>
                  <li>Include all energy-related expenses</li>
                  <li>Keep records to track changes over time</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/energy/appliances" className="text-blue-600 hover:text-blue-700">
                      Appliance Usage Calculator
                    </Link>
                    {" - Calculate individual appliance costs"}
                  </li>
                  <li>
                    <Link to="/calculators/energy/solar" className="text-blue-600 hover:text-blue-700">
                      Solar Savings Calculator
                    </Link>
                    {" - Estimate potential solar savings"}
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

export default HomeEnergyCalculator;