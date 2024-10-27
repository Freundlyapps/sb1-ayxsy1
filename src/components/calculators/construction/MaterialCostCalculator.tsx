import React, { useState } from 'react';

interface MaterialCostCalculatorProps {
  onCalculate: (cost: number) => void;
}

const MaterialCostCalculator: React.FC<MaterialCostCalculatorProps> = ({ onCalculate }) => {
  const [materials, setMaterials] = useState({
    type: 'cement',
    quantity: '',
    unitPrice: '',
  });

  const handleCalculate = () => {
    const cost = parseFloat(materials.quantity) * parseFloat(materials.unitPrice);
    onCalculate(cost);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Material Cost Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={materials.type}
          onChange={(e) => setMaterials({ ...materials, type: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="cement">Cement</option>
          <option value="sand">Sand</option>
          <option value="gravel">Gravel</option>
          <option value="steel">Steel</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={materials.quantity}
          onChange={(e) => setMaterials({ ...materials, quantity: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={materials.unitPrice}
          onChange={(e) => setMaterials({ ...materials, unitPrice: e.target.value })}
          className="p-2 border rounded"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate Cost
      </button>
    </div>
  );
};

export default MaterialCostCalculator;