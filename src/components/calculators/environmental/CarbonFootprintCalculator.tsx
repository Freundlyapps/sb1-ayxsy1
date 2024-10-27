import React, { useState } from 'react';

interface CarbonFootprintCalculatorProps {
  onCalculate: (emissions: number) => void;
}

const CarbonFootprintCalculator: React.FC<CarbonFootprintCalculatorProps> = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    electricity: '',
    naturalGas: '',
    carMiles: '',
    flights: ''
  });

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = () => {
    // Conversion factors (kg CO2 per unit)
    const factors = {
      electricity: 0.92, // per kWh
      naturalGas: 5.3,  // per therm
      carMiles: 0.404,  // per mile
      flights: 90       // per flight hour
    };

    const emissions = 
      (parseFloat(inputs.electricity) || 0) * factors.electricity +
      (parseFloat(inputs.naturalGas) || 0) * factors.naturalGas +
      (parseFloat(inputs.carMiles) || 0) * factors.carMiles +
      (parseFloat(inputs.flights) || 0) * factors.flights;

    onCalculate(emissions);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Carbon Footprint Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Electricity Usage (kWh)
          </label>
          <input
            type="number"
            value={inputs.electricity}
            onChange={(e) => handleInputChange('electricity', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter kWh"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Natural Gas Usage (therms)
          </label>
          <input
            type="number"
            value={inputs.naturalGas}
            onChange={(e) => handleInputChange('naturalGas', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter therms"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Car Miles
          </label>
          <input
            type="number"
            value={inputs.carMiles}
            onChange={(e) => handleInputChange('carMiles', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter miles"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Flight Hours (per year)
          </label>
          <input
            type="number"
            value={inputs.flights}
            onChange={(e) => handleInputChange('flights', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter flight hours"
          />
        </div>
        <button
          onClick={calculateEmissions}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate Emissions
        </button>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;