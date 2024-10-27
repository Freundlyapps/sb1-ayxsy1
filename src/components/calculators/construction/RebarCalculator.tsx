import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const RebarCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    thickness: '',
    spacing: '12', // inches
    rebarSize: '#4',
    layers: '1'
  });
  const [result, setResult] = useState<{
    totalLength: number;
    numberOfBars: number;
    weight: number;
    coverage: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const spacing = parseFloat(values.spacing);
    const layers = parseInt(values.layers);
    
    // Calculate number of bars in each direction
    const lengthwiseBars = Math.ceil(width * 12 / spacing) + 1;
    const widthwiseBars = Math.ceil(length * 12 / spacing) + 1;
    
    // Calculate total length of rebar needed
    const totalLengthwise = lengthwiseBars * length;
    const totalWidthwise = widthwiseBars * width;
    const totalLength = (totalLengthwise + totalWidthwise) * layers;
    
    // Calculate total number of bars
    const numberOfBars = (lengthwiseBars + widthwiseBars) * layers;
    
    // Calculate weight based on rebar size
    const weightPerFoot = {
      '#3': 0.376,
      '#4': 0.668,
      '#5': 1.043,
      '#6': 1.502,
      '#7': 2.044,
      '#8': 2.670
    };
    
    const weight = totalLength * weightPerFoot[values.rebarSize as keyof typeof weightPerFoot];
    
    // Calculate coverage area
    const coverage = length * width;

    setResult({
      totalLength,
      numberOfBars,
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
        <h2 className="text-2xl font-bold">Rebar Calculator</h2>
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
              Spacing (inches)
            </label>
            <select
              name="spacing"
              value={values.spacing}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="6">6 inches</option>
              <option value="8">8 inches</option>
              <option value="12">12 inches</option>
              <option value="16">16 inches</option>
              <option value="18">18 inches</option>
              <option value="24">24 inches</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rebar Size
            </label>
            <select
              name="rebarSize"
              value={values.rebarSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="#3">#3 (3/8 inch)</option>
              <option value="#4">#4 (1/2 inch)</option>
              <option value="#5">#5 (5/8 inch)</option>
              <option value="#6">#6 (3/4 inch)</option>
              <option value="#7">#7 (7/8 inch)</option>
              <option value="#8">#8 (1 inch)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Layers
            </label>
            <select
              name="layers"
              value={values.layers}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Single Layer</option>
              <option value="2">Double Layer</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Rebar Requirements
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Total Rebar Length: {result.totalLength.toFixed(2)} feet</p>
              <p className="text-xl">Number of Bars: {result.numberOfBars}</p>
              <p className="text-xl">Total Weight: {result.weight.toFixed(2)} lbs</p>
              <p className="text-xl">Coverage Area: {result.coverage.toFixed(2)} sq ft</p>
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
                <li>Select rebar spacing</li>
                <li>Choose rebar size</li>
                <li>Select number of layers</li>
                <li>Click "Calculate Rebar Requirements" to see results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Total Length: Linear feet of rebar needed</li>
                  <li>Number of Bars: Individual pieces needed</li>
                  <li>Weight: Total weight for material ordering</li>
                  <li>Coverage: Total area being reinforced</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Common Rebar Sizes:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>#3 (3/8"): Light residential work</li>
                  <li>#4 (1/2"): Standard residential foundations</li>
                  <li>#5 (5/8"): Heavy residential/light commercial</li>
                  <li>#6+ (3/4"+): Commercial/industrial applications</li>
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

export default RebarCalculator;