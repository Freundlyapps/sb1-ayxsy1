import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const CarLoanCalculator = () => {
  const [values, setValues] = useState({
    carPrice: '',
    downPayment: '',
    tradeInValue: '',
    loanTerm: '60',
    interestRate: '',
    salesTax: '0',
    includeExtras: false,
    extras: {
      registration: '',
      insurance: '',
      maintenance: ''
    }
  });
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    loanAmount: number;
    affordabilityStatus: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleCalculate = () => {
    const price = parseFloat(values.carPrice);
    const down = parseFloat(values.downPayment) || 0;
    const tradeIn = parseFloat(values.tradeInValue) || 0;
    const months = parseInt(values.loanTerm);
    const rate = parseFloat(values.interestRate) / 100 / 12; // Monthly rate
    const salesTax = parseFloat(values.salesTax) / 100;
    
    // Calculate loan amount including tax
    const taxAmount = price * salesTax;
    const loanAmount = price + taxAmount - down - tradeIn;
    
    // Calculate monthly payment using PMT formula
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, months)) / 
      (Math.pow(1 + rate, months) - 1);
    
    // Calculate total interest
    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - loanAmount;
    
    // Calculate total cost including extras if selected
    let totalCost = price + taxAmount + totalInterest;
    if (values.includeExtras) {
      totalCost += (parseFloat(values.extras.registration) || 0) +
                  (parseFloat(values.extras.insurance) || 0) * months +
                  (parseFloat(values.extras.maintenance) || 0) * months;
    }
    
    // Determine affordability (using 20% of income rule)
    let affordabilityStatus = '';
    if (monthlyPayment <= price * 0.05) affordabilityStatus = 'Easily Affordable';
    else if (monthlyPayment <= price * 0.1) affordabilityStatus = 'Affordable';
    else if (monthlyPayment <= price * 0.15) affordabilityStatus = 'Moderately Affordable';
    else affordabilityStatus = 'May Be Difficult to Afford';

    setResult({
      monthlyPayment,
      totalInterest,
      totalCost,
      loanAmount,
      affordabilityStatus
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('extras.')) {
      const extraName = name.split('.')[1];
      setValues(prev => ({
        ...prev,
        extras: {
          ...prev.extras,
          [extraName]: value
        }
      }));
    } else {
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Link to="/calculators/finance" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </Link>
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">Car Loan Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Price ($)
            </label>
            <input
              type="number"
              name="carPrice"
              value={values.carPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter car price"
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
              Trade-in Value ($)
            </label>
            <input
              type="number"
              name="tradeInValue"
              value={values.tradeInValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter trade-in value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (months)
            </label>
            <select
              name="loanTerm"
              value={values.loanTerm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
              <option value="84">84 months (7 years)</option>
            </select>
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
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sales Tax Rate (%)
            </label>
            <input
              type="number"
              name="salesTax"
              value={values.salesTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sales tax rate"
              step="0.1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeExtras"
              checked={values.includeExtras}
              onChange={(e) => setValues(prev => ({ ...prev, includeExtras: e.target.checked }))}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includeExtras" className="ml-2 text-sm text-gray-700">
              Include Additional Costs
            </label>
          </div>

          {values.includeExtras && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration/Fees ($)
                </label>
                <input
                  type="number"
                  name="extras.registration"
                  value={values.extras.registration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="One-time fees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Insurance ($)
                </label>
                <input
                  type="number"
                  name="extras.insurance"
                  value={values.extras.insurance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Monthly insurance"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Maintenance ($)
                </label>
                <input
                  type="number"
                  name="extras.maintenance"
                  value={values.extras.maintenance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Est. monthly maintenance"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Car Loan
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">Monthly Payment: ${result.monthlyPayment.toFixed(2)}</p>
              <p className="text-xl">Loan Amount: ${result.loanAmount.toFixed(2)}</p>
              <p className="text-xl">Total Interest: ${result.totalInterest.toFixed(2)}</p>
              <p className="text-xl">Total Cost: ${result.totalCost.toFixed(2)}</p>
              <p className="text-xl">Affordability: {result.affordabilityStatus}</p>
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
                <li>Enter the car price</li>
                <li>Input your down payment amount</li>
                <li>Add any trade-in value</li>
                <li>Select loan term length</li>
                <li>Enter the interest rate</li>
                <li>Input local sales tax rate</li>
                <li>Optionally include additional costs</li>
                <li>Click "Calculate Car Loan" to see results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Car Loan Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Larger down payment reduces monthly payments</li>
                  <li>Shorter loan terms mean less total interest</li>
                  <li>Consider all costs of ownership</li>
                  <li>Compare rates from multiple lenders</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">20/4/10 Rule:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>20% minimum down payment</li>
                  <li>4 years maximum loan term</li>
                  <li>10% maximum of monthly income for payments</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate other loan types"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/budget" className="text-blue-600 hover:text-blue-700">
                      Budget Calculator
                    </Link>
                    {" - Plan your monthly budget"}
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

export default CarLoanCalculator;