import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const PaintCalculator = () => {
  const [values, setValues] = useState({
    wallArea: '',
    coats: '2',
    paintType: 'standard'
  });
  const [result, setResult] = useState<{ liters: number; coverage: number } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const area = parseFloat(values.wallArea);
    const coats = parseInt(values.coats);
    const coveragePerLiter = values.paintType === 'standard' ? 12 : 10;
    const totalArea = area * coats;
    const litersNeeded = Math.ceil(totalArea / coveragePerLiter);
    
    setResult({
      liters: litersNeeded,
      coverage: totalArea
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
        <h2 className="text-2xl font-bold">Paint Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Area (m²)
            </label>
            <input
              type="number"
              name="wallArea"
              value={values.wallArea}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wall area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Coats
            </label>
            <select
              name="coats"
              value={values.coats}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Coat</option>
              <option value="2">2 Coats</option>
              <option value="3">3 Coats</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paint Type
            </label>
            <select
              name="paintType"
              value={values.paintType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Paint</option>
              <option value="premium">Premium Paint</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Paint Needed
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-2">
              Paint Needed: {result.liters} liters
            </p>
            <p className="text-lg">
              Total Coverage Area: {result.coverage} m²
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
                <li>Enter the total wall area in square meters</li>
                <li>Select the number of coats needed</li>
                <li>Choose the paint type (affects coverage rate)</li>
                <li>Click "Calculate Paint Needed" to get the required amount of paint</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Paint Coverage Rates:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Standard Paint: 12 m² per liter</li>
                  <li>Premium Paint: 10 m² per liter</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/construction/brick" className="text-blue-600 hover:text-blue-700">
                      Brick Calculator
                    </Link>
                    {" - Calculate bricks needed for walls"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/cost" className="text-blue-600 hover:text-blue-700">
                      Material Cost Calculator
                    </Link>
                    {" - Calculate total material costs"}
                  </li>
                  <li>
                    <Link to="/calculators/construction/concrete" className="text-blue-600 hover:text-blue-700">
                      Concrete Calculator
                    </Link>
                    {" - Calculate concrete volume needed"}
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

export default PaintCalculator;