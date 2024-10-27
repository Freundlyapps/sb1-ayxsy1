import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Info } from 'lucide-react';

const WaistHipCalculator = () => {
  const [values, setValues] = useState({
    waist: '',
    hip: '',
    gender: 'male',
    unit: 'metric'
  });
  const [result, setResult] = useState<{
    ratio: number;
    riskLevel: string;
    recommendation: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateRatio = () => {
    const waist = parseFloat(values.waist);
    const hip = parseFloat(values.hip);
    
    if (waist && hip) {
      const ratio = waist / hip;
      let riskLevel = '';
      let recommendation = '';

      if (values.gender === 'male') {
        if (ratio < 0.90) {
          riskLevel = 'Low Risk';
          recommendation = 'Your waist-to-hip ratio indicates a healthy distribution of body fat.';
        } else if (ratio <= 0.95) {
          riskLevel = 'Moderate Risk';
          recommendation = 'Consider maintaining a balanced diet and regular exercise routine.';
        } else {
          riskLevel = 'High Risk';
          recommendation = 'Consider consulting a healthcare provider about lifestyle changes.';
        }
      } else {
        if (ratio < 0.80) {
          riskLevel = 'Low Risk';
          recommendation = 'Your waist-to-hip ratio indicates a healthy distribution of body fat.';
        } else if (ratio <= 0.85) {
          riskLevel = 'Moderate Risk';
          recommendation = 'Consider maintaining a balanced diet and regular exercise routine.';
        } else {
          riskLevel = 'High Risk';
          recommendation = 'Consider consulting a healthcare provider about lifestyle changes.';
        }
      }

      setResult({ ratio, riskLevel, recommendation });
    }
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
        <h2 className="text-2xl font-bold">Waist-to-Hip Ratio Calculator</h2>
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
              Waist Circumference {values.unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              name="waist"
              value={values.waist}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter waist measurement in ${values.unit === 'metric' ? 'centimeters' : 'inches'}`}
              step="0.1"
            />
          </div>
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
              placeholder={`Enter hip measurement in ${values.unit === 'metric' ? 'centimeters' : 'inches'}`}
              step="0.1"
            />
          </div>
        </div>

        <button
          onClick={calculateRatio}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Ratio
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Waist-to-Hip Ratio: {result.ratio.toFixed(2)}</p>
              <p className="text-xl">Risk Level: {result.riskLevel}</p>
              <p className="text-gray-700">{result.recommendation}</p>
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
                <li>Measure and enter your waist circumference</li>
                <li>Measure and enter your hip circumference</li>
                <li>Click "Calculate Ratio" to see your results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Measurement Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Measure waist at narrowest point</li>
                  <li>Measure hips at widest point</li>
                  <li>Keep tape measure level</li>
                  <li>Measure directly against skin</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Risk Categories:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Men: Low Risk &lt; 0.90, High Risk &gt; 0.95</li>
                  <li>Women: Low Risk &lt; 0.80, High Risk &gt; 0.85</li>
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

export default WaistHipCalculator;