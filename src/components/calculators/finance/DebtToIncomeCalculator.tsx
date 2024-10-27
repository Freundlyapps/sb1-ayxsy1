import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, Info } from 'lucide-react';

const DebtToIncomeCalculator = () => {
  const [values, setValues] = useState({
    monthlyIncome: '',
    debts: [{ name: 'Mortgage/Rent', amount: '' }],
    includeUtilities: false
  });
  const [result, setResult] = useState<{
    dtiRatio: number;
    maxAllowedDebt: number;
    remainingDebtCapacity: number;
    riskLevel: string;
  } | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const addDebt = () => {
    setValues(prev => ({
      ...prev,
      debts: [...prev.debts, { name: '', amount: '' }]
    }));
  };

  const handleDebtChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newDebts = [...values.debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setValues(prev => ({
      ...prev,
      debts: newDebts
    }));
  };

  const calculateDTI = () => {
    const monthlyIncome = parseFloat(values.monthlyIncome);
    const totalDebt = values.debts.reduce((sum, debt) => {
      return sum + (parseFloat(debt.amount) || 0);
    }, 0);

    const dtiRatio = (totalDebt / monthlyIncome) * 100;
    const maxAllowedDebt = monthlyIncome * 0.43; // 43% is typically the highest DTI for qualified mortgages
    const remainingDebtCapacity = maxAllowedDebt - totalDebt;

    let riskLevel = '';
    if (dtiRatio <= 28) riskLevel = 'Low Risk';
    else if (dtiRatio <= 36) riskLevel = 'Moderate Risk';
    else if (dtiRatio <= 43) riskLevel = 'High Risk';
    else riskLevel = 'Very High Risk';

    setResult({
      dtiRatio,
      maxAllowedDebt,
      remainingDebtCapacity,
      riskLevel
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h2 className="text-2xl font-bold">Debt-to-Income Ratio Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Gross Income ($)
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={values.monthlyIncome}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter monthly income before taxes"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Monthly Debts</h3>
          {values.debts.map((debt, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => handleDebtChange(index, 'name', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Debt name"
              />
              <input
                type="number"
                value={debt.amount}
                onChange={(e) => handleDebtChange(index, 'amount', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Monthly payment"
              />
            </div>
          ))}
          <button
            onClick={addDebt}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add Another Debt
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeUtilities"
            checked={values.includeUtilities}
            onChange={(e) => setValues(prev => ({ ...prev, includeUtilities: e.target.checked }))}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="includeUtilities" className="text-sm text-gray-700">
            Include utilities and other monthly obligations
          </label>
        </div>

        <button
          onClick={calculateDTI}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Calculate DTI Ratio
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="space-y-2">
              <p className="text-xl">DTI Ratio: {result.dtiRatio.toFixed(1)}%</p>
              <p className="text-xl">Risk Level: {result.riskLevel}</p>
              <p className="text-xl">Maximum Allowed Monthly Debt: ${result.maxAllowedDebt.toFixed(2)}</p>
              <p className="text-xl">Remaining Debt Capacity: ${result.remainingDebtCapacity.toFixed(2)}</p>
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
                <li>Enter your monthly gross income (before taxes)</li>
                <li>Add all your monthly debt payments</li>
                <li>Include or exclude utilities and other obligations</li>
                <li>Click "Calculate DTI Ratio" to see your results</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Understanding DTI Ratios:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Below 28%: Excellent debt management</li>
                  <li>28-36%: Good debt management</li>
                  <li>36-43%: Some lenders may still approve</li>
                  <li>Above 43%: May have difficulty getting loans</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">What to Include:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mortgage or rent payments</li>
                  <li>Car loans</li>
                  <li>Student loans</li>
                  <li>Credit card minimum payments</li>
                  <li>Other loan payments</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Related Calculators:</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/finance/mortgage" className="text-blue-600 hover:text-blue-700">
                      Mortgage Affordability Calculator
                    </Link>
                    {" - Calculate how much house you can afford"}
                  </li>
                  <li>
                    <Link to="/calculators/finance/loan" className="text-blue-600 hover:text-blue-700">
                      Loan Calculator
                    </Link>
                    {" - Calculate loan payments"}
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

export default DebtToIncomeCalculator;