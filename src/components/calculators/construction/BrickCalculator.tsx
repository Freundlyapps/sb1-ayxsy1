import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const BrickCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    height: '',
    brickSize: 'standard'
  });
  const [result, setResult] = useState<number | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const area = parseFloat(values.length) * parseFloat(values.height);
    const brickArea = values.brickSize === 'standard' ? 0.0195 : 0.0245;
    const brickCount = Math.ceil(area / brickArea);
    setResult(brickCount);
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
        <h2 className="text-2xl font-bold">Brick Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Length (meters)
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
              Wall Height (meters)
            </label>
            <input
              type="number"
              name="height"
              value={values.height}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brick Size
            </label>
            <select
              name="brickSize"
              value={values.brickSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Brick</option>
              <option value="large">Large Brick</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Bricks Needed
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl">
              Number of Bricks Needed: {result}
            </p>
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
                <li>Enter the wall length in meters</li>
                <li>Enter the wall height in meters</li>
                <li>Select the brick size (standard or large)</li>
                <li>Click "Calculate Bricks Needed" to get the total number of bricks required</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Brick Sizes:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Standard Brick: 215 × 102.5 × 65 mm</li>
                  <li>Large Brick: 230 × 110 × 76 mm</li>
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
                    <Link to="/calculators/construction/paint" className="text-blue-600 hover:text-blue-700">
                      Paint Calculator
                    </Link>
                    {" - Calculate paint needed for walls"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/cost" className="text-blue-600 hover:text-blue-700">
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

export default BrickCalculator;