import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const ProteinCalculator = () => {
  const [values, setValues] = useState({
    weight: '',
    unit: 'metric',
    activityLevel: 'moderate',
    goal: 'maintain',
    dietType: 'balanced',
    leanMassPercent: '75'
  });
  const [result, setResult] = useState<{
    dailyProtein: number;
    mealsPerDay: number;
    proteinPerMeal: number;
    recommendations: string[];
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateProtein = () => {
    // Convert weight to kg if needed
    const weight = values.unit === 'imperial' 
      ? parseFloat(values.weight) * 0.453592 
      : parseFloat(values.weight);

    // Calculate lean mass
    const leanMass = weight * (parseFloat(values.leanMassPercent) / 100);

    // Base protein multiplier (grams per kg of lean mass)
    let proteinMultiplier = 1.6; // Default moderate activity

    // Adjust multiplier based on activity level
    switch (values.activityLevel) {
      case 'sedentary':
        proteinMultiplier = 1.2;
        break;
      case 'light':
        proteinMultiplier = 1.4;
        break;
      case 'moderate':
        proteinMultiplier = 1.6;
        break;
      case 'active':
        proteinMultiplier = 1.8;
        break;
      case 'athlete':
        proteinMultiplier = 2.0;
        break;
    }

    // Adjust for goals
    switch (values.goal) {
      case 'lose':
        proteinMultiplier += 0.2; // Higher protein for preservation during weight loss
        break;
      case 'gain':
        proteinMultiplier += 0.4; // Higher protein for muscle growth
        break;
    }

    // Adjust for diet type
    switch (values.dietType) {
      case 'vegan':
        proteinMultiplier += 0.1; // Slightly higher for plant-based proteins
        break;
      case 'keto':
        proteinMultiplier += 0.2; // Higher protein on keto diet
        break;
    }

    const dailyProtein = Math.round(leanMass * proteinMultiplier);
    const mealsPerDay = values.activityLevel === 'athlete' ? 6 : 4;
    const proteinPerMeal = Math.round(dailyProtein / mealsPerDay);

    // Generate recommendations based on diet type
    const recommendations = [];
    if (values.dietType === 'vegan') {
      recommendations.push(
        'Include complete protein sources like quinoa and soy',
        'Combine different plant proteins for better amino acid profile',
        'Consider supplementing with B12 and plant-based protein powder'
      );
    } else if (values.dietType === 'keto') {
      recommendations.push(
        'Focus on high-fat protein sources like fatty fish and eggs',
        'Monitor ketone levels when adjusting protein intake',
        'Space protein intake evenly throughout the day'
      );
    } else {
      recommendations.push(
        'Include a mix of animal and plant-based proteins',
        'Consume protein within 30 minutes post-workout',
        'Include protein with each meal for optimal absorption'
      );
    }

    setResult({
      dailyProtein,
      mealsPerDay,
      proteinPerMeal,
      recommendations
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
        <h2 className="text-2xl font-bold">Protein Intake Calculator</h2>
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
              <option value="metric">Metric (kg)</option>
              <option value="imperial">Imperial (lbs)</option>
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
              Activity Level
            </label>
            <select
              name="activityLevel"
              value={values.activityLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="active">Very Active</option>
              <option value="athlete">Athlete/Bodybuilder</option>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diet Type
            </label>
            <select
              name="dietType"
              value={values.dietType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="balanced">Balanced</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Ketogenic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Lean Mass %
            </label>
            <select
              name="leanMassPercent"
              value={values.leanMassPercent}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="65">65% (High Body Fat)</option>
              <option value="70">70% (Above Average Body Fat)</option>
              <option value="75">75% (Average)</option>
              <option value="80">80% (Fit)</option>
              <option value="85">85% (Very Fit)</option>
              <option value="90">90% (Athlete)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateProtein}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Protein Needs
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Protein Requirements:</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Daily Protein</h4>
                  <p className="text-xl">{result.dailyProtein}g</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Meals Per Day</h4>
                  <p className="text-xl">{result.mealsPerDay}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Protein Per Meal</h4>
                  <p className="text-xl">{result.proteinPerMeal}g</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-lg mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
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
                <li>Enter your current weight</li>
                <li>Choose your activity level</li>
                <li>Select your fitness goal</li>
                <li>Specify your diet type</li>
                <li>Estimate your lean mass percentage</li>
                <li>Click "Calculate Protein Needs" to see your requirements</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Daily Protein: Total protein needed per day</li>
                  <li>Meals Per Day: Recommended meal frequency</li>
                  <li>Protein Per Meal: Amount to consume each meal</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Protein Sources:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Animal: Chicken, fish, eggs, dairy</li>
                  <li>Plant: Legumes, tofu, quinoa, nuts</li>
                  <li>Supplements: Whey, casein, pea protein</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/macros" className="text-blue-600 hover:text-blue-700">
                      Macro Calculator
                    </Link>
                    {" - Calculate all macronutrient needs"}
                  </li>
                  <li>
                    <Link to="/calculators/health/calories" className="text-blue-600 hover:text-blue-700">
                      Calorie Calculator
                    </Link>
                    {" - Calculate total calorie needs"}
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

export default ProteinCalculator;