import React, { useState } from 'react';

interface FlooringCalculatorProps {
  onCalculate: (tilesNeeded: number) => void;
}

const FlooringCalculator: React.FC<FlooringCalculatorProps> = ({ onCalculate }) => {
  const [floorDimensions, setFloorDimensions] = useState({
    roomLength: '',
    roomWidth: '',
    tileSize: '30',
  });

  const handleCalculate = () => {
    const roomArea = parseFloat(floorDimensions.roomLength) * parseFloat(floorDimensions.roomWidth);
    const tileArea = (parseFloat(floorDimensions.tileSize) / 100) ** 2;
    const tilesNeeded = Math.ceil(roomArea / tileArea * 1.1);
    onCalculate(tilesNeeded);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Flooring Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Room Length (m)"
          value={floorDimensions.roomLength}
          onChange={(e) => setFloorDimensions({ ...floorDimensions, roomLength: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Room Width (m)"
          value={floorDimensions.roomWidth}
          onChange={(e) => setFloorDimensions({ ...floorDimensions, roomWidth: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          value={floorDimensions.tileSize}
          onChange={(e) => setFloorDimensions({ ...floorDimensions, tileSize: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="30">30x30 cm</option>
          <option value="45">45x45 cm</option>
          <option value="60">60x60 cm</option>
        </select>
      </div>
      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate Tiles
      </button>
    </div>
  );
};

export default FlooringCalculator;