import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const PaverCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    paverLength: '12',
    paverWidth: '6',
    paverThickness: '2.375',
    pattern: 'running',
    sandDepth: '1',
    gravelDepth: '4'
  });
  const [result, setResult] = useState<{
    totalArea: number;
    paversNeeded: number;
    sandNeeded: number;
    gravelNeeded: number;
    edging: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const paverLength = parseFloat(values.paverLength);
    const paverWidth = parseFloat(values.paverWidth);
    const sandDepth = parseFloat(values.sandDepth);
    const gravelDepth = parseFloat(values.gravelDepth);
    
    // Calculate total area in square feet
    const totalArea = length * width;
    
    // Calculate paver area in square feet
    const paverArea = (paverLength * paverWidth) / 144; // Convert to sq ft
    
    // Calculate number of pavers needed with waste factor
    const wasteFactor = 1.1; // 10% extra for cuts and waste
    const paversNeeded = Math.ceil((totalArea / paverArea) * wasteFactor);
    
    // Calculate materials
    const cubicFeetPerYard = 27;
    const sandNeeded = (totalArea * (sandDepth / 12)) / cubicFeetPerYard; // Convert to cubic yards
    const gravelNeeded = (totalArea * (gravelDepth / 12)) / cubicFeetPerYard; // Convert to cubic yards
    
    // Calculate edging needed (perimeter)
    const edging = 2 * (length + width);

    setResult({
      totalArea,
      paversNeeded,
      sandNeeded,
      gravelNeeded,
      edging
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
        <h2 className="text-2xl font-bold">Paver Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area Length (feet)
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
              Area Width (feet)
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
              Paver Size
            </label>
            <select
              name="paverSize"
              value={`${values.paverLength}x${values.paverWidth}`}
              onChange={(e) => {
                const [length, width] = e.target.value.split('x');
                setValues(prev => ({
                  ...prev,
                  paverLength: length,
                  paverWidth: width
                }));
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="12x6">Standard (12" x 6")</option>
              <option value="8x4">Small (8" x 4")</option>
              <option value="16x8">Large (16" x 8")</option>
              <option value="12x12">Square (12" x 12")</option>
              <option value="24x24">Large Square (24" x 24")</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pattern
            </label>
            <select
              name="pattern"
              value={values.pattern}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="running">Running Bond</option>
              <option value="herringbone">Herringbone</option>
              <option value="basketweave">Basketweave</option>
              <option value="stacked">Stacked Bond</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sand Depth (inches)
            </label>
            <input
              type="number"
              name="sandDepth"
              value={values.sandDepth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sand depth"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gravel Base Depth (inches)
            </label>
            <input
              type="number"
              name="gravelDepth"
              value={values.gravelDepth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter gravel depth"
              step="0.5"
            />
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
              <p className="text-xl">Total Area: {result.totalArea.toFixed(2)} sq ft</p>
              <p className="text-xl">Pavers Needed: {result.paversNeeded} pieces</p>
              <p className="text-xl">Sand Needed: {result.sandNeeded.toFixed(2)} cubic yards</p>
              <p className="text-xl">Gravel Needed: {result.gravelNeeded.toFixed(2)} cubic yards</p>
              <p className="text-xl">Edging Required: {result.edging.toFixed(2)} linear feet</p>
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
                <li>Enter the area length and width</li>
                <li>Select paver size and pattern</li>
                <li>Specify sand and gravel depths</li>
                <li>Click "Calculate Materials" to see requirements</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Material Guidelines:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Sand bed: typically 1 inch deep</li>
                  <li>Gravel base: 4-6 inches for patios, 8-12 inches for driveways</li>
                  <li>Add 10% extra pavers for cuts and waste</li>
                  <li>Consider local frost depth requirements</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/concrete" className="text-blue-600 hover:text-blue-700">
                      Concrete Calculator
                    </Link>
                    {" - Calculate concrete volume needed"}
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

export default PaverCalculator;