import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const BuildingCostCalculator = () => {
  const [values, setValues] = useState({
    squareFootage: '',
    buildingType: 'residential',
    constructionQuality: 'standard',
    location: 'suburban',
    stories: '1',
    includeLand: 'no'
  });
  const [result, setResult] = useState<{
    totalCost: number;
    costBreakdown: {
      materials: number;
      labor: number;
      permits: number;
      overhead: number;
    };
    costPerSqFt: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const sqft = parseFloat(values.squareFootage);
    
    // Base cost per square foot based on building type and quality
    const baseCosts = {
      residential: {
        economy: 100,
        standard: 150,
        luxury: 250
      },
      commercial: {
        economy: 150,
        standard: 200,
        luxury: 300
      },
      industrial: {
        economy: 120,
        standard: 180,
        luxury: 250
      }
    };

    // Location multipliers
    const locationMultipliers = {
      urban: 1.2,
      suburban: 1.0,
      rural: 0.9
    };

    // Stories multiplier
    const storiesMultiplier = 1 + ((parseInt(values.stories) - 1) * 0.05);

    // Calculate base cost per square foot
    const baseCostPerSqFt = baseCosts[values.buildingType as keyof typeof baseCosts][values.constructionQuality as keyof typeof baseCosts.residential];
    const adjustedCostPerSqFt = baseCostPerSqFt * 
      locationMultipliers[values.location as keyof typeof locationMultipliers] *
      storiesMultiplier;

    const totalCost = sqft * adjustedCostPerSqFt;

    // Cost breakdown
    const costBreakdown = {
      materials: totalCost * 0.50, // 50% materials
      labor: totalCost * 0.35,     // 35% labor
      permits: totalCost * 0.05,    // 5% permits and fees
      overhead: totalCost * 0.10    // 10% overhead and profit
    };

    setResult({
      totalCost,
      costBreakdown,
      costPerSqFt: adjustedCostPerSqFt
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/calculators/construction" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Building2 className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Building Cost Estimator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square Footage
            </label>
            <input
              type="number"
              name="squareFootage"
              value={values.squareFootage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter square footage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building Type
            </label>
            <select
              name="buildingType"
              value={values.buildingType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Construction Quality
            </label>
            <select
              name="constructionQuality"
              value={values.constructionQuality}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="standard">Standard</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              name="location"
              value={values.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="urban">Urban</option>
              <option value="suburban">Suburban</option>
              <option value="rural">Rural</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Stories
            </label>
            <select
              name="stories"
              value={values.stories}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3 Stories</option>
              <option value="4">4+ Stories</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Building Cost
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Total Estimated Cost: ${result.totalCost.toLocaleString()}</p>
              <p className="text-xl">Cost per Square Foot: ${result.costPerSqFt.toFixed(2)}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Cost Breakdown:</h4>
                <ul className="space-y-1">
                  <li>Materials: ${result.costBreakdown.materials.toLocaleString()}</li>
                  <li>Labor: ${result.costBreakdown.labor.toLocaleString()}</li>
                  <li>Permits & Fees: ${result.costBreakdown.permits.toLocaleString()}</li>
                  <li>Overhead & Profit: ${result.costBreakdown.overhead.toLocaleString()}</li>
                </ul>
              </div>
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
                <li>Enter the total square footage of the building</li>
                <li>Select the building type (residential, commercial, industrial)</li>
                <li>Choose the construction quality level</li>
                <li>Specify the location type</li>
                <li>Select number of stories</li>
                <li>Click "Calculate Building Cost" to see the estimate</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Cost Factors:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Building type affects base cost per square foot</li>
                  <li>Location influences labor and material costs</li>
                  <li>Quality level determines materials and finishes</li>
                  <li>Number of stories impacts structural requirements</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/material-cost" className="text-blue-600 hover:text-blue-700">
                      Material Cost Calculator
                    </Link>
                    {" - Calculate specific material costs"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/concrete" className="text-blue-600 hover:text-blue-700">
                      Concrete Calculator
                    </Link>
                    {" - Calculate foundation requirements"}
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

export default BuildingCostCalculator;