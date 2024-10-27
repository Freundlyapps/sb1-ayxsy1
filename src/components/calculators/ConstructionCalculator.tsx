import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';
import ConcreteCalculator from './construction/ConcreteCalculator';
import BrickCalculator from './construction/BrickCalculator';
import PaintCalculator from './construction/PaintCalculator';
import FlooringCalculator from './construction/FlooringCalculator';
import MaterialCostCalculator from './construction/MaterialCostCalculator';
import RoofingCalculator from './construction/RoofingCalculator';
import RebarCalculator from './construction/RebarCalculator';
import PaverCalculator from './construction/PaverCalculator';
import BuildingCostCalculator from './construction/BuildingCostCalculator';
import GravelCalculator from './construction/GravelCalculator';
import LandscapingCalculator from './construction/LandscapingCalculator';
import DrywallCalculator from './construction/DrywallCalculator';
import CalculatorNavigation from './CalculatorNavigation';

const ConstructionCalculatorList = () => {
  const calculators = [
    { name: 'Concrete Volume Calculator', path: 'concrete', description: 'Calculate concrete volume for your construction projects' },
    { name: 'Brick Calculator', path: 'brick', description: 'Estimate the number of bricks needed for your walls' },
    { name: 'Paint Coverage Calculator', path: 'paint', description: 'Determine paint quantity needed for your surfaces' },
    { name: 'Flooring Calculator', path: 'flooring', description: 'Calculate flooring materials needed for your space' },
    { name: 'Material Cost Calculator', path: 'cost', description: 'Estimate costs for various construction materials' },
    { name: 'Roofing Calculator', path: 'roofing', description: 'Calculate roofing materials and coverage area' },
    { name: 'Rebar Calculator', path: 'rebar', description: 'Calculate rebar requirements for concrete reinforcement' },
    { name: 'Paver Calculator', path: 'paver', description: 'Calculate pavers and materials for patios and walkways' },
    { name: 'Building Cost Estimator', path: 'building-cost', description: 'Estimate total building construction costs' },
    { name: 'Gravel Calculator', path: 'gravel', description: 'Calculate gravel and fill materials for your project' },
    { name: 'Landscaping Calculator', path: 'landscaping', description: 'Calculate landscaping materials like mulch, soil, and stone' },
    { name: 'Drywall Calculator', path: 'drywall', description: 'Calculate drywall sheets, joint compound, and screws needed' }
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

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How to Use Construction Calculators</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Drywall Calculator</h3>
            <p className="text-gray-600">Calculate the quantity of drywall sheets, joint compound, and screws needed for your walls and ceilings.</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Tips for Accurate Calculations:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Always measure dimensions accurately using proper tools</li>
            <li>Include extra material for waste and mistakes (typically 10-15%)</li>
            <li>Consider local building codes and requirements</li>
            <li>Double-check all measurements before ordering materials</li>
            <li>Keep records of calculations for future reference</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Related Resources:</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/calculators/finance/cost" className="text-blue-600 hover:text-blue-700">
                Cost Calculator
              </Link>
              {" - Calculate total project costs"}
            </li>
            <li>
              <Link to="/calculators/environmental/waste" className="text-blue-600 hover:text-blue-700">
                Waste Calculator
              </Link>
              {" - Estimate construction waste"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ConstructionCalculator = () => {
  const location = useLocation();
  const isSubCalculator = location.pathname.split('/').length > 3;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {isSubCalculator && (
                <Link to="/calculators/construction" className="mr-4">
                  <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Link>
              )}
              <Building2 className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Construction Calculators</h1>
            </div>
            <p className="text-gray-600">Professional calculators for construction projects</p>
          </div>

          <Routes>
            <Route index element={<ConstructionCalculatorList />} />
            <Route path="concrete" element={<ConcreteCalculator />} />
            <Route path="brick" element={<BrickCalculator />} />
            <Route path="paint" element={<PaintCalculator />} />
            <Route path="flooring" element={<FlooringCalculator />} />
            <Route path="cost" element={<MaterialCostCalculator />} />
            <Route path="roofing" element={<RoofingCalculator />} />
            <Route path="rebar" element={<RebarCalculator />} />
            <Route path="paver" element={<PaverCalculator />} />
            <Route path="building-cost" element={<BuildingCostCalculator />} />
            <Route path="gravel" element={<GravelCalculator />} />
            <Route path="landscaping" element={<LandscapingCalculator />} />
            <Route path="drywall" element={<DrywallCalculator />} />
          </Routes>

          <div className="mt-8">
            <CalculatorNavigation currentCalculator="construction" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCalculator;