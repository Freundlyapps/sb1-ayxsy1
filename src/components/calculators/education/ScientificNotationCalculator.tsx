import React, { useState } from 'react';

interface ScientificNotationCalculatorProps {
  onCalculate: (result: { scientific: string; decimal: string }) => void;
}

const ScientificNotationCalculator: React.FC<ScientificNotationCalculatorProps> = ({ onCalculate }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'toScientific' | 'toDecimal'>('toScientific');

  const calculateNotation = () => {
    try {
      if (mode === 'toScientific') {
        const num = parseFloat(input);
        const scientific = num.toExponential();
        onCalculate({ scientific, decimal: input });
      } else {
        const num = parseFloat(input);
        const decimal = num.toString();
        onCalculate({ scientific: input, decimal });
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Scientific Notation Calculator</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'toScientific' | 'toDecimal')}
            className="p-2 border rounded"
          >
            <option value="toScientific">Decimal to Scientific</option>
            <option value="toDecimal">Scientific to Decimal</option>
          </select>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder={mode === 'toScientific' ? 'Enter decimal number' : 'Enter scientific notation'}
          />
        </div>
        <button
          onClick={calculateNotation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default ScientificNotationCalculator;