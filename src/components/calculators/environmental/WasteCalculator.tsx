import React, { useState } from 'react';

interface WasteCalculatorProps {
  onCalculate: (waste: { monthly: number; yearly: number }) => void;
}

const WasteCalculator: React.FC<WasteCalculatorProps> = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    plasticBottles: '',
    paperProducts: '',
    foodWaste: '',
    generalTrash: ''
  });

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateWaste = () => {
    // Average weight in pounds per item
    const weights = {
      plasticBottles: 0.05,
      paperProducts: 0.1,
      foodWaste: 0.5,
      generalTrash: 0.25
    };

    const monthlyWaste = 
      (parseFloat(inputs.plasticBottles) || 0) * weights.plasticBottles +
      (parseFloat(inputs.paperProducts) || 0) * weights.paperProducts +
      (parseFloat(inputs.foodWaste) || 0) * weights.foodWaste +
      (parseFloat(inputs.generalTrash) || 0) * weights.generalTrash;

    onCalculate({
      monthly: monthlyWaste,
      yearly: monthlyWaste * 12
    });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Waste Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plastic Bottles (per month)
          </label>
          <input
            type="number"
            value={inputs.plasticBottles}
            onChange={(e) => handleInputChange('plasticBottles', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of bottles"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paper Products (sheets per month)
          </label>
          <input
            type="number"
            value={inputs.paperProducts}
            onChange={(e) => handleInputChange('paperProducts', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of sheets"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Waste (portions per month)
          </label>
          <input
            type="number"
            value={inputs.foodWaste}
            onChange={(e) => handleInputChange('foodWaste', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter portions of food waste"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            General Trash (items per month)
          </label>
          <input
            type="number"
            value={inputs.generalTrash}
            onChange={(e) => handleInputChange('generalTrash', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter number of items"
          />
        </div>
        <button
          onClick={calculateWaste}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Waste
        </button>
      </div>
    </div>
  );
};

export default WasteCalculator;