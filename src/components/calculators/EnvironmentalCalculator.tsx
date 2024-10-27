import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import CalculatorNavigation from './CalculatorNavigation';
import CarbonFootprintCalculator from './environmental/CarbonFootprintCalculator';
import WaterUsageCalculator from './environmental/WaterUsageCalculator';
import WasteCalculator from './environmental/WasteCalculator';
import TreePlantingCalculator from './environmental/TreePlantingCalculator';

interface CalculationResult {
  carbonEmissions?: number;
  waterUsage?: number;
  waste?: {
    monthly: number;
    yearly: number;
  };
  treePlanting?: {
    trees: number;
    co2Offset: number;
  };
}

const EnvironmentalCalculator: React.FC = () => {
  const [result, setResult] = useState<CalculationResult>({});

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Environmental Impact Calculators</h1>
            </div>
            <p className="text-gray-600">Calculate and understand your environmental impact</p>
          </div>

          <CarbonFootprintCalculator 
            onCalculate={(emissions) => setResult({ ...result, carbonEmissions: emissions })} 
          />
          {result.carbonEmissions && (
            <div className="mt-4 p-4 bg-green-50 rounded">
              <p className="text-green-900">
                Annual Carbon Emissions: {result.carbonEmissions.toFixed(2)} kg CO2
              </p>
            </div>
          )}

          <div className="mt-8">
            <WaterUsageCalculator 
              onCalculate={(usage) => setResult({ ...result, waterUsage: usage })} 
            />
            {result.waterUsage && (
              <div className="mt-4 p-4 bg-green-50 rounded">
                <p className="text-green-900">
                  Weekly Water Usage: {result.waterUsage.toFixed(2)} gallons
                </p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <WasteCalculator 
              onCalculate={(waste) => setResult({ ...result, waste })} 
            />
            {result.waste && (
              <div className="mt-4 p-4 bg-green-50 rounded">
                <p className="text-green-900">Monthly Waste: {result.waste.monthly.toFixed(2)} lbs</p>
                <p className="text-green-900">Yearly Waste: {result.waste.yearly.toFixed(2)} lbs</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <TreePlantingCalculator 
              onCalculate={(treePlanting) => setResult({ ...result, treePlanting })} 
            />
            {result.treePlanting && (
              <div className="mt-4 p-4 bg-green-50 rounded">
                <p className="text-green-900">
                  Trees Needed: {result.treePlanting.trees}
                </p>
                <p className="text-green-900">
                  Potential CO2 Offset: {result.treePlanting.co2Offset.toFixed(2)} kg/year
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use Environmental Calculators</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Carbon Footprint Calculator</h3>
                <p className="text-gray-600">Enter your energy usage, transportation, and lifestyle data to estimate your carbon emissions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Water Usage Calculator</h3>
                <p className="text-gray-600">Track your water consumption from various household activities.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Waste Calculator</h3>
                <p className="text-gray-600">Estimate your waste generation and identify areas for reduction.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Tree Planting Calculator</h3>
                <p className="text-gray-600">Calculate how many trees you need to plant to offset your carbon footprint.</p>
              </div>
            </div>
          </div>

          <CalculatorNavigation currentCalculator="environmental" />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCalculator;