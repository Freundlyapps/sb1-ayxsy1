import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const BodyFatCalculator = () => {
  const [values, setValues] = useState({
    gender: 'male',
    waist: '',
    neck: '',
    height: '',
    hip: '', // For females only
    unit: 'metric'
  });
  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateBodyFat = () => {
    let bodyFat: number;
    const height = parseFloat(values.height);
    const waist = parseFloat(values.waist);
    const neck = parseFloat(values.neck);
    
    // Convert to cm if using imperial
    const heightCm = values.unit === 'imperial' ? height * 2.54 : height;
    const waistCm = values.unit === 'imperial' ? waist * 2.54 : waist;
    const neckCm = values.unit === 'imperial' ? neck * 2.54 : neck;

    if (values.gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      const hipCm = values.unit === 'imperial' ? parseFloat(values.hip) * 2.54 : parseFloat(values.hip);
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    let category = '';
    if (values.gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletes';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 14) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletes';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }

    setResult({ bodyFat, category });
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
        <h2 className="text-2xl font-bold">Body Fat Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <option value="metric">Metric (cm)</option>
              <option value="imperial">Imperial (inches)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
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
              Neck Circumference {values.unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              name="neck"
              value={values.neck}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter neck circumference"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waist Circumference {values.unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              name="waist"
              value={values.waist}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter waist circumference"
            />
          </div>
          {values.gender === 'female' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hip Circumference {values.unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <input
                type="number"
                name="hip"
                value={values.hip}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter hip circumference"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculateBodyFat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Body Fat
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-2">Body Fat: {result.bodyFat.toFixed(1)}%</p>
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
                <li>Select your preferred unit system</li>
                <li>Choose your gender</li>
                <li>Enter your height</li>
                <li>Measure and enter your neck circumference</li>
                <li>Measure and enter your waist circumference</li>
                <li>For females, measure and enter hip circumference</li>
                <li>Click "Calculate Body Fat" to see your body fat percentage</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Body Fat Categories (Male):</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Essential Fat: 2-5%</li>
                  <li>Athletes: 6-13%</li>
                  <li>Fitness: 14-17%</li>
                  <li>Average: 18-24%</li>
                  <li>Obese: 25% and higher</li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Body Fat Categories (Female):</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Essential Fat: 10-13%</li>
                  <li>Athletes: 14-20%</li>
                  <li>Fitness: 21-24%</li>
                  <li>Average: 25-31%</li>
                  <li>Obese: 32% and higher</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/bmi" className="text-blue-600 hover:text-blue-700">
                      BMI Calculator
                    </Link>
                    {" - Calculate Body Mass Index"}
                  </li>
                  <li>
                    <Link to="/calculators/health/calories" className="text-blue-600 hover:text-blue-700">
                      Calorie Calculator
                    </Link>
                    {" - Calculate daily calorie needs"}
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

export default BodyFatCalculator;