import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const WaterIntakeCalculator = () => {
  const [values, setValues] = useState({
    weight: '',
    unit: 'metric',
    activityLevel: 'moderate',
    climate: 'temperate',
    caffeineIntake: 'moderate',
    pregnancy: 'no'
  });
  const [result, setResult] = useState<{
    dailyIntake: number;
    hourlyIntake: number;
    adjustedIntake: number;
    recommendations: string[];
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateWaterIntake = () => {
    // Convert weight to kg if needed
    const weight = values.unit === 'imperial' 
      ? parseFloat(values.weight) * 0.453592 
      : parseFloat(values.weight);

    // Base calculation (30ml per kg of body weight)
    let baseIntake = weight * 30;

    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.2,
      moderate: 1.4,
      active: 1.6,
      athlete: 1.8
    };
    baseIntake *= activityMultipliers[values.activityLevel as keyof typeof activityMultipliers];

    // Climate adjustments
    const climateMultipliers = {
      cold: 0.9,
      temperate: 1.0,
      hot: 1.2,
      humid: 1.3
    };
    baseIntake *= climateMultipliers[values.climate as keyof typeof climateMultipliers];

    // Caffeine adjustments
    const caffeineAdjustments = {
      none: 0,
      light: 100,
      moderate: 200,
      heavy: 300
    };
    const caffeineCompensation = caffeineAdjustments[values.caffeineIntake as keyof typeof caffeineAdjustments];

    // Pregnancy adjustment
    if (values.pregnancy === 'yes') {
      baseIntake += 300; // Additional 300ml for pregnancy
    }

    // Calculate hourly intake (assuming 16 waking hours)
    const hourlyIntake = baseIntake / 16;

    // Adjusted intake including caffeine compensation
    const adjustedIntake = baseIntake + caffeineCompensation;

    // Generate recommendations
    const recommendations = [
      'Drink water first thing in the morning',
      'Keep a reusable water bottle with you',
      'Set reminders to drink water throughout the day'
    ];

    if (values.activityLevel === 'active' || values.activityLevel === 'athlete') {
      recommendations.push('Increase intake during and after exercise');
    }
    if (values.climate === 'hot' || values.climate === 'humid') {
      recommendations.push('Monitor hydration levels more closely in warm weather');
    }
    if (values.caffeineIntake === 'heavy') {
      recommendations.push('Consider reducing caffeine intake for better hydration');
    }

    setResult({
      dailyIntake: Math.round(baseIntake),
      hourlyIntake: Math.round(hourlyIntake),
      adjustedIntake: Math.round(adjustedIntake),
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
        <h2 className="text-2xl font-bold">Water Intake Calculator</h2>
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
              <option value="athlete">Athlete</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate
            </label>
            <select
              name="climate"
              value={values.climate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="cold">Cold</option>
              <option value="temperate">Temperate</option>
              <option value="hot">Hot</option>
              <option value="humid">Hot & Humid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caffeine Intake
            </label>
            <select
              name="caffeineIntake"
              value={values.caffeineIntake}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="light">Light (1-2 cups/day)</option>
              <option value="moderate">Moderate (3-4 cups/day)</option>
              <option value="heavy">Heavy (5+ cups/day)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pregnant/Nursing
            </label>
            <select
              name="pregnancy"
              value={values.pregnancy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateWaterIntake}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Water Intake
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Water Intake Needs:</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Daily Intake</h4>
                  <p className="text-xl">{result.dailyIntake} ml</p>
                  <p className="text-sm text-gray-600">({(result.dailyIntake/1000).toFixed(1)} liters)</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Hourly Target</h4>
                  <p className="text-xl">{result.hourlyIntake} ml</p>
                  <p className="text-sm text-gray-600">(during waking hours)</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">With Caffeine Offset</h4>
                  <p className="text-xl">{result.adjustedIntake} ml</p>
                  <p className="text-sm text-gray-600">({(result.adjustedIntake/1000).toFixed(1)} liters)</p>
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
                <li>Select your climate</li>
                <li>Indicate caffeine consumption</li>
                <li>Specify if pregnant or nursing</li>
                <li>Click "Calculate Water Intake" to see your needs</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Signs of Dehydration:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dark yellow urine</li>
                  <li>Thirst or dry mouth</li>
                  <li>Fatigue or dizziness</li>
                  <li>Decreased urination</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tips for Staying Hydrated:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Start each day with a glass of water</li>
                  <li>Carry a reusable water bottle</li>
                  <li>Set regular reminders</li>
                  <li>Eat water-rich foods</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/bmi" className="text-blue-600 hover:text-blue-700">
                      BMI Calculator
                    </Link>
                    {" - Track your body mass index"}
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

export default WaterIntakeCalculator;