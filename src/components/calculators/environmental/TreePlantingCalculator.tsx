import React, { useState } from 'react';

interface TreePlantingCalculatorProps {
  onCalculate: (result: { trees: number; co2Offset: number }) => void;
}

const TreePlantingCalculator: React.FC<TreePlantingCalculatorProps> = ({ onCalculate }) => {
  const [carbonFootprint, setCarbonFootprint] = useState('');

  const calculateTrees = () => {
    // Average CO2 absorption per tree per year (in kg)
    const co2PerTree = 22;
    const footprint = parseFloat(carbonFootprint) || 0;
    const treesNeeded = Math.ceil(footprint / co2PerTree);
    
    onCalculate({
      trees: treesNeeded,
      co2Offset: treesNeeded * co2PerTree
    });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Tree Planting Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Carbon Footprint (kg CO2)
          </label>
          <input
            type="number"
            value={carbonFootprint}
            onChange={(e) => setCarbonFootprint(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your carbon footprint"
          />
        </div>
        <button
          onClick={calculateTrees}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Trees Needed
        </button>
      </div>
    </div>
  );
};

export default TreePlantingCalculator;