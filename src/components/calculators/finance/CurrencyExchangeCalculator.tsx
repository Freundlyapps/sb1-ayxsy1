import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info, RefreshCw } from 'lucide-react';

const CurrencyExchangeCalculator = () => {
  const [values, setValues] = useState({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    includesFees: false,
    feePercentage: '2.5'
  });
  const [result, setResult] = useState<{
    convertedAmount: number;
    rate: number;
    fees: number;
    totalCost: number;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  // Common currency pairs with example rates
  const currencies = {
    USD: { name: 'US Dollar', symbol: '$' },
    EUR: { name: 'Euro', symbol: '€' },
    GBP: { name: 'British Pound', symbol: '£' },
    JPY: { name: 'Japanese Yen', symbol: '¥' },
    AUD: { name: 'Australian Dollar', symbol: 'A$' },
    CAD: { name: 'Canadian Dollar', symbol: 'C$' },
    CHF: { name: 'Swiss Franc', symbol: 'Fr' },
    CNY: { name: 'Chinese Yuan', symbol: '¥' },
    NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' },
    INR: { name: 'Indian Rupee', symbol: '₹' }
  };

  // Example exchange rates (in practice, these would come from an API)
  const getExchangeRate = (from: string, to: string) => {
    const rates: { [key: string]: { [key: string]: number } } = {
      USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45, NZD: 1.42, INR: 74.5 },
      EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, AUD: 1.59, CAD: 1.47, CHF: 1.08, CNY: 7.59, NZD: 1.67, INR: 87.8 },
      GBP: { USD: 1.37, EUR: 1.16, JPY: 150.7, AUD: 1.85, CAD: 1.71, CHF: 1.26, CNY: 8.83, NZD: 1.94, INR: 102.1 }
    };
    return rates[from]?.[to] || 1/rates[to][from];
  };

  const handleCalculate = () => {
    const amount = parseFloat(values.amount);
    const rate = getExchangeRate(values.fromCurrency, values.toCurrency);
    const convertedAmount = amount * rate;
    
    let fees = 0;
    if (values.includesFees) {
      fees = convertedAmount * (parseFloat(values.feePercentage) / 100);
    }
    
    const totalCost = convertedAmount + fees;

    setResult({
      convertedAmount,
      rate,
      fees,
      totalCost
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
        <h2 className="text-2xl font-bold">Currency Exchange Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Currency
            </label>
            <select
              name="fromCurrency"
              value={values.fromCurrency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Currency
            </label>
            <select
              name="toCurrency"
              value={values.toCurrency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includesFees"
              checked={values.includesFees}
              onChange={(e) => setValues(prev => ({ ...prev, includesFees: e.target.checked }))}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includesFees" className="ml-2 text-sm text-gray-700">
              Include Exchange Fees
            </label>
          </div>

          {values.includesFees && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fee Percentage (%)
              </label>
              <input
                type="number"
                name="feePercentage"
                value={values.feePercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fee percentage"
                step="0.1"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate Exchange
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">
                Exchange Rate: 1 {values.fromCurrency} = {result.rate.toFixed(4)} {values.toCurrency}
              </p>
              <p className="text-xl">
                Converted Amount: {currencies[values.toCurrency].symbol}{result.convertedAmount.toFixed(2)}
              </p>
              {values.includesFees && (
                <p className="text-xl">
                  Fees: {currencies[values.toCurrency].symbol}{result.fees.toFixed(2)}
                </p>
              )}
              <p className="text-xl font-semibold">
                Total: {currencies[values.toCurrency].symbol}{result.totalCost.toFixed(2)}
              </p>
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
                <li>Enter the amount you want to convert</li>
                <li>Select the currency you're converting from</li>
                <li>Select the currency you're converting to</li>
                <li>Choose whether to include exchange fees</li>
                <li>Click "Calculate Exchange" to see the conversion</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Exchange Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Compare rates from different providers</li>
                  <li>Consider timing for better rates</li>
                  <li>Watch for hidden fees</li>
                  <li>Check for minimum exchange amounts</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Common Exchange Fees:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bank fees: 2-5%</li>
                  <li>Credit card fees: 1-3%</li>
                  <li>Exchange office fees: 3-8%</li>
                  <li>Online services: 0.5-2%</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/savings-goal" className="text-blue-600 hover:text-blue-700">
                      Savings Goal Calculator
                    </Link>
                    {" - Plan your savings in different currencies"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/investment" className="text-blue-600 hover:text-blue-700">
                      Investment Calculator
                    </Link>
                    {" - Calculate international investment returns"}
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

export default CurrencyExchangeCalculator;