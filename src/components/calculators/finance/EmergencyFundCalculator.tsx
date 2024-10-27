import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const EmergencyFundCalculator = () => {
  const [values, setValues] = useState({
    monthlyExpenses: {
      housing: '',
      utilities: '',
      food: '',
      transportation: '',
      insurance: '',
      healthcare: '',
      other: ''
    },
    monthsOfCoverage: '6',
    employmentStability: 'stable',
    dependents: '0',
    hasInsurance: 'yes'
  });
  const [result, setResult] = useState<{
    totalMonthlyExpenses: number;
    recommendedFund: number;
    minimumFund: number;
    maximumFund: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const calculateEmergencyFund = () => {
    // Calculate total monthly expenses
    const totalMonthlyExpenses = Object.values(values.monthlyExpenses)
      .reduce((sum, expense) => sum + (parseFloat(expense) || 0), 0);

    // Base months of coverage
    let baseMonths = parseInt(values.monthsOfCoverage);

    // Adjust based on factors
    if (values.employmentStability === 'unstable') baseMonths += 2;
    if (values.employmentStability === 'freelance') baseMonths += 3;
    
    const dependentsCount = parseInt(values.dependents);
    if (dependentsCount > 0) baseMonths += Math.min(dependentsCount, 3);

    if (values.hasInsurance === 'no') baseMonths += 1;

    // Calculate recommended fund
    const recommendedFund = totalMonthlyExpenses * baseMonths;
    const minimumFund = totalMonthlyExpenses * 3; // Minimum 3 months
    const maximumFund = totalMonthlyExpenses * 12; // Maximum 12 months

    setResult({
      totalMonthlyExpenses,
      recommendedFund,
      minimumFund,
      maximumFund
    });
  };

  const handleExpenseChange = (expense: keyof typeof values.monthlyExpenses, value: string) => {
    setValues(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [expense]: value
      }
    }));
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
        <Link to="/calculators/finance" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Emergency Fund Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Monthly Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Housing (Rent/Mortgage) ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.housing}
                onChange={(e) => handleExpenseChange('housing', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter housing cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Utilities ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.utilities}
                onChange={(e) => handleExpenseChange('utilities', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter utilities cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.food}
                onChange={(e) => handleExpenseChange('food', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter food cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportation ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.transportation}
                onChange={(e) => handleExpenseChange('transportation', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter transportation cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.insurance}
                onChange={(e) => handleExpenseChange('insurance', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter insurance cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Healthcare ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.healthcare}
                onChange={(e) => handleExpenseChange('healthcare', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter healthcare cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Expenses ($)
              </label>
              <input
                type="number"
                value={values.monthlyExpenses.other}
                onChange={(e) => handleExpenseChange('other', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter other expenses"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Months of Coverage
            </label>
            <select
              name="monthsOfCoverage"
              value={values.monthsOfCoverage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Stability
            </label>
            <select
              name="employmentStability"
              value={values.employmentStability}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="stable">Stable Employment</option>
              <option value="unstable">Unstable Employment</option>
              <option value="freelance">Freelance/Self-Employed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Dependents
            </label>
            <select
              name="dependents"
              value={values.dependents}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">No dependents</option>
              <option value="1">1 dependent</option>
              <option value="2">2 dependents</option>
              <option value="3">3 or more dependents</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Insurance Coverage
            </label>
            <select
              name="hasInsurance"
              value={values.hasInsurance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateEmergencyFund}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Emergency Fund
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Total Monthly Expenses: ${result.totalMonthlyExpenses.toFixed(2)}</p>
              <p className="text-xl">Recommended Emergency Fund: ${result.recommendedFund.toFixed(2)}</p>
              <p className="text-xl">Minimum Recommended: ${result.minimumFund.toFixed(2)}</p>
              <p className="text-xl">Maximum Recommended: ${result.maximumFund.toFixed(2)}</p>
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
                <li>Enter your monthly expenses by category</li>
                <li>Select desired months of coverage</li>
                <li>Choose your employment stability level</li>
                <li>Specify number of dependents</li>
                <li>Indicate health insurance status</li>
                <li>Click "Calculate Emergency Fund" to see recommendations</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Minimum: 3 months of expenses (basic safety net)</li>
                  <li>Recommended: Based on your specific situation</li>
                  <li>Maximum: 12 months for high-risk situations</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Factors That Increase Needs:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Irregular income or self-employment</li>
                  <li>Number of dependents</li>
                  <li>Lack of insurance coverage</li>
                  <li>Job market volatility</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/savings-goal" className="text-blue-600 hover:text-blue-700">
                      Savings Goal Calculator
                    </Link>
                    {" - Plan your savings targets"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/retirement" className="text-blue-600 hover:text-blue-700">
                      Retirement Calculator
                    </Link>
                    {" - Plan for long-term savings"}
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

export default EmergencyFundCalculator;