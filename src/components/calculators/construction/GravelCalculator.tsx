import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Info } from 'lucide-react';

const GravelCalculator = () => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    depth: '',
    materialType: 'gravel',
    compactionFactor: '1.15'
  });
  const [result, setResult] = useState<{
    volume: number;
    compactedVolume: number;
    weight: number;
    coverage: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const depth = parseFloat(values.depth);
    const compactionFactor = parseFloat(values.compactionFactor);
    
    // Calculate base volume in cubic yards
    const cubicFeet = length * width * (depth / 12);
    const cubicYards = cubicFeet / 27;
    
    // Calculate compacted volume needed
    const compactedVolume = cubicYards * compactionFactor;
    
    // Calculate weight (tons) based on material type
    const weightFactors = {
      gravel: 1.4,    // tons per cubic yard
      sand: 1.35,
      crushedStone: 1.45,
      topsoil: 1.1
    };
    
    const weight = compactedVolume * weightFactors[values.materialType as keyof typeof weightFactors];
    
    // Calculate coverage area
    const coverage = length * width;

    setResult({
      volume: cubicYards,
      compactedVolume,
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
        <h2 className="text-2xl font-bold">Gravel/Fill Calculator</h2>
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
              <option value="gravel">Gravel</option>
              <option value="sand">Sand</option>
              <option value="crushedStone">Crushed Stone</option>
              <option value="topsoil">Topsoil</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compaction Factor
            </label>
            <select
              name="compactionFactor"
              value={values.compactionFactor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1.15">Standard (15% - Recommended)</option>
              <option value="1.2">Heavy (20% - Driveways)</option>
              <option value="1.1">Light (10% - Landscaping)</option>
              <option value="1.25">Extra Heavy (25% - Heavy Traffic)</option>
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
              <p className="text-xl">Base Volume: {result.volume.toFixed(2)} cubic yards</p>
              <p className="text-xl">Volume Needed (with compaction): {result.compactedVolume.toFixed(2)} cubic yards</p>
              <p className="text-xl">Material Weight: {result.weight.toFixed(2)} tons</p>
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
                <li>Enter the desired depth in inches</li>
                <li>Select the material type</li>
                <li>Choose appropriate compaction factor</li>
                <li>Click "Calculate Materials" to see requirements</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Typical Applications:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Driveways: 4-6 inches depth</li>
                  <li>Walkways: 2-4 inches depth</li>
                  <li>Foundation Base: 4-8 inches depth</li>
                  <li>Landscaping: 2-3 inches depth</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Material Properties:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Gravel: Good drainage, stable base</li>
                  <li>Crushed Stone: Excellent compaction, strong base</li>
                  <li>Sand: Ideal for leveling, poor compaction</li>
                  <li>Topsoil: Best for landscaping, gardens</li>
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
                    <Link to="/calculators/construction/paver" className="text-blue-600 hover:text-blue-700">
                      Paver Calculator
                    </Link>
                    {" - Calculate paver and base materials"}
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

export default GravelCalculator;