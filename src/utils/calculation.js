export const calculateEMI = (principal, years, rate) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};

export const generateAmortizationSchedule = (principal, years, rate) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const emi = calculateEMI(principal, years, rate);
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principalPayment = emi - interest;
    balance -= principalPayment;

    schedule.push({
      month: i,
      emi,
      principal: principalPayment,
      interest,
      balance: balance > 0 ? balance : 0,
    });
  }

  return schedule;
};

export const calculateFutureValue = (presentValue, years, rate) => {
  return presentValue * Math.pow(1 + rate / 100, years);
};

export const calculateTotalRent = (monthlyRent, years, growthRate) => {
  let total = 0;
  let currentRent = monthlyRent;

  for (let i = 1; i <= years; i++) {
    total += currentRent * 12;
    currentRent *= 1 + growthRate / 100;
  }

  return total;
};

export const calculateInvestmentReturn = (
  principal,
  years,
  appreciation,
  rentalYield
) => {
  const futureValue = calculateFutureValue(principal, years, appreciation);
  const rentalIncome = principal * (rentalYield / 100) * years;
  return futureValue + rentalIncome;
};

export const calculateTotalOwnershipCost = (
  carPrice,
  downPayment,
  emi,
  loanTerm,
  annualMaintenance,
  annualInsurance,
  fuelCost,
  yearsOfOwnership
) => {
  const totalLoanCost = emi * loanTerm * 12;
  const totalMaintenance = annualMaintenance * yearsOfOwnership;
  const totalInsurance = annualInsurance * yearsOfOwnership;
  const totalFuelCost = fuelCost * 12 * yearsOfOwnership;

  // Calculate depreciation (15% per year)
  let depreciation = 0;
  let currentValue = carPrice;
  for (let i = 0; i < yearsOfOwnership; i++) {
    depreciation += currentValue * 0.15;
    currentValue *= 0.85;
  }

  const totalCost =
    downPayment +
    totalLoanCost +
    totalMaintenance +
    totalInsurance +
    totalFuelCost;
  const monthlyCost = totalCost / (yearsOfOwnership * 12);

  return {
    totalCost,
    monthlyCost,
    depreciation,
  };
};

export const calculateTotalVacationCost = ({
  people,
  duration,
  hotelCostPerNight,
  flightCostPerPerson,
  mealsPerDayPerPerson,
  activitiesPerDayPerPerson,
  miscellaneousPerDay,
}) => {
  const flightsTotal = flightCostPerPerson * people;
  const hotelTotal = hotelCostPerNight * duration;
  const mealsTotal = mealsPerDayPerPerson * people * duration;
  const activitiesTotal = activitiesPerDayPerPerson * people * duration;
  const miscellaneousTotal = miscellaneousPerDay * duration;

  const totalCost =
    flightsTotal +
    hotelTotal +
    mealsTotal +
    activitiesTotal +
    miscellaneousTotal;
  const costPerPerson = totalCost / people;

  return {
    flightsTotal,
    hotelTotal,
    mealsTotal,
    activitiesTotal,
    miscellaneousTotal,
    totalCost,
    costPerPerson,
  };
};

export const calculateBuyVsRent = ({
  homePrice = 0,
  downPaymentPercent = 0,
  interestRate = 0,
  loanTerm = 0,
  maintenancePercent = 0,
  propertyTaxPercent = 0,
  homeAppreciation = 0,
  sellingCostPercent = 0,
  monthlyRent = 0,
  rentIncreasePercent = 0,
  investmentReturnPercent = 0,
  comparisonPeriod = 0,
}) => {
  // Input validation
  if (
    [
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      maintenancePercent,
      propertyTaxPercent,
      homeAppreciation,
      sellingCostPercent,
      monthlyRent,
      rentIncreasePercent,
      investmentReturnPercent,
      comparisonPeriod,
    ].some(isNaN)
  ) {
    console.error("Invalid input detected in calculateBuyVsRent");
    return null;
  }

  // Convert percentages to decimals
  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const months = loanTerm * 12;

  // Calculate monthly EMI
  let monthlyEMI = 0;
  if (monthlyRate > 0 && months > 0) {
    const rateFactor = Math.pow(1 + monthlyRate, months);
    monthlyEMI = (loanAmount * monthlyRate * rateFactor) / (rateFactor - 1);
  }

  // Calculate buying costs (absolute expenses)
  const totalEMIPaid = Math.min(comparisonPeriod, loanTerm) * 12 * monthlyEMI;
  const totalMaintenanceCost =
    homePrice * (maintenancePercent / 100) * comparisonPeriod;
  const totalPropertyTax =
    homePrice * (propertyTaxPercent / 100) * comparisonPeriod;
  const futureHomeValue =
    homePrice * Math.pow(1 + homeAppreciation / 100, comparisonPeriod);
  const sellingCost = futureHomeValue * (sellingCostPercent / 100);

  const totalBuyingExpenses =
    downPayment +
    totalEMIPaid +
    totalMaintenanceCost +
    totalPropertyTax +
    sellingCost;
  const netProfitFromHome = futureHomeValue - totalBuyingExpenses;

  // Calculate renting costs
  let totalRentPaid = 0;
  let currentRent = monthlyRent;
  for (let year = 1; year <= comparisonPeriod; year++) {
    totalRentPaid += currentRent * 12;
    currentRent *= 1 + rentIncreasePercent / 100;
  }

  // Calculate investment return
  const investmentReturn =
    downPayment *
      Math.pow(1 + investmentReturnPercent / 100, comparisonPeriod) -
    downPayment;
  const totalRentCostAdjusted = totalRentPaid - investmentReturn;

  // Make decision
  const decision = netProfitFromHome > totalRentCostAdjusted ? "BUY" : "RENT";
  const savings = Math.abs(netProfitFromHome - totalRentCostAdjusted);

  return {
    // Buying details
    loanAmount,
    monthlyEMI,
    totalBuyingExpenses,
    totalEMIPaid,
    totalMaintenanceCost,
    totalPropertyTax,
    futureHomeValue,
    sellingCost,
    netProfitFromHome,

    // Renting details
    totalRentPaid,
    investmentReturn,
    totalRentCostAdjusted,

    // Comparison results
    decision,
    savings,
    comparisonPeriod,
  };
};
