import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const HeartRateCalculator = () => {
  const [values, setValues] = useState({
    age: '',
    restingHeartRate: '',
    fitnessLevel: 'moderate'
  });
  const [result, setResult] = useState<{
    maxHR: number;
    zones: Array<{ name: string; min: number; max: number }>;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateHeartRateZones = () => {
    const age = parseFloat(values.age);
    const restingHR = parseFloat(values.restingHeartRate);
    const maxHR = 220 - age;
    const heartRateReserve = maxHR - restingHR;

    // Calculate heart rate zones using Karvonen formula
    const zones = [
      {
        name: 'Recovery (50-60%)',
        min: Math.round(restingHR + (heartRateReserve * 0.5)),
        max: Math.round(restingHR + (heartRateReserve * 0.6))
      },
      {
        name: 'Fat Burn (60-70%)',
        min: Math.round(restingHR + (heartRateReserve * 0.6)),
        max: Math.round(restingHR + (heartRateReserve * 0.7))
      },
      {
        name: 'Aerobic (70-80%)',
        min: Math.round(restingHR + (heartRateReserve * 0.7)),
        max: Math.round(restingHR + (heartRateReserve * 0.8))
      },
      {
        name: 'Anaerobic (80-90%)',
        min: Math.round(restingHR + (heartRateReserve * 0.8)),
        max: Math.round(restingHR + (heartRateReserve * 0.9))
      },
      {
        name: 'Maximum (90-100%)',
        min: Math.round(restingHR + (heartRateReserve * 0.9)),
        max: maxHR
      }
    ];

    setResult({ maxHR, zones });
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
        <h2 className="text-2xl font-bold">Heart Rate Zone Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resting Heart Rate (BPM)
            </label>
            <input
              type="number"
              name="restingHeartRate"
              value={values.restingHeartRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resting heart rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Level
            </label>
            <select
              name="fitnessLevel"
              value={values.fitnessLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="moderate">Moderate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateHeartRateZones}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Heart Rate Zones
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <p className="text-xl mb-4">Maximum Heart Rate: {result.maxHR} BPM</p>
            <div className="space-y-2">
              {result.zones.map((zone, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{zone.name}:</span>
                  <span>{zone.min} - {zone.max} BPM</span>
                </div>
              ))}
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
                <li>Enter your age</li>
                <li>Enter your resting heart rate (measure when fully rested)</li>
                <li>Select your fitness level</li>
                <li>Click "Calculate Heart Rate Zones" to see your target zones</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Heart Rate Zones:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Recovery (50-60%): Light activity, warm-up</li>
                  <li>Fat Burn (60-70%): Longer, easier workouts</li>
                  <li>Aerobic (70-80%): Improved cardiovascular fitness</li>
                  <li>Anaerobic (80-90%): Improved speed and performance</li>
                  <li>Maximum (90-100%): Maximum effort, short intervals</li>
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
                    <Link to="/calculators/health/bmi" className="text-blue-600 hover:text-blue-700">
                      BMI Calculator
                    </Link>
                    {" - Calculate Body Mass Index"}
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

export default HeartRateCalculator;