import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const RoofingCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    pitch: '4:12',
    materialType: 'asphalt',
    overhang: '0'
  });
  const [result, setResult] = useState<{
    totalArea: number;
    squares: number;
    materials: number;
    wastage: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const overhang = parseFloat(values.overhang);
    
    // Add overhang to dimensions
    const totalLength = length + (2 * overhang);
    const totalWidth = width + (2 * overhang);

    // Calculate pitch multiplier
    const [rise, run] = values.pitch.split(':').map(Number);
    const pitchMultiplier = Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2)) / run;

    // Calculate total area with pitch
    const baseArea = totalLength * totalWidth;
    const actualArea = baseArea * pitchMultiplier;

    // Calculate squares (1 square = 100 sq ft)
    const squares = actualArea / 100;

    // Calculate materials needed with wastage
    const wastageFactors = {
      asphalt: 1.15, // 15% wastage
      metal: 1.10,   // 10% wastage
      tile: 1.20,    // 20% wastage
      slate: 1.15    // 15% wastage
    };
    
    const wastage = squares * (wastageFactors[values.materialType as keyof typeof wastageFactors] - 1);
    const totalMaterials = squares * wastageFactors[values.materialType as keyof typeof wastageFactors];

    setResult({
      totalArea: actualArea,
      squares: squares,
      materials: totalMaterials,
      wastage: wastage
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
        <h2 className="text-2xl font-bold">Roofing Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roof Length (feet)
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
              Roof Width (feet)
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
              Roof Pitch
            </label>
            <select
              name="pitch"
              value={values.pitch}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="2:12">2:12 (9.5° slope)</option>
              <option value="3:12">3:12 (14° slope)</option>
              <option value="4:12">4:12 (18.4° slope)</option>
              <option value="5:12">5:12 (22.6° slope)</option>
              <option value="6:12">6:12 (26.6° slope)</option>
              <option value="8:12">8:12 (33.7° slope)</option>
              <option value="10:12">10:12 (39.8° slope)</option>
              <option value="12:12">12:12 (45° slope)</option>
            </select>
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
              <option value="asphalt">Asphalt Shingles</option>
              <option value="metal">Metal Roofing</option>
              <option value="tile">Roof Tiles</option>
              <option value="slate">Slate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overhang (feet)
            </label>
            <input
              type="number"
              name="overhang"
              value={values.overhang}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter overhang"
              step="0.5"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Roofing Materials
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Total Roof Area: {result.totalArea.toFixed(2)} sq ft</p>
              <p className="text-xl">Number of Squares: {result.squares.toFixed(2)} squares</p>
              <p className="text-xl">Materials Needed: {result.materials.toFixed(2)} squares</p>
              <p className="text-xl">Wastage Allowance: {result.wastage.toFixed(2)} squares</p>
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
                <li>Enter the roof length and width</li>
                <li>Select the roof pitch (slope)</li>
                <li>Choose your roofing material</li>
                <li>Enter overhang length (if any)</li>
                <li>Click "Calculate Roofing Materials" to see required materials</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>1 Square = 100 square feet of roof area</li>
                  <li>Wastage allowance varies by material type</li>
                  <li>Total area includes pitch factor</li>
                  <li>Materials needed includes wastage</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/material-cost" className="text-blue-600 hover:text-blue-700">
                      Material Cost Calculator
                    </Link>
                    {" - Calculate total project costs"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/paint" className="text-blue-600 hover:text-blue-700">
                      Paint Calculator
                    </Link>
                    {" - Calculate paint needed for surfaces"}
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

export default RoofingCalculator;