import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const MacroCalculator = () => {
  const [values, setValues] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
    unit: 'metric'
  });
  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    breakdown: {
      proteinCalories: number;
      carbCalories: number;
      fatCalories: number;
    };
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateMacros = () => {
    // Convert to metric if needed
    const weight = values.unit === 'imperial' 
      ? parseFloat(values.weight) * 0.453592 
      : parseFloat(values.weight);
    const height = values.unit === 'imperial'
      ? parseFloat(values.height) * 2.54
      : parseFloat(values.height);
    const age = parseFloat(values.age);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (values.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    // Calculate TDEE (Total Daily Energy Expenditure)
    let calories = bmr * activityMultipliers[values.activityLevel as keyof typeof activityMultipliers];

    // Adjust calories based on goal
    switch (values.goal) {
      case 'lose':
        calories *= 0.8; // 20% deficit
        break;
      case 'gain':
        calories *= 1.1; // 10% surplus
        break;
      default:
        // maintain weight
        break;
    }

    // Calculate macros based on goal
    let proteinRatio, carbRatio, fatRatio;
    
    switch (values.goal) {
      case 'lose':
        proteinRatio = 0.40; // 40% protein
        fatRatio = 0.35;     // 35% fat
        carbRatio = 0.25;    // 25% carbs
        break;
      case 'gain':
        proteinRatio = 0.30; // 30% protein
        fatRatio = 0.25;     // 25% fat
        carbRatio = 0.45;    // 45% carbs
        break;
      default:
        proteinRatio = 0.30; // 30% protein
        fatRatio = 0.30;     // 30% fat
        carbRatio = 0.40;    // 40% carbs
        break;
    }

    const proteinCalories = calories * proteinRatio;
    const carbCalories = calories * carbRatio;
    const fatCalories = calories * fatRatio;

    // Convert calories to grams
    const protein = proteinCalories / 4;  // 4 calories per gram of protein
    const carbs = carbCalories / 4;       // 4 calories per gram of carbs
    const fats = fatCalories / 9;         // 9 calories per gram of fat

    setResult({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      breakdown: {
        proteinCalories: Math.round(proteinCalories),
        carbCalories: Math.round(carbCalories),
        fatCalories: Math.round(fatCalories)
      }
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
        <h2 className="text-2xl font-bold">Macro Nutrient Calculator</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <select
              name="goal"
              value={values.goal}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="lose">Weight Loss</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Build Muscle</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateMacros}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Macros
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Daily Macro Targets:</h3>
            <div className="space-y-2">
              <p className="text-xl">Total Calories: {result.calories} kcal</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Protein</h4>
                  <p className="text-xl">{result.protein}g</p>
                  <p className="text-sm text-gray-600">({result.breakdown.proteinCalories} kcal)</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Carbohydrates</h4>
                  <p className="text-xl">{result.carbs}g</p>
                  <p className="text-sm text-gray-600">({result.breakdown.carbCalories} kcal)</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Fats</h4>
                  <p className="text-xl">{result.fats}g</p>
                  <p className="text-sm text-gray-600">({result.breakdown.fatCalories} kcal)</p>
                </div>
              </div>
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
                <li>Enter your weight and height</li>
                <li>Input your age and select gender</li>
                <li>Choose your activity level</li>
                <li>Select your fitness goal</li>
                <li>Click "Calculate Macros" to see your targets</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Macros:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Protein: Essential for muscle repair and growth</li>
                  <li>Carbohydrates: Primary energy source</li>
                  <li>Fats: Hormone production and nutrient absorption</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Macro Ratios by Goal:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Weight Loss: Higher protein, moderate fat, lower carbs</li>
                  <li>Maintenance: Balanced protein, carbs, and fats</li>
                  <li>Muscle Gain: Moderate protein, higher carbs, moderate fat</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/calories" className="text-blue-600 hover:text-blue-700">
                      Calorie Calculator
                    </Link>
                    {" - Calculate total calorie needs"}
                  </li>
                  <li>
                    <Link to="/calculators/health/body-fat" className="text-blue-600 hover:text-blue-700">
                      Body Fat Calculator
                    </Link>
                    {" - Estimate body composition"}
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

export default MacroCalculator;