import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const LeanBodyMassCalculator = () => {
  const [values, setValues] = useState({
    weight: '',
    height: '',
    gender: 'male',
    unit: 'metric',
    method: 'boer',
    bodyFat: ''
  });
  const [result, setResult] = useState<{
    leanMass: number;
    fatMass: number;
    method: string;
    recommendation: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateLeanMass = () => {
    // Convert to metric if needed
    const weight = values.unit === 'imperial' 
      ? parseFloat(values.weight) * 0.453592 
      : parseFloat(values.weight);
    const height = values.unit === 'imperial'
      ? parseFloat(values.height) * 2.54
      : parseFloat(values.height);

    let leanMass = 0;
    let fatMass = 0;

    if (values.method === 'bodyFat' && values.bodyFat) {
      // Calculate using body fat percentage
      const bodyFatPercentage = parseFloat(values.bodyFat) / 100;
      fatMass = weight * bodyFatPercentage;
      leanMass = weight - fatMass;
    } else {
      // Calculate using Boer Formula
      if (values.gender === 'male') {
        leanMass = (0.407 * weight) + (0.267 * height) - 19.2;
      } else {
        leanMass = (0.252 * weight) + (0.473 * height) - 48.3;
      }
      fatMass = weight - leanMass;
    }

    let recommendation = '';
    const fatPercentage = (fatMass / weight) * 100;

    if (values.gender === 'male') {
      if (fatPercentage < 6) {
        recommendation = 'Current body fat percentage is very low. Consider maintaining or increasing slightly for optimal health.';
      } else if (fatPercentage <= 14) {
        recommendation = 'Excellent lean mass to fat ratio. Focus on maintaining current composition.';
      } else if (fatPercentage <= 24) {
        recommendation = 'Good body composition. Consider strength training to increase lean mass.';
      } else {
        recommendation = 'Consider implementing a balanced diet and exercise program to improve body composition.';
      }
    } else {
      if (fatPercentage < 14) {
        recommendation = 'Current body fat percentage is very low. Consider maintaining or increasing slightly for optimal health.';
      } else if (fatPercentage <= 21) {
        recommendation = 'Excellent lean mass to fat ratio. Focus on maintaining current composition.';
      } else if (fatPercentage <= 31) {
        recommendation = 'Good body composition. Consider strength training to increase lean mass.';
      } else {
        recommendation = 'Consider implementing a balanced diet and exercise program to improve body composition.';
      }
    }

    setResult({
      leanMass,
      fatMass,
      method: values.method === 'bodyFat' ? 'Body Fat Percentage' : 'Boer Formula',
      recommendation
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
        <Link to="/calculators/health" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Heart className="h-6 w-6 text-red-600 mr-2" />
        <h2 className="text-2xl font-bold">Lean Body Mass Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <option value="metric">Metric (kg/cm)</option>
              <option value="imperial">Imperial (lbs/inches)</option>
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
              Calculation Method
            </label>
            <select
              name="method"
              value={values.method}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="boer">Boer Formula</option>
              <option value="bodyFat">Body Fat Percentage</option>
            </select>
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
              placeholder="Enter weight"
              step="0.1"
            />
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
              placeholder="Enter height"
              step="0.1"
            />
          </div>
          {values.method === 'bodyFat' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Fat Percentage (%)
              </label>
              <input
                type="number"
                name="bodyFat"
                value={values.bodyFat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter body fat percentage"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculateLeanMass}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Lean Body Mass
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">
                Lean Body Mass: {result.leanMass.toFixed(1)} {values.unit === 'metric' ? 'kg' : 'lbs'}
              </p>
              <p className="text-xl">
                Fat Mass: {result.fatMass.toFixed(1)} {values.unit === 'metric' ? 'kg' : 'lbs'}
              </p>
              <p className="text-gray-600">Calculated using: {result.method}</p>
              <p className="mt-4 text-gray-700">{result.recommendation}</p>
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
                <li>Select your preferred unit system</li>
                <li>Choose your gender</li>
                <li>Select calculation method</li>
                <li>Enter your weight and height</li>
                <li>If using body fat method, enter your body fat percentage</li>
                <li>Click "Calculate Lean Body Mass" to see results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lean Body Mass: Weight of everything except fat</li>
                  <li>Fat Mass: Total weight of body fat</li>
                  <li>Results vary based on calculation method</li>
                  <li>Use for tracking progress over time</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Healthy Ranges:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Men: 10-20% body fat typically ideal</li>
                  <li>Women: 18-28% body fat typically ideal</li>
                  <li>Athletes may have lower percentages</li>
                  <li>Results vary by age and activity level</li>
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
                    <Link to="/calculators/health/body-fat" className="text-blue-600 hover:text-blue-700">
                      Body Fat Calculator
                    </Link>
                    {" - Calculate body fat percentage"}
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

export default LeanBodyMassCalculator;