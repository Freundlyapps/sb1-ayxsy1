// Energy Calculations
export const calculateHomeEnergyCost = (
  electricity: number,
  heating: number,
  cooling: number,
  waterHeating: number,
  otherAppliances: number
): number => {
  return electricity + heating + cooling + waterHeating + otherAppliances;
};

export const calculateApplianceUsage = (
  watts: number,
  hoursPerDay: number,
  daysPerMonth: number = 30
): number => {
  return (watts * hoursPerDay * daysPerMonth) / 1000; // Convert to kWh
};

export const calculateSolarSavings = (
  monthlyBill: number,
  roofSize: number,
  sunlightHours: number,
  systemCost: number
): {
  annualSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
} => {
  const annualSavings = monthlyBill * 12 * 0.9; // Assume 90% offset
  const paybackPeriod = systemCost / annualSavings;
  const co2Reduction = (monthlyBill * 12 * 0.9) * 0.92; // kg CO2 per kWh

  return {
    annualSavings,
    paybackPeriod,
    co2Reduction
  };
};

export const calculateEVSavings = (
  annualMiles: number,
  gasPrice: number,
  mpg: number,
  kwhPrice: number,
  evEfficiency: number
): {
  annualGasCost: number;
  annualEvCost: number;
  savings: number;
  co2Reduction: number;
} => {
  const annualGasCost = (annualMiles / mpg) * gasPrice;
  const annualEvCost = (annualMiles / evEfficiency) * kwhPrice;
  const savings = annualGasCost - annualEvCost;
  const co2Reduction = (annualMiles / mpg) * 8.887; // kg CO2 per gallon of gasoline

  return {
    annualGasCost,
    annualEvCost,
    savings,
    co2Reduction
  };
};