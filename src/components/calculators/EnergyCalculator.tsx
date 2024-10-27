import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { LightbulbIcon, ArrowLeft } from 'lucide-react';
import HomeEnergyCalculator from './energy/HomeEnergyCalculator';
import ApplianceCalculator from './energy/ApplianceCalculator';
import SolarCalculator from './energy/SolarCalculator';
import EVSavingsCalculator from './energy/EVSavingsCalculator';
import WindCalculator from './energy/WindCalculator';
import CalculatorNavigation from './CalculatorNavigation';

const EnergyCalculatorList = () => {
  const calculators = [
    { name: 'Home Energy Calculator', path: 'home', description: 'Calculate your home energy consumption and costs' },
    { name: 'Appliance Usage Calculator', path: 'appliances', description: 'Track energy usage of household appliances' },
    { name: 'Solar Savings Calculator', path: 'solar', description: 'Estimate potential savings with solar panels' },
    { name: 'Wind Energy Calculator', path: 'wind', description: 'Calculate savings from wind turbine installation' },
    { name: 'EV Savings Calculator', path: 'ev', description: 'Compare electric vehicle costs to gas vehicles' }
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

const EnergyCalculator = () => {
  const location = useLocation();
  const isSubCalculator = location.pathname.split('/').length > 3;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {isSubCalculator && (
                <Link to="/calculators/energy" className="mr-4">
                  <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Link>
              )}
              <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Energy Calculators</h1>
            </div>
            <p className="text-gray-600">Calculate energy consumption, costs, and potential savings</p>
          </div>

          <Routes>
            <Route index element={<EnergyCalculatorList />} />
            <Route path="home" element={<HomeEnergyCalculator />} />
            <Route path="appliances" element={<ApplianceCalculator />} />
            <Route path="solar" element={<SolarCalculator />} />
            <Route path="wind" element={<WindCalculator />} />
            <Route path="ev" element={<EVSavingsCalculator />} />
          </Routes>

          <div className="mt-8">
            <CalculatorNavigation currentCalculator="energy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyCalculator;