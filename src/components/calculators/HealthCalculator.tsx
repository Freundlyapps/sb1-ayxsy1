import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import BMICalculator from './health/BMICalculator';
import CalorieCalculator from './health/CalorieCalculator';
import HeartRateCalculator from './health/HeartRateCalculator';
import BodyFatCalculator from './health/BodyFatCalculator';
import MacroCalculator from './health/MacroCalculator';
import ProteinCalculator from './health/ProteinCalculator';
import PregnancyCalculator from './health/PregnancyCalculator';
import WaterIntakeCalculator from './health/WaterIntakeCalculator';
import WaistHipCalculator from './health/WaistHipCalculator';
import LeanBodyMassCalculator from './health/LeanBodyMassCalculator';
import CalculatorNavigation from './CalculatorNavigation';

const HealthCalculatorList = () => {
  const calculators = [
    { name: 'BMI Calculator', path: 'bmi', description: 'Calculate your Body Mass Index' },
    { name: 'Calorie Calculator', path: 'calories', description: 'Calculate daily calorie needs' },
    { name: 'Heart Rate Zones', path: 'heart-rate', description: 'Calculate training heart rate zones' },
    { name: 'Body Fat Calculator', path: 'body-fat', description: 'Calculate body fat percentage' },
    { name: 'Macro Calculator', path: 'macros', description: 'Calculate daily macro nutrient needs' },
    { name: 'Protein Calculator', path: 'protein', description: 'Calculate optimal protein intake' },
    { name: 'Pregnancy Calculator', path: 'pregnancy', description: 'Calculate pregnancy due date' },
    { name: 'Water Intake Calculator', path: 'water', description: 'Calculate daily water intake needs' },
    { name: 'Waist-to-Hip Ratio', path: 'waist-hip', description: 'Calculate waist-to-hip ratio' },
    { name: 'Lean Body Mass', path: 'lean-mass', description: 'Calculate lean body mass and body composition' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map((calc) => (
          <Link
            key={calc.path}
            to={calc.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{calc.name}</h3>
            <p className="text-gray-600">{calc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HealthCalculator = () => {
  const location = useLocation();
  const isSubCalculator = location.pathname.split('/').length > 3;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {isSubCalculator && (
                <Link to="/calculators/health" className="mr-4">
                  <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Link>
              )}
              <Heart className="h-6 w-6 text-red-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Health Calculators</h1>
            </div>
            <p className="text-gray-600">Professional health and fitness calculation tools</p>
          </div>

          <Routes>
            <Route index element={<HealthCalculatorList />} />
            <Route path="bmi" element={<BMICalculator />} />
            <Route path="calories" element={<CalorieCalculator />} />
            <Route path="heart-rate" element={<HeartRateCalculator />} />
            <Route path="body-fat" element={<BodyFatCalculator />} />
            <Route path="macros" element={<MacroCalculator />} />
            <Route path="protein" element={<ProteinCalculator />} />
            <Route path="pregnancy" element={<PregnancyCalculator />} />
            <Route path="water" element={<WaterIntakeCalculator />} />
            <Route path="waist-hip" element={<WaistHipCalculator />} />
            <Route path="lean-mass" element={<LeanBodyMassCalculator />} />
          </Routes>

          <div className="mt-8">
            <CalculatorNavigation currentCalculator="health" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;