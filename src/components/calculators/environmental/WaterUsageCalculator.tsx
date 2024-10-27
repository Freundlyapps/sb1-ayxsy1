import React, { useState } from 'react';

interface WaterUsageCalculatorProps {
  onCalculate: (gallons: number) => void;
}

const WaterUsageCalculator: React.FC<WaterUsageCalculatorProps> = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    showers: '',
    baths: '',
    dishwasher: '',
    laundry: '',
    irrigation: ''
  });

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateWaterUsage = () => {
    // Average gallons per use
    const usage = {
      showers: 17.2,    // per shower
      baths: 30,        // per bath
      dishwasher: 6,    // per load
      laundry: 30,      // per load
      irrigation: 100   // per hour
    };

    const totalGallons = 
      (parseFloat(inputs.showers) || 0) * usage.showers +
      (parseFloat(inputs.baths) || 0) * usage.baths +
      (parseFloat(inputs.dishwasher) || 0) * usage.dishwasher +
      (parseFloat(inputs.laundry) || 0) * usage.laundry +
      (parseFloat(inputs.irrigation) || 0) * usage.irrigation;

    onCalculate(totalGallons);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Water Usage Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Showers (per week)
          </label>
          <input
            type="number"
            value={inputs.showers}
            onChange={(e) => handleInputChange('showers', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of showers"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Baths (per week)
          </label>
          <input
            type="number"
            value={inputs.baths}
            onChange={(e) => handleInputChange('baths', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of baths"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dishwasher Loads (per week)
          </label>
          <input
            type="number"
            value={inputs.dishwasher}
            onChange={(e) => handleInputChange('dishwasher', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of loads"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Laundry Loads (per week)
          </label>
          <input
            type="number"
            value={inputs.laundry}
            onChange={(e) => handleInputChange('laundry', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of loads"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Irrigation Hours (per week)
          </label>
          <input
            type="number"
            value={inputs.irrigation}
            onChange={(e) => handleInputChange('irrigation', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter hours of irrigation"
          />
        </div>
        <button
          onClick={calculateWaterUsage}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Water Usage
        </button>
      </div>
    </div>
  );
};

export default WaterUsageCalculator;