import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Calculator, ArrowLeft } from 'lucide-react';
import ROICalculator from './finance/ROICalculator';
import LoanCalculator from './finance/LoanCalculator';
import CompoundInterestCalculator from './finance/CompoundInterestCalculator';
import RetirementCalculator from './finance/RetirementCalculator';
import SavingsGoalCalculator from './finance/SavingsGoalCalculator';
import MortgageAffordabilityCalculator from './finance/MortgageAffordabilityCalculator';
import DebtToIncomeCalculator from './finance/DebtToIncomeCalculator';
import EmergencyFundCalculator from './finance/EmergencyFundCalculator';
import EducationSavingsCalculator from './finance/EducationSavingsCalculator';
import AnnuityCalculator from './finance/AnnuityCalculator';
import CarLoanCalculator from './finance/CarLoanCalculator';
import CurrencyExchangeCalculator from './finance/CurrencyExchangeCalculator';
import CalculatorNavigation from './CalculatorNavigation';

const FinanceCalculatorList = () => {
  const calculators = [
    { name: 'ROI Calculator', path: 'roi', description: 'Calculate Return on Investment for your projects' },
    { name: 'Loan Calculator', path: 'loan', description: 'Calculate loan payments and total interest' },
    { name: 'Compound Interest', path: 'compound', description: 'Calculate compound interest over time' },
    { name: 'Retirement Planning', path: 'retirement', description: 'Plan your retirement savings and goals' },
    { name: 'Savings Goal', path: 'savings-goal', description: 'Calculate monthly savings needed to reach your target' },
    { name: 'Mortgage Affordability', path: 'mortgage', description: 'Determine how much house you can afford' },
    { name: 'Debt-to-Income Ratio', path: 'dti', description: 'Calculate your debt-to-income ratio for loan qualification' },
    { name: 'Emergency Fund', path: 'emergency-fund', description: 'Calculate how much you need in your emergency fund' },
    { name: 'Education Savings', path: 'education-savings', description: 'Plan for future education expenses' },
    { name: 'Annuity Calculator', path: 'annuity', description: 'Calculate future value of regular payments' },
    { name: 'Car Loan Calculator', path: 'car-loan', description: 'Calculate car loan payments and total costs' },
    { name: 'Currency Exchange', path: 'currency-exchange', description: 'Convert between different currencies' }
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
        <h2 className="text-xl font-semibold mb-4">How to Use Financial Calculators</h2>
        <div className="space-y-4">
          {/* Previous calculator descriptions remain unchanged */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Currency Exchange Calculator</h3>
            <p className="text-gray-600">Convert between different currencies with current exchange rates, including optional fees and transaction costs.</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Tips for Accurate Financial Planning:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Always use accurate interest rates and time periods</li>
            <li>Consider inflation in calculations</li>
            <li>Include all relevant fees and costs</li>
            <li>Review and adjust calculations periodically</li>
            <li>Keep records of your financial projections</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Related Resources:</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/calculators/construction/cost" className="text-blue-600 hover:text-blue-700">
                Construction Cost Calculator
              </Link>
              {" - Calculate project costs"}
            </li>
            <li>
              <Link to="/calculators/energy/solar" className="text-blue-600 hover:text-blue-700">
                Solar Investment Calculator
              </Link>
              {" - Calculate solar panel ROI"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const FinanceCalculator = () => {
  const location = useLocation();
  const isSubCalculator = location.pathname.split('/').length > 3;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {isSubCalculator && (
                <Link to="/calculators/finance" className="mr-4">
                  <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Link>
              )}
              <Calculator className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Financial Calculators</h1>
            </div>
            <p className="text-gray-600">Professional financial planning and analysis tools</p>
          </div>

          <Routes>
            <Route index element={<FinanceCalculatorList />} />
            <Route path="roi" element={<ROICalculator />} />
            <Route path="loan" element={<LoanCalculator />} />
            <Route path="compound" element={<CompoundInterestCalculator />} />
            <Route path="retirement" element={<RetirementCalculator />} />
            <Route path="savings-goal" element={<SavingsGoalCalculator />} />
            <Route path="mortgage" element={<MortgageAffordabilityCalculator />} />
            <Route path="dti" element={<DebtToIncomeCalculator />} />
            <Route path="emergency-fund" element={<EmergencyFundCalculator />} />
            <Route path="education-savings" element={<EducationSavingsCalculator />} />
            <Route path="annuity" element={<AnnuityCalculator />} />
            <Route path="car-loan" element={<CarLoanCalculator />} />
            <Route path="currency-exchange" element={<CurrencyExchangeCalculator />} />
          </Routes>

          <div className="mt-8">
            <CalculatorNavigation currentCalculator="finance" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;