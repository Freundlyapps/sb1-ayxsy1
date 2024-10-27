import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft, Info } from 'lucide-react';

interface Appliance {
  name: string;
  watts: string;
  hoursPerDay: string;
}

const ApplianceCalculator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { name: '', watts: '', hoursPerDay: '' }
  ]);
  const [electricityRate, setElectricityRate] = useState('');
  const [result, setResult] = useState<{
    totalKwh: number;
    totalCost: number;
    breakdown: Array<{ name: string; kwh: number; cost: number }>;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const addAppliance = () => {
    setAppliances([...appliances, { name: '', watts: '', hoursPerDay: '' }]);
  };

  const handleApplianceChange = (index: number, field: keyof Appliance, value: string) => {
    const newAppliances = [...appliances];
    newAppliances[index] = { ...newAppliances[index], [field]: value };
    setAppliances(newAppliances);
  };

  const calculateUsage = () => {
    const rate = parseFloat(electricityRate) || 0;
    const breakdown = appliances.map(appliance => {
      const watts = parseFloat(appliance.watts) || 0;
      const hours = parseFloat(appliance.hoursPerDay) || 0;
      const kwh = (watts * hours * 30) / 1000; // Monthly kWh
      const cost = kwh * rate;
      return {
        name: appliance.name || 'Unnamed Appliance',
        kwh,
        cost
      };
    });

    const totalKwh = breakdown.reduce((sum, item) => sum + item.kwh, 0);
    const totalCost = breakdown.reduce((sum, item) => sum + item.cost, 0);

    setResult({ totalKwh, totalCost, breakdown });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/calculators/energy" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold">Appliance Usage Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Electricity Rate ($ per kWh)
          </label>
          <input
            type="number"
            value={electricityRate}
            onChange={(e) => setElectricityRate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter electricity rate"
            step="0.01"
          />
        </div>

        <div className="space-y-4">
          {appliances.map((appliance, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={appliance.name}
                onChange={(e) => handleApplianceChange(index, 'name', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Appliance name"
              />
              <input
                type="number"
                value={appliance.watts}
                onChange={(e) => handleApplianceChange(index, 'watts', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Watts"
              />
              <input
                type="number"
                value={appliance.hoursPerDay}
                onChange={(e) => handleApplianceChange(index, 'hoursPerDay', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Hours per day"
              />
            </div>
          ))}
        </div>

        <button
          onClick={addAppliance}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Another Appliance
        </button>

        <button
          onClick={calculateUsage}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Energy Usage
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-4">
              Total Monthly Usage: {result.totalKwh.toFixed(2)} kWh
              <br />
              Total Monthly Cost: ${result.totalCost.toFixed(2)}
            </p>
            <h4 className="font-semibold mb-2">Breakdown by Appliance:</h4>
            <ul className="space-y-2">
              {result.breakdown.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.kwh.toFixed(2)} kWh (${item.cost.toFixed(2)})</span>
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
                <li>Enter your electricity rate per kWh</li>
                <li>Add each appliance with its name, wattage, and daily usage hours</li>
                <li>Click "Add Another Appliance" for more items</li>
                <li>Click "Calculate Energy Usage" to see total consumption and costs</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Common Appliance Wattages:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Refrigerator: 150-400 watts</li>
                  <li>Washing Machine: 500-1000 watts</li>
                  <li>Air Conditioner: 1000-3500 watts</li>
                  <li>Microwave: 600-1200 watts</li>
                  <li>LED TV: 20-100 watts</li>
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
                    <Link to="/calculators/environmental/carbon-footprint" className="text-blue-600 hover:text-blue-700">
                      Carbon Footprint Calculator
                    </Link>
                    {" - Calculate your environmental impact"}
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

export default ApplianceCalculator;