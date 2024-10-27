import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const LandscapingCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    depth: '',
    materialType: 'mulch',
    coverage: 'full'
  });
  const [result, setResult] = useState<{
    volume: number;
    bags: number;
    weight: number;
    coverage: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const depth = parseFloat(values.depth);
    
    // Calculate base volume in cubic yards
    const cubicFeet = length * width * (depth / 12);
    const cubicYards = cubicFeet / 27;
    
    // Material-specific calculations
    const materialFactors = {
      mulch: { weightPerYard: 800, bagsPerYard: 13.5 }, // lbs per cubic yard, 2 cu ft bags
      topsoil: { weightPerYard: 2000, bagsPerYard: 27 }, // 40 lb bags
      compost: { weightPerYard: 1000, bagsPerYard: 20 },
      decorativeStone: { weightPerYard: 2800, bagsPerYard: 30 },
      sand: { weightPerYard: 2700, bagsPerYard: 54 } // 50 lb bags
    };
    
    const factor = materialFactors[values.materialType as keyof typeof materialFactors];
    const coverage = length * width;
    const weight = cubicYards * factor.weightPerYard;
    const bags = Math.ceil(cubicYards * factor.bagsPerYard);

    setResult({
      volume: cubicYards,
      bags,
      weight,
      coverage
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
        <h2 className="text-2xl font-bold">Landscaping Materials Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (feet)
            </label>
            <input
              type="number"
              name="length"
              value={values.length}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter length"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (feet)
            </label>
            <input
              type="number"
              name="width"
              value={values.width}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter width"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depth (inches)
            </label>
            <input
              type="number"
              name="depth"
              value={values.depth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter depth"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Type
            </label>
            <select
              name="materialType"
              value={values.materialType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="mulch">Mulch</option>
              <option value="topsoil">Topsoil</option>
              <option value="compost">Compost</option>
              <option value="decorativeStone">Decorative Stone</option>
              <option value="sand">Sand</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Type
            </label>
            <select
              name="coverage"
              value={values.coverage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="full">Full Coverage</option>
              <option value="sparse">Sparse Coverage</option>
              <option value="heavy">Heavy Coverage</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Materials
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Volume Needed: {result.volume.toFixed(2)} cubic yards</p>
              <p className="text-xl">Number of Bags: {result.bags} bags</p>
              <p className="text-xl">Total Weight: {(result.weight / 2000).toFixed(2)} tons</p>
              <p className="text-xl">Coverage Area: {result.coverage.toFixed(2)} square feet</p>
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
                <li>Enter the area length and width in feet</li>
                <li>Enter the desired material depth in inches</li>
                <li>Select the material type</li>
                <li>Choose coverage density</li>
                <li>Click "Calculate Materials" to see requirements</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recommended Depths:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mulch: 2-4 inches</li>
                  <li>Topsoil: 4-6 inches for gardens</li>
                  <li>Decorative Stone: 2-3 inches</li>
                  <li>Sand: 1-2 inches for leveling</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Coverage Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Add 10-15% extra for irregular areas</li>
                  <li>Consider material compaction</li>
                  <li>Account for existing grade</li>
                  <li>Plan for proper drainage</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/gravel" className="text-blue-600 hover:text-blue-700">
                      Gravel Calculator
                    </Link>
                    {" - Calculate gravel needs"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/material-cost" className="text-blue-600 hover:text-blue-700">
                      Material Cost Calculator
                    </Link>
                    {" - Calculate total material costs"}
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

export default LandscapingCalculator;