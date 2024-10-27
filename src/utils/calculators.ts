// Construction Calculations
export const calculateConcreteVolume = (length: number, width: number, thickness: number): number => {
  return length * width * thickness;
};

export const calculateBricks = (length: number, height: number, brickSize: 'standard' | 'large'): number => {
  const brickArea = brickSize === 'standard' ? 0.0195 : 0.0245; // m²
  return Math.ceil((length * height) / brickArea);
};

export const calculatePaintCoverage = (area: number, coats: number): number => {
  const coveragePerLiter = 12; // m² per liter
  return Math.ceil((area * coats) / coveragePerLiter);
};

export const calculateFlooring = (length: number, width: number, tileSize: number): number => {
  const roomArea = length * width;
  const tileArea = (tileSize / 100) ** 2; // Convert cm to m²
  return Math.ceil((roomArea / tileArea) * 1.1); // Add 10% for waste
};

export const calculateMaterialCost = (quantity: number, unitPrice: number): number => {
  return quantity * unitPrice;
};