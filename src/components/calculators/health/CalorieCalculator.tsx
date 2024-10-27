import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const CalorieCalculator = () => {
  const [values, setValues] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    unit: 'metric'
  });
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateCalories = () => {
    let bmr: number;
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);
    const age = parseFloat(values.age);

    // Convert imperial to metric if needed
    const weightKg = values.unit === 'imperial' ? weight * 0.453592 : weight;
    const heightCm = values.unit === 'imperial' ? height * 2.54 : height;

    // Mifflin-St Jeor Equation
    if (values.gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const maintenance = bmr * activityMultipliers[values.activityLevel as keyof typeof activityMultipliers];
    const weightLoss = maintenance - 500; // 500 calorie deficit for weight loss
    const weightGain = maintenance + 500; // 500 calorie surplus for weight gain

    setResult({ bmr, maintenance, weightLoss, weightGain });
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
        <h2 className="text-2xl font-bold">Calorie Calculator</h2>
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
              <option value="metric">Metric (cm/kg)</option>
              <option value="imperial">Imperial (in/lbs)</option>
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
              Age
            </label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              name="activityLevel"
              value={values.activityLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="active">Active (exercise 6-7 times/week)</option>
              <option value="veryActive">Very Active (hard exercise daily)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateCalories}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Calories
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Basal Metabolic Rate: {Math.round(result.bmr)} calories/day</p>
              <p className="text-xl">Maintenance Calories: {Math.round(result.maintenance)} calories/day</p>
              <p className="text-xl">Weight Loss: {Math.round(result.weightLoss)} calories/day</p>
              <p className="text-xl">Weight Gain: {Math.round(result.weightGain)} calories/day</p>
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
                <li>Enter your age</li>
                <li>Enter your height and weight</li>
                <li>Select your activity level</li>
                <li>Click "Calculate Calories" to see your daily calorie needs</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Activity Levels:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Sedentary: Little or no exercise</li>
                  <li>Light: Light exercise 1-3 times/week</li>
                  <li>Moderate: Moderate exercise 3-5 times/week</li>
                  <li>Active: Hard exercise 6-7 times/week</li>
                  <li>Very Active: Hard daily exercise or physical job</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/bmi" className="text-blue-600 hover:text-blue-700">
                      BMI Calculator
                    </Link>
                    {" - Calculate your Body Mass Index"}
                  </li>
                  <li>
                    <Link to="/calculators/health/heart-rate" className="text-blue-600 hover:text-blue-700">
                      Heart Rate Calculator
                    </Link>
                    {" - Calculate target heart rate zones"}
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

export default CalorieCalculator;