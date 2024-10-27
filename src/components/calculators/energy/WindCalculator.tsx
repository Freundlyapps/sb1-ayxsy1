import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft, Info } from 'lucide-react';

const WindCalculator = () => {
  const [values, setValues] = useState({
    averageWindSpeed: '',
    turbineHeight: '',
    rotorDiameter: '',
    electricityRate: '',
    installationCost: ''
  });
  const [result, setResult] = useState<{
    annualOutput: number;
    annualSavings: number;
    paybackPeriod: number;
    co2Reduction: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const windSpeed = parseFloat(values.averageWindSpeed);
    const height = parseFloat(values.turbineHeight);
    const diameter = parseFloat(values.rotorDiameter);
    const rate = parseFloat(values.electricityRate);
    const cost = parseFloat(values.installationCost);

    // Simplified wind power calculation
    // P = 0.5 × ρ × A × v³ × Cp × η
    // where ρ is air density (1.225 kg/m³), A is swept area, v is wind speed
    // Cp is power coefficient (typical 0.35), η is efficiency (typical 0.85)
    const sweptArea = Math.PI * Math.pow(diameter / 2, 2);
    const airDensity = 1.225;
    const powerCoefficient = 0.35;
    const efficiency = 0.85;

    // Calculate annual energy output in kWh
    const annualOutput = 0.5 * airDensity * sweptArea * Math.pow(windSpeed, 3) * 
      powerCoefficient * efficiency * 8760 * 0.001; // 8760 hours in a year, convert to kWh

    const annualSavings = annualOutput * rate;
    const paybackPeriod = cost / annualSavings;
    const co2Reduction = annualOutput * 0.92; // kg CO2 per kWh

    setResult({
      annualOutput,
      annualSavings,
      paybackPeriod,
      co2Reduction
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/calculators/energy" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold">Wind Energy Savings Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Wind Speed (m/s)
            </label>
            <input
              type="number"
              name="averageWindSpeed"
              value={values.averageWindSpeed}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter average wind speed"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turbine Height (m)
            </label>
            <input
              type="number"
              name="turbineHeight"
              value={values.turbineHeight}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter turbine height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotor Diameter (m)
            </label>
            <input
              type="number"
              name="rotorDiameter"
              value={values.rotorDiameter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rotor diameter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Rate ($ per kWh)
            </label>
            <input
              type="number"
              name="electricityRate"
              value={values.electricityRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter electricity rate"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Installation Cost ($)
            </label>
            <input
              type="number"
              name="installationCost"
              value={values.installationCost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter installation cost"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Wind Energy Savings
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Annual Energy Output: {Math.round(result.annualOutput)} kWh</p>
              <p className="text-xl">Annual Savings: ${result.annualSavings.toFixed(2)}</p>
              <p className="text-xl">Payback Period: {result.paybackPeriod.toFixed(1)} years</p>
              <p className="text-xl">CO2 Reduction: {Math.round(result.co2Reduction)} kg/year</p>
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
                <li>Enter your location's average wind speed</li>
                <li>Input the turbine height</li>
                <li>Specify the rotor diameter</li>
                <li>Enter your electricity rate</li>
                <li>Input the total installation cost</li>
                <li>Click "Calculate Wind Energy Savings" to see potential benefits</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Important Considerations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Local wind patterns and seasonal variations</li>
                  <li>Zoning regulations and height restrictions</li>
                  <li>Maintenance costs over time</li>
                  <li>Available incentives and rebates</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/energy/solar" className="text-blue-600 hover:text-blue-700">
                      Solar Savings Calculator
                    </Link>
                    {" - Compare solar energy savings"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/roi" className="text-blue-600 hover:text-blue-700">
                      ROI Calculator
                    </Link>
                    {" - Calculate return on investment"}
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

export default WindCalculator;