import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const DrywallCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    height: '',
    sheetSize: '4x8',
    thickness: '1/2',
    openings: '0', // Square footage of doors, windows, etc.
    screwSpacing: '8'
  });
  const [result, setResult] = useState<{
    sheets: number;
    screws: number;
    compound: number;
    tape: number;
    wastage: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const height = parseFloat(values.height);
    const openings = parseFloat(values.openings);
    const screwSpacing = parseFloat(values.screwSpacing);
    
    // Calculate total wall area
    const totalArea = (length * height) - openings;
    
    // Calculate sheet area based on size
    const sheetDimensions = {
      '4x8': 32, // 4ft x 8ft = 32 sq ft
      '4x12': 48 // 4ft x 12ft = 48 sq ft
    };
    const sheetArea = sheetDimensions[values.sheetSize as keyof typeof sheetDimensions];
    
    // Calculate number of sheets needed with 10% wastage
    const sheets = Math.ceil((totalArea / sheetArea) * 1.1);
    
    // Calculate screws (typical spacing is 8 inches along studs)
    // Assume studs are 16 inches on center
    const studsPerSheet = values.sheetSize === '4x8' ? 7 : 10; // Including edges
    const screwsPerStud = values.sheetSize === '4x8' ? 12 : 18; // Based on height
    const screws = Math.ceil(sheets * studsPerSheet * screwsPerStud * 1.1); // 10% extra
    
    // Calculate joint compound (approximately 0.053 gallons per sq ft)
    const compound = Math.ceil(totalArea * 0.053);
    
    // Calculate tape (approximately 1 linear foot per sq ft of drywall)
    const tape = Math.ceil(totalArea * 1.1); // 10% extra
    
    // Calculate wastage (10% of total sheets)
    const wastage = Math.ceil(sheets * 0.1);

    setResult({
      sheets,
      screws,
      compound,
      tape,
      wastage
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
        <h2 className="text-2xl font-bold">Drywall Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Length (feet)
            </label>
            <input
              type="number"
              name="length"
              value={values.length}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wall length"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Height (feet)
            </label>
            <input
              type="number"
              name="height"
              value={values.height}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wall height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sheet Size
            </label>
            <select
              name="sheetSize"
              value={values.sheetSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="4x8">4' x 8' Standard</option>
              <option value="4x12">4' x 12' Long</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thickness
            </label>
            <select
              name="thickness"
              value={values.thickness}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1/4">1/4 inch</option>
              <option value="3/8">3/8 inch</option>
              <option value="1/2">1/2 inch</option>
              <option value="5/8">5/8 inch (Fire-Rated)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Openings Area (sq ft)
            </label>
            <input
              type="number"
              name="openings"
              value={values.openings}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter openings area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screw Spacing (inches)
            </label>
            <select
              name="screwSpacing"
              value={values.screwSpacing}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="6">6 inches</option>
              <option value="8">8 inches (Standard)</option>
              <option value="12">12 inches</option>
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
              <p className="text-xl">Drywall Sheets: {result.sheets} sheets</p>
              <p className="text-xl">Drywall Screws: {result.screws} screws</p>
              <p className="text-xl">Joint Compound: {result.compound} gallons</p>
              <p className="text-xl">Joint Tape: {result.tape} linear feet</p>
              <p className="text-xl">Wastage Allowance: {result.wastage} sheets</p>
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
                <li>Enter wall length and height</li>
                <li>Select drywall sheet size</li>
                <li>Choose thickness based on application</li>
                <li>Enter total area of openings (doors, windows)</li>
                <li>Select screw spacing</li>
                <li>Click "Calculate Materials" to see requirements</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Thickness Guide:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>1/4": For curved surfaces</li>
                  <li>3/8": For repairs and layering</li>
                  <li>1/2": Standard walls and ceilings</li>
                  <li>5/8": Fire-rated and soundproofing</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Installation Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Stagger joints for better strength</li>
                  <li>Use appropriate screw length</li>
                  <li>Allow for expansion gaps</li>
                  <li>Consider room humidity</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/paint" className="text-blue-600 hover:text-blue-700">
                      Paint Calculator
                    </Link>
                    {" - Calculate paint needed for finished walls"}
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

export default DrywallCalculator;