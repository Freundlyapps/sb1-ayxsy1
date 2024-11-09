import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calculator, Heart, Leaf, LightbulbIcon, GraduationCap } from 'lucide-react';

const calculatorCategories = [
  {
    id: 'construction',
    icon: Building2,
    title: 'Construction Calculators',
    description: 'Professional tools for construction and engineering calculations.',
    path: '/calculators/construction',
    calculators: [
      { name: 'Concrete Volume', path: '/calculators/construction/concrete', description: 'Calculate concrete volume for your projects' },
      { name: 'Brick Calculator', path: '/calculators/construction/brick', description: 'Calculate bricks needed for walls' },
      { name: 'Paint Calculator', path: '/calculators/construction/paint', description: 'Calculate paint coverage needed' },
      { name: 'Material Cost', path: '/calculators/construction/cost', description: 'Calculate construction material costs' },
      { name: 'Roofing Calculator', path: '/calculators/construction/roofing', description: 'Calculate roofing materials and coverage' },
      { name: 'Rebar Calculator', path: '/calculators/construction/rebar', description: 'Calculate rebar requirements' },
      { name: 'Paver Calculator', path: '/calculators/construction/paver', description: 'Calculate paver materials needed' },
      { name: 'Building Cost', path: '/calculators/construction/building-cost', description: 'Estimate total building costs' },
      { name: 'Gravel Calculator', path: '/calculators/construction/gravel', description: 'Calculate gravel and fill materials' },
      { name: 'Landscaping', path: '/calculators/construction/landscaping', description: 'Calculate landscaping materials' },
      { name: 'Drywall Calculator', path: '/calculators/construction/drywall', description: 'Calculate drywall materials needed' },
      { name: 'Flooring Calculator', path: '/calculators/construction/flooring', description: 'Calculate flooring materials needed' }
    ]
  },
  {
    id: 'finance',
    icon: Calculator,
    title: 'Financial Calculators',
    description: 'Comprehensive tools for financial planning and analysis.',
    path: '/calculators/finance',
    calculators: [
      { name: 'ROI Calculator', path: '/calculators/finance/roi', description: 'Calculate return on investment' },
      { name: 'Loan Calculator', path: '/calculators/finance/loan', description: 'Calculate loan payments and interest' },
      { name: 'Compound Interest', path: '/calculators/finance/compound', description: 'Calculate investment growth' },
      { name: 'Retirement Planning', path: '/calculators/finance/retirement', description: 'Plan your retirement savings' },
      { name: 'Savings Goal', path: '/calculators/finance/savings-goal', description: 'Calculate savings targets' },
      { name: 'Mortgage Affordability', path: '/calculators/finance/mortgage', description: 'Calculate home buying power' },
      { name: 'Debt-to-Income', path: '/calculators/finance/dti', description: 'Calculate debt-to-income ratio' },
      { name: 'Emergency Fund', path: '/calculators/finance/emergency-fund', description: 'Plan emergency savings' },
      { name: 'Education Savings', path: '/calculators/finance/education-savings', description: 'Plan education costs' },
      { name: 'Annuity Calculator', path: '/calculators/finance/annuity', description: 'Calculate annuity payments' },
      { name: 'Car Loan', path: '/calculators/finance/car-loan', description: 'Calculate car loan payments' },
      { name: 'Currency Exchange', path: '/calculators/finance/currency-exchange', description: 'Convert between currencies' }
    ]
  },
  {
    id: 'health',
    icon: Heart,
    title: 'Health & Fitness',
    description: 'Tools for health monitoring and fitness tracking.',
    path: '/calculators/health',
    calculators: [
      { name: 'BMI Calculator', path: '/calculators/health/bmi', description: 'Calculate Body Mass Index' },
      { name: 'Calorie Calculator', path: '/calculators/health/calories', description: 'Calculate daily calorie needs' },
      { name: 'Heart Rate Zones', path: '/calculators/health/heart-rate', description: 'Calculate training zones' },
      { name: 'Body Fat', path: '/calculators/health/body-fat', description: 'Calculate body fat percentage' },
      { name: 'Macro Calculator', path: '/calculators/health/macros', description: 'Calculate macro nutrients' },
      { name: 'Protein Calculator', path: '/calculators/health/protein', description: 'Calculate protein needs' },
      { name: 'Pregnancy Calculator', path: '/calculators/health/pregnancy', description: 'Calculate due date and milestones' },
      { name: 'Water Intake', path: '/calculators/health/water', description: 'Calculate daily water needs' },
      { name: 'Waist-Hip Ratio', path: '/calculators/health/waist-hip', description: 'Calculate waist-hip ratio' },
      { name: 'Lean Body Mass', path: '/calculators/health/lean-mass', description: 'Calculate lean body mass' }
    ]
  },
  {
    id: 'environmental',
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'Calculate and analyze environmental metrics.',
    path: '/calculators/environmental',
    calculators: [
      { name: 'Carbon Footprint', path: '/calculators/environmental/carbon-footprint', description: 'Calculate your carbon emissions' },
      { name: 'Water Usage', path: '/calculators/environmental/water-usage', description: 'Track water consumption' },
      { name: 'Waste Calculator', path: '/calculators/environmental/waste', description: 'Calculate waste generation' },
      { name: 'Tree Planting', path: '/calculators/environmental/trees', description: 'Calculate carbon offset with trees' }
    ]
  },
  {
    id: 'energy',
    icon: LightbulbIcon,
    title: 'Energy Efficiency',
    description: 'Tools for energy consumption and savings calculations.',
    path: '/calculators/energy',
    calculators: [
      { name: 'Home Energy', path: '/calculators/energy/home', description: 'Calculate home energy usage' },
      { name: 'Appliance Usage', path: '/calculators/energy/appliances', description: 'Track appliance energy costs' },
      { name: 'Solar Savings', path: '/calculators/energy/solar', description: 'Calculate solar panel savings' },
      { name: 'Wind Energy', path: '/calculators/energy/wind', description: 'Calculate wind energy savings' },
      { name: 'EV Savings', path: '/calculators/energy/ev', description: 'Compare EV vs gas vehicle costs' },
      { name: 'Boiler Efficiency', path: '/calculators/energy/boiler', description: 'Calculate condensing boiler efficiency' }
    ]
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Educational Tools',
    description: 'Academic and educational calculation tools.',
    path: '/calculators/education',
    calculators: [
      { name: 'Grade Calculator', path: '/calculators/education/grades', description: 'Calculate course grades' },
      { name: 'GPA Calculator', path: '/calculators/education/gpa', description: 'Calculate Grade Point Average' },
      { name: 'Reading Time', path: '/calculators/education/reading-time', description: 'Estimate reading duration' },
      { name: 'Scientific Notation', path: '/calculators/education/scientific-notation', description: 'Convert numbers to scientific notation' }
    ]
  }
];

const Calculators = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Calculators</h1>
          <p className="text-xl text-gray-600">Choose from our comprehensive suite of industry-standard calculators</p>
        </div>

        <div className="space-y-12">
          {calculatorCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.calculators.map((calculator) => (
                      <Link
                        key={calculator.path}
                        to={calculator.path}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition duration-300"
                      >
                        <span className="text-gray-900 font-medium block mb-1">{calculator.name}</span>
                        <span className="text-sm text-gray-600">{calculator.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculator Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Professional Grade</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Industry-standard formulas</li>
                <li>High precision calculations</li>
                <li>Regular updates</li>
                <li>Verified results</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Easy to Use</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Clear instructions</li>
                <li>Intuitive interfaces</li>
                <li>Mobile responsive</li>
                <li>Quick results</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Advanced Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Save calculations</li>
                <li>Export results</li>
                <li>Detailed breakdowns</li>
                <li>Multiple units support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;