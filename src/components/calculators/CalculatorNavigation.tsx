import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calculator, Heart, Leaf, GraduationCap } from 'lucide-react';

interface CalculatorNavigationProps {
  currentCalculator: string;
}

const calculatorTypes = [
  { id: 'construction', name: 'Construction', icon: Building2, path: '/calculators/construction' },
  { id: 'finance', name: 'Finance', icon: Calculator, path: '/calculators/finance' },
  { id: 'health', name: 'Health', icon: Heart, path: '/calculators/health' },
  { id: 'environmental', name: 'Environmental', icon: Leaf, path: '/calculators/environmental' },
  { id: 'education', name: 'Education', icon: GraduationCap, path: '/calculators/education' }
];

const CalculatorNavigation: React.FC<CalculatorNavigationProps> = ({ currentCalculator }) => {
  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Other Calculators</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {calculatorTypes
          .filter(calc => calc.id !== currentCalculator)
          .map(calc => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                to={calc.path}
                className="flex items-center p-3 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition duration-300"
              >
                <IconComponent className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium">{calc.name}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CalculatorNavigation;