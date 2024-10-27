import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const PregnancyCalculator = () => {
  const [values, setValues] = useState({
    lastPeriodDate: '',
    cycleLength: '28',
    ultrasoundDate: '',
    ultrasoundWeeks: '',
    ultrasoundDays: ''
  });
  const [result, setResult] = useState<{
    dueDate: Date;
    currentWeek: number;
    trimester: number;
    milestones: { week: number; description: string }[];
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateDueDate = () => {
    let dueDate: Date;
    
    if (values.lastPeriodDate) {
      // Calculate from last menstrual period using Naegele's rule
      dueDate = new Date(values.lastPeriodDate);
      dueDate.setDate(dueDate.getDate() + (280 + (parseInt(values.cycleLength) - 28)));
    } else if (values.ultrasoundDate) {
      // Calculate from ultrasound date
      const ultrasoundDate = new Date(values.ultrasoundDate);
      const totalDays = (parseInt(values.ultrasoundWeeks) * 7) + parseInt(values.ultrasoundDays);
      const daysToAdd = 280 - totalDays;
      dueDate = new Date(ultrasoundDate.setDate(ultrasoundDate.getDate() + daysToAdd));
    } else {
      return;
    }

    // Calculate current week
    const today = new Date();
    const startDate = new Date(values.lastPeriodDate);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffDays / 7);

    // Determine trimester
    const trimester = currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3;

    // Key pregnancy milestones
    const milestones = [
      { week: 4, description: "Implantation occurs" },
      { week: 8, description: "Basic organ systems form" },
      { week: 12, description: "End of first trimester" },
      { week: 16, description: "Baby's movements may be felt" },
      { week: 20, description: "Anatomy scan ultrasound" },
      { week: 24, description: "Viability milestone" },
      { week: 28, description: "Third trimester begins" },
      { week: 32, description: "Baby's lungs mature" },
      { week: 37, description: "Full term begins" },
      { week: 40, description: "Expected due date" }
    ];

    setResult({
      dueDate,
      currentWeek,
      trimester,
      milestones
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
        <h2 className="text-2xl font-bold">Pregnancy Due Date Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Menstrual Period Date
            </label>
            <input
              type="date"
              name="lastPeriodDate"
              value={values.lastPeriodDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Cycle Length (days)
            </label>
            <select
              name="cycleLength"
              value={values.cycleLength}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 15 }, (_, i) => i + 21).map(days => (
                <option key={days} value={days}>{days} days</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Or Calculate from Ultrasound Date</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ultrasound Date
              </label>
              <input
                type="date"
                name="ultrasoundDate"
                value={values.ultrasoundDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weeks at Ultrasound
              </label>
              <input
                type="number"
                name="ultrasoundWeeks"
                value={values.ultrasoundWeeks}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weeks"
                min="0"
                max="40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days at Ultrasound
              </label>
              <input
                type="number"
                name="ultrasoundDays"
                value={values.ultrasoundDays}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter days"
                min="0"
                max="6"
              />
            </div>
          </div>
        </div>

        <button
          onClick={calculateDueDate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Due Date
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Due Date</h4>
                  <p className="text-xl">{result.dueDate.toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Current Week</h4>
                  <p className="text-xl">Week {result.currentWeek}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Trimester</h4>
                  <p className="text-xl">{result.trimester}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">Key Milestones:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.milestones.map((milestone, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${
                        milestone.week <= result.currentWeek 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-white'
                      }`}
                    >
                      <span className="font-medium">Week {milestone.week}:</span> {milestone.description}
                    </div>
                  ))}
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
                <li>Enter your last menstrual period date</li>
                <li>Select your average cycle length</li>
                <li>Or enter ultrasound information if available</li>
                <li>Click "Calculate Due Date" to see your results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Due date is an estimate (40 weeks from LMP)</li>
                  <li>Normal delivery range is 37-42 weeks</li>
                  <li>Ultrasound dates are most accurate in first trimester</li>
                  <li>Milestones help track baby's development</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Important Notes:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Only 5% of babies are born on their due date</li>
                  <li>Consult healthcare provider for medical advice</li>
                  <li>Regular prenatal care is essential</li>
                  <li>Due date may be adjusted based on ultrasounds</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/health/bmi" className="text-blue-600 hover:text-blue-700">
                      BMI Calculator
                    </Link>
                    {" - Track pregnancy weight"}
                  </li>
                  <li>
                    <Link to="/calculators/health/calories" className="text-blue-600 hover:text-blue-700">
                      Calorie Calculator
                    </Link>
                    {" - Calculate pregnancy nutrition needs"}
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

export default PregnancyCalculator;