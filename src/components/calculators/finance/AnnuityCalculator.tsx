import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const AnnuityCalculator = () => {
  const [values, setValues] = useState({
    regularPayment: '',
    annualRate: '',
    years: '',
    paymentFrequency: 'monthly',
    annuityType: 'ordinary', // ordinary (end of period) or annuity due (start of period)
    initialAmount: ''
  });
  const [result, setResult] = useState<{
    futureValue: number;
    totalPayments: number;
    totalInterest: number;
    effectiveRate: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const payment = parseFloat(values.regularPayment);
    const annualRate = parseFloat(values.annualRate) / 100;
    const years = parseFloat(values.years);
    const initial = parseFloat(values.initialAmount) || 0;
    
    // Convert annual rate to payment frequency rate
    const paymentsPerYear = values.paymentFrequency === 'monthly' ? 12 : 
                           values.paymentFrequency === 'quarterly' ? 4 : 1;
    const ratePerPeriod = annualRate / paymentsPerYear;
    const numberOfPeriods = years * paymentsPerYear;

    // Calculate future value
    let futureValue;
    if (values.annuityType === 'ordinary') {
      futureValue = initial * Math.pow(1 + ratePerPeriod, numberOfPeriods) +
        payment * ((Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1) / ratePerPeriod);
    } else {
      // Annuity due (payments at start of period)
      futureValue = initial * Math.pow(1 + ratePerPeriod, numberOfPeriods) +
        payment * (1 + ratePerPeriod) * ((Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1) / ratePerPeriod);
    }

    const totalPayments = payment * numberOfPeriods + initial;
    const totalInterest = futureValue - totalPayments;
    const effectiveRate = (Math.pow(1 + annualRate / paymentsPerYear, paymentsPerYear) - 1) * 100;

    setResult({
      futureValue,
      totalPayments,
      totalInterest,
      effectiveRate
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
        <h2 className="text-2xl font-bold">Annuity Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Payment ($)
            </label>
            <input
              type="number"
              name="regularPayment"
              value={values.regularPayment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter payment amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              name="annualRate"
              value={values.annualRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              name="years"
              value={values.years}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Frequency
            </label>
            <select
              name="paymentFrequency"
              value={values.paymentFrequency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annuity Type
            </label>
            <select
              name="annuityType"
              value={values.annuityType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ordinary">Ordinary Annuity (End of Period)</option>
              <option value="due">Annuity Due (Start of Period)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Amount ($)
            </label>
            <input
              type="number"
              name="initialAmount"
              value={values.initialAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter initial amount"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Annuity
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Future Value: ${result.futureValue.toFixed(2)}</p>
              <p className="text-xl">Total Payments: ${result.totalPayments.toFixed(2)}</p>
              <p className="text-xl">Total Interest Earned: ${result.totalInterest.toFixed(2)}</p>
              <p className="text-xl">Effective Annual Rate: {result.effectiveRate.toFixed(2)}%</p>
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
                <li>Enter the regular payment amount</li>
                <li>Input the annual interest rate</li>
                <li>Specify the time period in years</li>
                <li>Select payment frequency</li>
                <li>Choose annuity type</li>
                <li>Add any initial amount (optional)</li>
                <li>Click "Calculate Annuity" to see results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding Annuity Types:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ordinary Annuity: Payments at end of period</li>
                  <li>Annuity Due: Payments at start of period</li>
                  <li>More frequent payments generally yield better returns</li>
                  <li>Consider tax implications of different structures</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tips for Planning:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Compare different payment frequencies</li>
                  <li>Consider inflation effects</li>
                  <li>Review terms and conditions</li>
                  <li>Consult with financial advisor for large investments</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/compound" className="text-blue-600 hover:text-blue-700">
                      Compound Interest Calculator
                    </Link>
                    {" - Calculate investment growth"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/retirement" className="text-blue-600 hover:text-blue-700">
                      Retirement Calculator
                    </Link>
                    {" - Plan for retirement"}
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

export default AnnuityCalculator;