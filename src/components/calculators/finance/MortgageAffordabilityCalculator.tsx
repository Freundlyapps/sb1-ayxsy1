import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const MortgageAffordabilityCalculator = () => {
  const [values, setValues] = useState({
    annualIncome: '',
    monthlyDebts: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '30',
    propertyTax: '1.2',
    insurance: '0.5',
    otherCosts: ''
  });
  const [result, setResult] = useState<{
    maxHomePrice: number;
    monthlyPayment: number;
    totalMonthlyPayment: number;
    breakdown: {
      principal: number;
      propertyTax: number;
      insurance: number;
      otherCosts: number;
    };
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const annualIncome = parseFloat(values.annualIncome);
    const monthlyDebts = parseFloat(values.monthlyDebts) || 0;
    const downPayment = parseFloat(values.downPayment) || 0;
    const interestRate = parseFloat(values.interestRate) / 100;
    const loanTerm = parseInt(values.loanTerm);
    const propertyTaxRate = parseFloat(values.propertyTax) / 100;
    const insuranceRate = parseFloat(values.insurance) / 100;
    const otherCosts = parseFloat(values.otherCosts) || 0;

    // Maximum monthly payment (28% of gross monthly income)
    const maxMonthlyPayment = (annualIncome / 12) * 0.28;
    
    // Maximum total monthly obligations (36% of gross monthly income)
    const maxTotalObligations = (annualIncome / 12) * 0.36;
    const availableForHousing = maxTotalObligations - monthlyDebts;

    // Use the lower of the two maximums
    const maxAvailable = Math.min(maxMonthlyPayment, availableForHousing);

    // Calculate maximum loan amount using PMT formula
    const monthlyRate = interestRate / 12;
    const payments = loanTerm * 12;
    const maxLoanAmount = (maxAvailable * (1 - Math.pow(1 + monthlyRate, -payments))) / monthlyRate;

    // Calculate maximum home price including down payment
    const maxHomePrice = maxLoanAmount + downPayment;

    // Calculate monthly principal and interest payment
    const monthlyPayment = (maxLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
      (Math.pow(1 + monthlyRate, payments) - 1);

    // Calculate other monthly costs
    const monthlyPropertyTax = (maxHomePrice * propertyTaxRate) / 12;
    const monthlyInsurance = (maxHomePrice * insuranceRate) / 12;

    // Total monthly payment
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + otherCosts;

    setResult({
      maxHomePrice,
      monthlyPayment,
      totalMonthlyPayment,
      breakdown: {
        principal: monthlyPayment,
        propertyTax: monthlyPropertyTax,
        insurance: monthlyInsurance,
        otherCosts: otherCosts
      }
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
        <Link to="/calculators/finance" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Mortgage Affordability Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income ($)
            </label>
            <input
              type="number"
              name="annualIncome"
              value={values.annualIncome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual income"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Debts ($)
            </label>
            <input
              type="number"
              name="monthlyDebts"
              value={values.monthlyDebts}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly debts"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ($)
            </label>
            <input
              type="number"
              name="downPayment"
              value={values.downPayment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter down payment"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={values.interestRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
              step="0.125"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (years)
            </label>
            <select
              name="loanTerm"
              value={values.loanTerm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Tax Rate (%)
            </label>
            <input
              type="number"
              name="propertyTax"
              value={values.propertyTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter property tax rate"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Rate (%)
            </label>
            <input
              type="number"
              name="insurance"
              value={values.insurance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter insurance rate"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Monthly Costs ($)
            </label>
            <input
              type="number"
              name="otherCosts"
              value={values.otherCosts}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter other costs"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Affordability
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Maximum Home Price: ${result.maxHomePrice.toLocaleString()}</p>
              <p className="text-xl">Monthly Principal & Interest: ${result.monthlyPayment.toFixed(2)}</p>
              <p className="text-xl">Total Monthly Payment: ${result.totalMonthlyPayment.toFixed(2)}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Monthly Payment Breakdown:</h4>
                <ul className="space-y-1">
                  <li>Principal & Interest: ${result.breakdown.principal.toFixed(2)}</li>
                  <li>Property Tax: ${result.breakdown.propertyTax.toFixed(2)}</li>
                  <li>Insurance: ${result.breakdown.insurance.toFixed(2)}</li>
                  <li>Other Costs: ${result.breakdown.otherCosts.toFixed(2)}</li>
                </ul>
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
                <li>Enter your annual gross income</li>
                <li>Input your total monthly debt payments</li>
                <li>Specify your planned down payment</li>
                <li>Enter the current mortgage interest rate</li>
                <li>Select your preferred loan term</li>
                <li>Add property tax and insurance rates</li>
                <li>Include any other monthly housing costs</li>
                <li>Click "Calculate Affordability" to see your maximum home price</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding the Results:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Maximum home price based on 28% income ratio</li>
                  <li>Total monthly obligations limited to 36% of income</li>
                  <li>Includes principal, interest, taxes, and insurance</li>
                  <li>Consider additional costs like maintenance</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate specific loan payments"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/savings-goal" className="text-blue-600 hover:text-blue-700">
                      Savings Goal Calculator
                    </Link>
                    {" - Plan your down payment savings"}
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

export default MortgageAffordabilityCalculator;