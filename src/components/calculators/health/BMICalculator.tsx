import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const BMICalculator = () => {
  const [values, setValues] = useState({
    height: '',
    weight: '',
    unit: 'metric' // metric or imperial
  });
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateBMI = () => {
    let bmi: number;
    if (values.unit === 'metric') {
      // Height in meters, weight in kg
      const height = parseFloat(values.height) / 100;
      const weight = parseFloat(values.weight);
      bmi = weight / (height * height);
    } else {
      // Height in inches, weight in pounds
      const height = parseFloat(values.height);
      const weight = parseFloat(values.weight);
      bmi = (weight / (height * height)) * 703;
    }

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    setResult({ bmi, category });
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
        <Link to="/calculators/health" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Heart className="h-6 w-6 text-red-600 mr-2" />
        <h2 className="text-2xl font-bold">BMI Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit System
            </label>
            <select
              name="unit"
              value={values.unit}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="metric">Metric (cm/kg)</option>
              <option value="imperial">Imperial (in/lbs)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height {values.unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              name="height"
              value={values.height}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter height in ${values.unit === 'metric' ? 'centimeters' : 'inches'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight {values.unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter weight in ${values.unit === 'metric' ? 'kilograms' : 'pounds'}`}
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate BMI
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-2">BMI: {result.bmi.toFixed(1)}</p>
            <p className="text-xl">Category: {result.category}</p>
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
                <li>Select your preferred unit system (Metric or Imperial)</li>
                <li>Enter your height (in centimeters or inches)</li>
                <li>Enter your weight (in kilograms or pounds)</li>
                <li>Click "Calculate BMI" to see your Body Mass Index</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">BMI Categories:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Underweight: Less than 18.5</li>
                  <li>Normal weight: 18.5 to 24.9</li>
                  <li>Overweight: 25 to 29.9</li>
                  <li>Obese: 30 or greater</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/calories" className="text-blue-600 hover:text-blue-700">
                      Calorie Calculator
                    </Link>
                    {" - Calculate daily calorie needs"}
                  </li>
                  <li>
                    <Link to="/calculators/health/body-fat" className="text-blue-600 hover:text-blue-700">
                      Body Fat Calculator
                    </Link>
                    {" - Estimate body fat percentage"}
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

export default BMICalculator;