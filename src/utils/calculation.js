// Updated calculation functions for mortgage calculator

// New function to calculate total monthly payment including all costs
export const calculateTotalMonthlyPayment = (
  principal,
  years,
  rate,
  annualPropertyTax = 0,
  annualHomeInsurance = 0,
  monthlyOtherCosts = 0
) => {
  const loanEMI = calculateEMI(principal, years, rate);
  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyHomeInsurance = annualHomeInsurance / 12;

  return {
    loanEMI,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyOtherCosts,
    totalMonthlyPayment:
      loanEMI + monthlyPropertyTax + monthlyHomeInsurance + monthlyOtherCosts,
  };
};

export const generateAmortizationSchedule = (principal, years, rate) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const emi = calculateEMI(principal, years, rate);
  let balance = principal;
  const monthlySchedule = [];

  for (let i = 1; i <= months; i++) {
    const openingBalance = balance;
    const interest = balance * monthlyRate;
    const principalPayment = emi - interest;
    balance -= principalPayment;
    const closingBalance = balance > 0 ? balance : 0;

    monthlySchedule.push({
      month: i,
      emi: Math.round(emi),
      principal: Math.round(principalPayment),
      interest: Math.round(interest),
      openingBalance: Math.round(openingBalance),
      closingBalance: Math.round(closingBalance),
      balance: Math.round(closingBalance), // Keep for backward compatibility
    });

    balance = closingBalance;
    if (balance <= 0) break;
  }

  return monthlySchedule;
};

// New function to calculate total cost breakdown over the loan period
export const calculateTotalCostBreakdown = (
  principal,
  years,
  rate,
  annualPropertyTax = 0,
  annualHomeInsurance = 0,
  monthlyOtherCosts = 0
) => {
  const loanEMI = calculateEMI(principal, years, rate);
  const totalLoanPayments = loanEMI * years * 12;
  const totalInterest = totalLoanPayments - principal;
  const totalPropertyTax = annualPropertyTax * years;
  const totalHomeInsurance = annualHomeInsurance * years;
  const totalOtherCosts = monthlyOtherCosts * years * 12;

  const totalCost =
    totalLoanPayments + totalPropertyTax + totalHomeInsurance + totalOtherCosts;

  return {
    principal,
    totalInterest,
    totalLoanPayments,
    totalPropertyTax,
    totalHomeInsurance,
    totalOtherCosts,
    totalCost,
    loanEMI,
    monthlyPropertyTax: annualPropertyTax / 12,
    monthlyHomeInsurance: annualHomeInsurance / 12,
    monthlyOtherCosts,
    totalMonthlyPayment:
      loanEMI +
      annualPropertyTax / 12 +
      annualHomeInsurance / 12 +
      monthlyOtherCosts,
  };
};

export const getYearlyAmortization = (schedule) => {
  if (!schedule || schedule.length === 0) return [];

  const yearlyData = [];
  let yearStartBalance = schedule[0]?.openingBalance || 0;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearEndBalance = 0;

  for (let i = 0; i < schedule.length; i++) {
    const month = schedule[i];
    yearPrincipal += month?.principal || 0;
    yearInterest += month?.interest || 0;
    yearEndBalance = month?.closingBalance || 0;

    if ((i + 1) % 12 === 0 || i === schedule.length - 1) {
      yearlyData.push({
        year: Math.ceil((i + 1) / 12),
        startBalance: yearStartBalance,
        principal: yearPrincipal,
        interest: yearInterest,
        endBalance: yearEndBalance,
      });

      yearStartBalance = yearEndBalance;
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return yearlyData;
};

// =====================================================
// CAR PURCHASE CALCULATION FUNCTIONS
// =====================================================

// Calculate car loan details including EMI, interest, and total costs
const calculateEMI = (principal, years, rate) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
};

export const calculateCarLoanDetails = ({
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  cashIncentive = 0,
  tradeInValue = 0,
  otherFees = 0,
}) => {
  // Input validation
  if (
    [vehiclePrice, downPaymentPercent, interestRate, loanTerm].some(
      (val) => isNaN(val) || val < 0
    )
  ) {
    console.error("Invalid input detected in calculateCarLoanDetails");
    return null;
  }

  // Step 1: Calculate net vehicle price after incentives and trade-in
  const netVehiclePrice = Math.max(
    0,
    vehiclePrice - cashIncentive - tradeInValue
  );

  // Step 2: Calculate total cost (vehicle + fees, no sales tax)
  const totalVehicleCost = netVehiclePrice + otherFees;

  // Step 3: Calculate down payment on net vehicle price (not original price)
  const downPaymentAmount = (netVehiclePrice * downPaymentPercent) / 100;

  // Step 4: Calculate loan amount (what needs to be financed)
  const loanAmount = Math.max(0, totalVehicleCost - downPaymentAmount);

  // Step 5: Calculate EMI and loan payments
  const monthlyEMI =
    loanAmount > 0 ? calculateEMI(loanAmount, loanTerm, interestRate) : 0;
  const totalLoanPayments = monthlyEMI * loanTerm * 12;
  const totalInterest = Math.max(0, totalLoanPayments - loanAmount);

  // Step 6: Calculate total cost of ownership (what you actually pay out of pocket)
  const totalCostOfOwnership = downPaymentAmount + totalLoanPayments;

  // Step 7: Calculate upfront costs (paid immediately)
  const totalUpfrontCost =
    downPaymentAmount + (otherFees > loanAmount ? otherFees - loanAmount : 0);

  return {
    // Original inputs
    vehiclePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,

    // Calculated values
    netVehiclePrice,
    downPaymentAmount,
    otherFees,
    cashIncentive,
    tradeInValue,

    // Loan details
    loanAmount,
    monthlyEMI,
    totalLoanPayments,
    totalInterest,

    // Total costs
    totalVehicleCost, // Vehicle + Fees (no tax)
    totalUpfrontCost, // What you pay upfront
    totalCostOfOwnership, // What you pay over time (down payment + loan payments)

    // Additional info
    totalSavings: cashIncentive + tradeInValue,
    effectiveVehiclePrice: netVehiclePrice,
  };
};

// Generate car loan amortization schedule
export const generateCarLoanAmortization = (
  loanAmount,
  loanTerm,
  interestRate
) => {
  if (loanAmount <= 0) return [];

  const monthlyRate = interestRate / 100 / 12;
  const months = loanTerm * 12;
  const monthlyEMI = calculateEMI(loanAmount, loanTerm, interestRate);

  const schedule = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= months; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyEMI - interestPayment;
    remainingBalance = Math.max(0, remainingBalance - principalPayment);

    schedule.push({
      month,
      emi: monthlyEMI,
      principalPayment,
      interestPayment,
      remainingBalance,
      cumulativePrincipal: loanAmount - remainingBalance,
      cumulativeInterest:
        schedule.reduce((sum, payment) => sum + payment.interestPayment, 0) +
        interestPayment,
    });
  }

  return schedule;
};

// Calculate comprehensive car purchase breakdown with monthly costs
export const calculateCarPurchaseBreakdown = ({
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  cashIncentive = 0,
  tradeInValue = 0,
  otherFees = 0,
}) => {
  const loanDetails = calculateCarLoanDetails({
    vehiclePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    cashIncentive,
    tradeInValue,
    otherFees,
  });

  if (!loanDetails) return null;

  // Calculate monthly breakdown (amortized over loan term)
  const monthlyFees = otherFees / (loanTerm * 12);
  const monthlyIncentiveSavings = cashIncentive / (loanTerm * 12);
  const monthlyTradeInValue = tradeInValue / (loanTerm * 12);
  const monthlySavings = (cashIncentive + tradeInValue) / (loanTerm * 12);

  // Calculate loan-to-value ratio based on net vehicle price
  const loanToValueRatio =
    loanDetails.netVehiclePrice > 0
      ? (loanDetails.loanAmount / loanDetails.netVehiclePrice) * 100
      : 0;

  // Calculate effective annual interest rate
  const effectiveInterestRate =
    loanDetails.loanAmount > 0 && loanDetails.totalInterest > 0
      ? (loanDetails.totalInterest / loanDetails.loanAmount / loanTerm) * 100
      : 0;

  return {
    ...loanDetails,
    monthlyFees,
    monthlyIncentiveSavings,
    monthlyTradeInValue,
    monthlySavings,
    loanToValueRatio,
    effectiveInterestRate,

    // Payment breakdown for visualization
    paymentBreakdown: {
      vehiclePrice: loanDetails.netVehiclePrice,
      downPayment: loanDetails.downPaymentAmount,
      loanPrincipal: loanDetails.loanAmount,
      totalInterest: loanDetails.totalInterest,
      otherFees: otherFees,
      incentiveSavings: cashIncentive,
      tradeInValue: tradeInValue,
    },
  };
};

// Calculate car affordability based on income and debt ratios
export const calculateCarAffordability = (
  monthlyIncome,
  existingMonthlyDebts = 0,
  maxDebtToIncomeRatio = 36,
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm
) => {
  // Calculate maximum affordable monthly payment
  const maxTotalDebtPayment = (monthlyIncome * maxDebtToIncomeRatio) / 100;
  const maxMonthlyPayment = Math.max(
    0,
    maxTotalDebtPayment - existingMonthlyDebts
  );

  // Calculate car loan details for the given vehicle
  const carDetails = calculateCarLoanDetails({
    vehiclePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    cashIncentive: 0,
    tradeInValue: 0,
    otherFees: 0,
  });

  const actualMonthlyPayment = carDetails?.monthlyEMI || 0;
  const isAffordable =
    actualMonthlyPayment <= maxMonthlyPayment && actualMonthlyPayment > 0;
  const monthlyDifference = maxMonthlyPayment - actualMonthlyPayment;

  // Calculate affordability percentage
  const affordabilityPercentage =
    maxMonthlyPayment > 0
      ? (actualMonthlyPayment / maxMonthlyPayment) * 100
      : 0;

  // Calculate recommended maximum vehicle price
  const recommendedMaxVehiclePrice =
    maxMonthlyPayment > 0
      ? calculateMaxVehiclePrice(
          maxMonthlyPayment,
          downPaymentPercent,
          interestRate,
          loanTerm
        )
      : 0;

  return {
    monthlyIncome,
    existingMonthlyDebts,
    maxMonthlyPayment,
    actualMonthlyPayment,
    isAffordable,
    monthlyDifference,
    affordabilityPercentage,
    recommendedMaxVehiclePrice,
    debtToIncomeRatio: maxDebtToIncomeRatio,
    currentDebtRatio:
      monthlyIncome > 0
        ? ((existingMonthlyDebts + actualMonthlyPayment) / monthlyIncome) * 100
        : 0,
  };
};

// Helper function to calculate maximum vehicle price based on monthly payment capacity
const calculateMaxVehiclePrice = (
  maxMonthlyPayment,
  downPaymentPercent,
  interestRate,
  loanTerm
) => {
  if (maxMonthlyPayment <= 0 || interestRate < 0 || loanTerm <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const months = loanTerm * 12;

  // Calculate maximum loan amount that can be afforded with the given monthly payment
  let maxLoanAmount;

  if (monthlyRate > 0) {
    maxLoanAmount =
      (maxMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months));
  } else {
    maxLoanAmount = maxMonthlyPayment * months;
  }

  // Calculate maximum vehicle price considering down payment
  // Vehicle Price = Loan Amount / (1 - Down Payment Percentage)
  const downPaymentRatio = downPaymentPercent / 100;
  const maxVehiclePrice =
    downPaymentRatio < 1
      ? maxLoanAmount / (1 - downPaymentRatio)
      : maxLoanAmount;

  return Math.max(0, maxVehiclePrice);
};

// Compare two loan options
export const calculateBreakEvenAnalysis = (loanOption1, loanOption2) => {
  const option1Details = calculateCarLoanDetails(loanOption1);
  const option2Details = calculateCarLoanDetails(loanOption2);

  if (!option1Details || !option2Details) return null;

  return {
    option1: {
      ...option1Details,
      label: "Option 1",
    },
    option2: {
      ...option2Details,
      label: "Option 2",
    },
    comparison: {
      monthlySavings: option1Details.monthlyEMI - option2Details.monthlyEMI,
      totalSavings:
        option1Details.totalCostOfOwnership -
        option2Details.totalCostOfOwnership,
      upfrontDifference:
        option1Details.totalUpfrontCost - option2Details.totalUpfrontCost,
      betterOption:
        option1Details.totalCostOfOwnership <
        option2Details.totalCostOfOwnership
          ? "Option 1"
          : "Option 2",
    },
  };
};
// =====================================================
// EXISTING FUNCTIONS (UNCHANGED)
// =====================================================

// Keep existing functions for other calculators
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

  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const loanTermMonths = loanTerm * 12;
  const monthlyRate = interestRate / 100 / 12;
  const comparisonMonths = comparisonPeriod * 12;

  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
      : 0;

  const monthsToConsider = Math.min(loanTermMonths, comparisonMonths);
  const totalEMIPaid = emi * monthsToConsider;
  const totalMaintenance =
    homePrice * (maintenancePercent / 100) * comparisonPeriod;
  const totalPropertyTax =
    homePrice * (propertyTaxPercent / 100) * comparisonPeriod;
  const futureHomeValue =
    homePrice * Math.pow(1 + homeAppreciation / 100, comparisonPeriod);
  const sellingCost = futureHomeValue * (sellingCostPercent / 100);

  const totalBuyingCost =
    downPayment +
    totalEMIPaid +
    totalMaintenance +
    totalPropertyTax +
    sellingCost;
  const netHomeProfit = futureHomeValue - totalBuyingCost;

  // Rent Calculations
  let totalRentPaid = 0;
  let currentRent = monthlyRent;
  for (let i = 1; i <= comparisonPeriod; i++) {
    totalRentPaid += currentRent * 12;
    currentRent *= 1 + rentIncreasePercent / 100;
  }

  const investmentGrowth =
    downPayment * Math.pow(1 + investmentReturnPercent / 100, comparisonPeriod);
  const investmentReturn = investmentGrowth - downPayment;

  const adjustedRentCost = totalRentPaid - investmentReturn;

  const decision = netHomeProfit > adjustedRentCost ? "BUY" : "RENT";
  const savings = Math.abs(netHomeProfit - adjustedRentCost);

  return {
    loanAmount,
    monthlyEMI: emi,
    totalEMIPaid,
    totalMaintenance,
    totalPropertyTax,
    totalBuyingCost,
    futureHomeValue,
    sellingCost,
    netHomeProfit,
    totalRentPaid,
    investmentReturn,
    adjustedRentCost,
    downPayment,
    comparisonPeriod,
    decision,
    savings,
  };
};

// Updated calculateBuyVsRentBreakdown function - replace this in your calculation.js file

export const calculateBuyVsRentBreakdown = (
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
  comparisonPeriod
) => {
  // Calculate loan details
  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;

  // Calculate EMI using the loan amount, not home price
  const loanEMI = calculateEMI(loanAmount, loanTerm, interestRate);
  const totalLoanPayments = loanEMI * loanTerm * 12;
  const totalInterest = totalLoanPayments - loanAmount;

  // Calculate other costs
  const totalMaintenance =
    homePrice * (maintenancePercent / 100) * comparisonPeriod;
  const totalPropertyTax =
    homePrice * (propertyTaxPercent / 100) * comparisonPeriod;
  const totalSellingCost = homePrice * (sellingCostPercent / 100);

  // Calculate rent costs
  const totalRentPaid = calculateTotalRent(
    monthlyRent,
    comparisonPeriod,
    rentIncreasePercent
  );

  // Calculate home appreciation and equity
  const futureHomeValue =
    homePrice * Math.pow(1 + homeAppreciation / 100, comparisonPeriod);
  const remainingLoanBalance = Math.max(
    0,
    loanAmount -
      (loanEMI * Math.min(comparisonPeriod * 12, loanTerm * 12) - totalInterest)
  );
  const netHomeEquity =
    futureHomeValue - remainingLoanBalance - totalSellingCost;

  // Calculate investment returns for rent scenario
  const investmentReturn =
    downPayment * Math.pow(1 + investmentReturnPercent / 100, comparisonPeriod);

  // Calculate total costs
  const totalBuyingCost =
    downPayment +
    totalLoanPayments +
    totalMaintenance +
    totalPropertyTax +
    totalSellingCost;

  return {
    homePrice,
    downPayment,
    loanAmount,
    loanEMI,
    totalInterest,
    totalLoanPayments,
    totalMaintenance,
    totalPropertyTax,
    totalSellingCost,
    totalBuyingCost,
    totalRentPaid,
    futureHomeValue,
    netHomeEquity,
    investmentReturn,
    monthlyMaintenance: totalMaintenance / (comparisonPeriod * 12),
    monthlyPropertyTax: totalPropertyTax / (comparisonPeriod * 12),
    monthlySellingCost: totalSellingCost / (comparisonPeriod * 12),
    monthlyRentPaid: totalRentPaid / (comparisonPeriod * 12),
    totalMonthlyPayment:
      loanEMI +
      totalMaintenance / (comparisonPeriod * 12) +
      totalPropertyTax / (comparisonPeriod * 12),
  };
};

//Home Investment Calculator - Fixed Version
// Helper function to calculate EMI (Equated Monthly Installment)

// Helper function to calculate compound interest
const calculateCompoundInterest = (principal, rate, time) => {
  return principal * Math.pow(1 + rate / 100, time);
};

// Helper function to calculate total interest paid over loan tenure
const calculateTotalInterest = (emi, tenure, principal) => {
  const totalPayment = emi * tenure * 12;
  return totalPayment - principal;
};

// Helper function to calculate rental yield
const calculateRentalYield = (annualRent, propertyPrice) => {
  return (annualRent / propertyPrice) * 100;
};

// Helper function to calculate net cash flow per year (including maintenance)
const calculateNetCashFlow = (annualRent, emi, annualMaintenance = 0) => {
  const annualEMI = emi * 12;
  return annualRent - annualEMI - annualMaintenance;
};

// Helper function to calculate break-even point (years)
const calculateBreakEvenPoint = (totalInitialInvestment, netAnnualCashFlow) => {
  if (netAnnualCashFlow <= 0) {
    return null; // No break-even if cash flow is negative
  }
  return totalInitialInvestment / netAnnualCashFlow;
};

// Helper function to calculate ROI after a certain period
const calculateROI = (totalGains, initialInvestment) => {
  return (totalGains / initialInvestment) * 100;
};

// Main calculation function with fixes
export const calculateHomeInvestmentBreakdown = ({
  propertyPrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  annualMaintenance = 0,
  propertyAppreciationRate = 5,
  monthlyRentalIncome = 0,
  registrationFees = 0,
  stampDuty = 0,
  legalFees = 0,
}) => {
  // Basic calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // All upfront costs
  const totalUpfrontCosts =
    downPaymentAmount + registrationFees + stampDuty + legalFees;

  // EMI calculations
  const monthlyEMI = calculateEMI(loanAmount, interestRate, loanTerm);
  const totalInterestPaid = calculateTotalInterest(
    monthlyEMI,
    loanTerm,
    loanAmount
  );
  const totalLoanPayments = loanAmount + totalInterestPaid;

  // Rental calculations
  const annualRentalIncome = monthlyRentalIncome * 12;
  const rentalYield = calculateRentalYield(annualRentalIncome, propertyPrice);

  // Realistic maintenance costs (if not provided, estimate 1-2% of property value annually)
  const estimatedMaintenance = annualMaintenance || propertyPrice * 0.015;

  const netAnnualCashFlow = calculateNetCashFlow(
    annualRentalIncome,
    monthlyEMI,
    estimatedMaintenance
  );
  const monthlyNetCashFlow = netAnnualCashFlow / 12;

  // Property appreciation with realistic bounds
  const appreciationRate = Math.min(Math.max(propertyAppreciationRate, 0), 15); // Cap at 15%
  const propertyValueAfterLoanTerm = calculateCompoundInterest(
    propertyPrice,
    appreciationRate,
    loanTerm
  );

  // Total costs over loan term
  const totalMaintenanceOverTerm = estimatedMaintenance * loanTerm;
  const totalCostOfOwnership =
    totalUpfrontCosts + totalLoanPayments + totalMaintenanceOverTerm;

  // Total rental income over loan term (with realistic growth)
  const rentalGrowthRate = 3; // Assume 3% annual growth in rent
  let totalRentalIncomeOverTerm = 0;
  for (let year = 1; year <= loanTerm; year++) {
    const yearlyRent =
      annualRentalIncome * Math.pow(1 + rentalGrowthRate / 100, year - 1);
    totalRentalIncomeOverTerm += yearlyRent;
  }

  // Capital gains
  const capitalGains = propertyValueAfterLoanTerm - propertyPrice;

  // Net profit calculation
  const totalReturns = propertyValueAfterLoanTerm + totalRentalIncomeOverTerm;
  const netProfit = totalReturns - totalCostOfOwnership;

  // ROI calculations
  const overallROI = calculateROI(netProfit, totalCostOfOwnership);
  const annualizedROI = Math.pow(1 + overallROI / 100, 1 / loanTerm) - 1;

  // Break-even analysis
  const breakEvenPoint = calculateBreakEvenPoint(
    totalUpfrontCosts,
    netAnnualCashFlow
  );

  // Cash-on-cash return (first year)
  const cashOnCashReturn = (netAnnualCashFlow / totalUpfrontCosts) * 100;

  // Loan-to-value ratio
  const loanToValue = (loanAmount / propertyPrice) * 100;

  // Tax implications (basic estimate - 30% tax on rental income)
  const taxOnRentalIncome = totalRentalIncomeOverTerm * 0.3;
  const afterTaxRentalIncome = totalRentalIncomeOverTerm - taxOnRentalIncome;

  // After-tax returns
  const afterTaxTotalReturns =
    propertyValueAfterLoanTerm + afterTaxRentalIncome;
  const afterTaxNetProfit = afterTaxTotalReturns - totalCostOfOwnership;
  const afterTaxROI = calculateROI(afterTaxNetProfit, totalCostOfOwnership);

  return {
    // Basic Info
    propertyPrice,
    downPaymentAmount,
    loanAmount,
    totalUpfrontCosts,
    loanToValue,

    // EMI Details
    monthlyEMI,
    totalInterestPaid,
    totalLoanPayments,

    // Rental Income
    monthlyRentalIncome,
    annualRentalIncome,
    rentalYield,
    monthlyNetCashFlow,
    netAnnualCashFlow,
    estimatedMaintenance,

    // Property Appreciation
    propertyValueAfterLoanTerm,
    capitalGains,

    // Cost Analysis
    totalCostOfOwnership,
    totalMaintenanceOverTerm,

    // Returns Analysis
    totalReturns,
    totalRentalIncomeOverTerm,
    netProfit,
    overallROI,
    annualizedROI: annualizedROI * 100,
    cashOnCashReturn,
    breakEvenPoint,

    // Tax Considerations
    taxOnRentalIncome,
    afterTaxRentalIncome,
    afterTaxNetProfit,
    afterTaxROI,

    // Investment Summary
    summary: {
      isPositiveCashFlow: netAnnualCashFlow > 0,
      isProfitable: netProfit > 0,
      isProfitableAfterTax: afterTaxNetProfit > 0,
      paybackPeriod: breakEvenPoint,
      recommendationScore: calculateRecommendationScore(
        overallROI,
        rentalYield,
        netAnnualCashFlow > 0 ? 1 : 0,
        appreciationRate
      ),
    },
  };
};

// Helper function to calculate a recommendation score (0-100)
const calculateRecommendationScore = (
  roi,
  rentalYield,
  cashFlowPositive,
  appreciationRate
) => {
  let score = 50; // Base score

  // ROI component (35% weight)
  if (roi > 20) score += 20;
  else if (roi > 15) score += 15;
  else if (roi > 10) score += 10;
  else if (roi > 5) score += 5;
  else if (roi < 0) score -= 25;

  // Rental yield component (25% weight)
  if (rentalYield > 8) score += 15;
  else if (rentalYield > 6) score += 12;
  else if (rentalYield > 4) score += 8;
  else if (rentalYield > 2) score += 4;
  else if (rentalYield < 1) score -= 15;

  // Cash flow component (25% weight)
  if (cashFlowPositive) score += 12;
  else score -= 18;

  // Appreciation component (15% weight)
  if (appreciationRate > 10) score += 8;
  else if (appreciationRate > 7) score += 6;
  else if (appreciationRate > 5) score += 4;
  else if (appreciationRate > 3) score += 2;
  else if (appreciationRate < 2) score -= 8;

  return Math.max(0, Math.min(100, Math.round(score)));
};

// Export individual helper functions
export {
  calculateEMI,
  calculateCompoundInterest,
  calculateTotalInterest,
  calculateRentalYield,
  calculateNetCashFlow,
  calculateBreakEvenPoint,
  calculateROI,
};

//Vacation Calculator
export const calculateVacationBreakdown = ({
  numAdults,
  numChildren,
  destination,
  tripDuration,
  hotelLuxury,
  flightClass,
  mealPreference,
  activitiesBudget,
}) => {
  const totalPeople = numAdults + numChildren;

  // Flight cost calculations with more realistic 2025 pricing
  let flightCostPerAdult = 0;
  let flightCostPerChild = 0; // Children typically get 10-25% discount

  if (destination === "Domestic") {
    switch (flightClass) {
      case "Economy":
        flightCostPerAdult = 6000; // More realistic domestic pricing
        flightCostPerChild = 5000;
        break;
      case "Premium Economy":
        flightCostPerAdult = 12000;
        flightCostPerChild = 10000;
        break;
      case "Business":
        flightCostPerAdult = 20000;
        flightCostPerChild = 16000;
        break;
    }
  } else {
    // International - more realistic pricing
    switch (flightClass) {
      case "Economy":
        flightCostPerAdult = 35000; // Reduced from 45000
        flightCostPerChild = 28000;
        break;
      case "Premium Economy":
        flightCostPerAdult = 65000; // Reduced from 75000
        flightCostPerChild = 52000;
        break;
      case "Business":
        flightCostPerAdult = 120000; // Reduced from 150000
        flightCostPerChild = 95000;
        break;
    }
  }

  const totalFlightCost =
    flightCostPerAdult * numAdults + flightCostPerChild * numChildren;

  // Hotel cost calculations with more realistic pricing
  let hotelCostPerNight = 0;
  let seasonalMultiplier = 1.15; // Reduced from 1.2

  if (destination === "Domestic") {
    switch (hotelLuxury) {
      case "Budget":
        hotelCostPerNight = 2500 * seasonalMultiplier; // Reduced from 3500
        break;
      case "Mid-range":
        hotelCostPerNight = 6000 * seasonalMultiplier; // Reduced from 7500
        break;
      case "Luxury":
        hotelCostPerNight = 15000 * seasonalMultiplier; // Reduced from 18000
        break;
    }
  } else {
    // International
    switch (hotelLuxury) {
      case "Budget":
        hotelCostPerNight = 5000 * seasonalMultiplier; // Reduced from 6000
        break;
      case "Mid-range":
        hotelCostPerNight = 10000 * seasonalMultiplier; // Reduced from 12000
        break;
      case "Luxury":
        hotelCostPerNight = 20000 * seasonalMultiplier; // Reduced from 25000
        break;
    }
  }

  const totalHotelCost = hotelCostPerNight * tripDuration;

  // Meal cost calculations with more realistic pricing
  let mealCostPerPersonPerDay = 0;
  let locationMultiplier = destination === "International" ? 1.3 : 1; // Reduced from 1.5

  switch (mealPreference) {
    case "Street Food":
      mealCostPerPersonPerDay = 600 * locationMultiplier; // Reduced from 800
      break;
    case "Mix":
      mealCostPerPersonPerDay = 1500 * locationMultiplier; // Reduced from 2000
      break;
    case "Fine Dining":
      mealCostPerPersonPerDay = 3500 * locationMultiplier; // Reduced from 4500
      break;
  }

  // Children typically eat less, so 70% of adult meal cost
  const adultMealCost = mealCostPerPersonPerDay * numAdults * tripDuration;
  const childMealCost =
    mealCostPerPersonPerDay * 0.7 * numChildren * tripDuration;
  const totalMealCost = adultMealCost + childMealCost;

  // Additional cost calculations - more realistic
  const visaAndDocumentsCost =
    destination === "International" ? 6000 * totalPeople : 0; // Reduced from 8000
  const travelInsuranceCost =
    destination === "International" ? 2000 * totalPeople : 800 * totalPeople; // Reduced
  const localTransportCost =
    (destination === "International" ? 1200 : 600) * tripDuration; // Reduced

  // Shopping and miscellaneous budget (reduced to 12% from 15%)
  const baseTripCost =
    totalFlightCost + totalHotelCost + totalMealCost + activitiesBudget;
  const shoppingAndMiscCost = baseTripCost * 0.12;

  // Emergency buffer (reduced to 8% from 10%)
  const emergencyBuffer = baseTripCost * 0.08;

  // Total cost breakdown
  const totalCostBeforeExtras =
    totalFlightCost + totalHotelCost + totalMealCost + activitiesBudget;
  const totalExtraCosts =
    visaAndDocumentsCost +
    travelInsuranceCost +
    localTransportCost +
    shoppingAndMiscCost;
  const totalCostWithExtras = totalCostBeforeExtras + totalExtraCosts;
  const recommendedBudget = totalCostWithExtras + emergencyBuffer;

  // Cost per person analysis
  const costPerPerson = recommendedBudget / totalPeople;
  const costPerDay = recommendedBudget / tripDuration;
  const costPerPersonPerDay = costPerPerson / tripDuration;

  // Budget category analysis with updated thresholds
  const getBudgetCategory = (totalCost) => {
    if (totalCost < 80000) return "Budget Trip";
    if (totalCost < 250000) return "Mid-range Trip";
    if (totalCost < 500000) return "Premium Trip";
    return "Luxury Trip";
  };

  // More realistic optimization calculations
  const costOptimizations = {
    // Flight savings: realistic 15-25% savings by downgrading class
    flightSavings:
      flightClass === "Business"
        ? totalFlightCost * 0.25
        : flightClass === "Premium Economy"
        ? totalFlightCost * 0.15
        : 0,

    // Hotel savings: 20-30% savings by choosing budget option
    hotelSavings:
      hotelLuxury === "Luxury"
        ? totalHotelCost * 0.3
        : hotelLuxury === "Mid-range"
        ? totalHotelCost * 0.2
        : 0,

    // Meal savings: 25-40% savings by choosing local food
    mealSavings:
      mealPreference === "Fine Dining"
        ? totalMealCost * 0.4
        : mealPreference === "Mix"
        ? totalMealCost * 0.25
        : 0,
  };

  const potentialSavings = Object.values(costOptimizations).reduce(
    (sum, saving) => sum + saving,
    0
  );

  // Value analysis with updated thresholds
  const valueMetrics = {
    costEfficiency:
      costPerPersonPerDay < 4000
        ? "Excellent"
        : costPerPersonPerDay < 7000
        ? "Good"
        : costPerPersonPerDay < 12000
        ? "Average"
        : "Premium",
    tripLength:
      tripDuration < 4
        ? "Short Trip"
        : tripDuration < 8
        ? "Standard Trip"
        : tripDuration < 15
        ? "Extended Trip"
        : "Long Vacation",
  };

  return {
    // Basic trip details
    tripDetails: {
      totalPeople,
      numAdults,
      numChildren,
      destination,
      tripDuration,
      budgetCategory: getBudgetCategory(recommendedBudget),
    },

    // Main cost breakdown
    costs: {
      flights: {
        adults: flightCostPerAdult * numAdults,
        children: flightCostPerChild * numChildren,
        total: totalFlightCost,
      },
      accommodation: {
        perNight: hotelCostPerNight,
        totalNights: tripDuration,
        total: totalHotelCost,
      },
      meals: {
        adultCost: adultMealCost,
        childCost: childMealCost,
        total: totalMealCost,
        perPersonPerDay: mealCostPerPersonPerDay,
      },
      activities: activitiesBudget,
    },

    // Additional costs
    additionalCosts: {
      visaAndDocuments: visaAndDocumentsCost,
      travelInsurance: travelInsuranceCost,
      localTransport: localTransportCost,
      shoppingAndMisc: shoppingAndMiscCost,
      total: totalExtraCosts,
    },

    // Total calculations
    totals: {
      baseTripCost: totalCostBeforeExtras,
      totalWithExtras: totalCostWithExtras,
      emergencyBuffer: emergencyBuffer,
      recommendedBudget: recommendedBudget,
    },

    // Per person/day analysis
    perPersonAnalysis: {
      costPerPerson: costPerPerson,
      costPerDay: costPerDay,
      costPerPersonPerDay: costPerPersonPerDay,
    },

    // Optimization suggestions with realistic savings
    optimizations: {
      potentialSavings: potentialSavings,
      suggestions: costOptimizations,
      optimizedTotalBudget: recommendedBudget - potentialSavings,
      optimizedPerPersonBudget:
        (recommendedBudget - potentialSavings) / totalPeople,
    },

    // Value metrics
    valueAnalysis: valueMetrics,

    // Summary for display
    summary: {
      isAffordable: costPerPersonPerDay < 10000, // Updated threshold
      isValueForMoney:
        valueMetrics.costEfficiency === "Excellent" ||
        valueMetrics.costEfficiency === "Good",
      recommendationScore: calculateRecommendation(
        costPerPersonPerDay,
        tripDuration,
        destination
      ),
      keyInsights: generateKeyInsights(
        recommendedBudget,
        costPerPersonPerDay,
        destination,
        tripDuration,
        totalPeople
      ),
    },
  };
};

// Helper function to calculate recommendation score
const calculateRecommendation = (
  costPerPersonPerDay,
  duration,
  destination
) => {
  let score = 5; // Base score out of 10

  // Cost efficiency factor
  if (costPerPersonPerDay < 4000) score += 2;
  else if (costPerPersonPerDay < 7000) score += 1;
  else if (costPerPersonPerDay > 12000) score -= 1;

  // Duration factor
  if (duration >= 5 && duration <= 10) score += 1;
  if (duration < 3) score -= 1;

  // Destination factor
  if (destination === "International") score += 1;

  return Math.min(Math.max(score, 1), 10);
};

// Helper function to generate key insights
const generateKeyInsights = (
  totalBudget,
  costPerPersonPerDay,
  destination,
  duration,
  totalPeople
) => {
  const insights = [];

  if (costPerPersonPerDay < 4000) {
    insights.push("Excellent value for money trip");
  } else if (costPerPersonPerDay > 12000) {
    insights.push("Premium vacation experience");
  }

  if (destination === "International" && totalBudget < 150000) {
    insights.push("Budget-friendly international trip");
  }

  if (duration > 10) {
    insights.push("Extended vacation - great for relaxation");
  }

  if (totalBudget > 400000) {
    insights.push("Luxury vacation - premium experience");
  }

  // Add per-person context
  const perPersonTotal = totalBudget / totalPeople;
  if (perPersonTotal < 50000) {
    insights.push(
      `Affordable at ₹${Math.round(perPersonTotal / 1000)}K per person`
    );
  }

  return insights;
};

//Wedding Calculations
export const calculateWeddingBreakdown = ({
  totalBudget,
  guestCount,
  foodAmount,
  decorationAmount,
  photographyAmount,
  venueAmount,
  clothingAmount,
  makeupAmount,
  entertainmentAmount,
  accommodationAmount,
  invitationAmount,
  weddingPlanner,
}) => {
  // Calculate wedding planner cost (typically 10-15% of total budget if hired)
  const weddingPlannerCost = weddingPlanner === "Yes" ? totalBudget * 0.12 : 0;

  // Main wedding expenses
  const mainExpenses = {
    food: {
      amount: foodAmount,
      perGuest: guestCount > 0 ? foodAmount / guestCount : 0,
      percentage: totalBudget > 0 ? (foodAmount / totalBudget) * 100 : 0,
    },
    venue: {
      amount: venueAmount,
      percentage: totalBudget > 0 ? (venueAmount / totalBudget) * 100 : 0,
    },
    decoration: {
      amount: decorationAmount,
      percentage: totalBudget > 0 ? (decorationAmount / totalBudget) * 100 : 0,
    },
    photography: {
      amount: photographyAmount,
      percentage: totalBudget > 0 ? (photographyAmount / totalBudget) * 100 : 0,
    },
    clothing: {
      amount: clothingAmount,
      percentage: totalBudget > 0 ? (clothingAmount / totalBudget) * 100 : 0,
    },
    makeup: {
      amount: makeupAmount,
      percentage: totalBudget > 0 ? (makeupAmount / totalBudget) * 100 : 0,
    },
    entertainment: {
      amount: entertainmentAmount,
      percentage:
        totalBudget > 0 ? (entertainmentAmount / totalBudget) * 100 : 0,
    },
    accommodation: {
      amount: accommodationAmount,
      percentage:
        totalBudget > 0 ? (accommodationAmount / totalBudget) * 100 : 0,
    },
    invitations: {
      amount: invitationAmount,
      percentage: totalBudget > 0 ? (invitationAmount / totalBudget) * 100 : 0,
    },
  };

  // Calculate total allocated expenses
  const totalAllocated =
    foodAmount +
    venueAmount +
    decorationAmount +
    photographyAmount +
    clothingAmount +
    makeupAmount +
    entertainmentAmount +
    accommodationAmount +
    invitationAmount +
    weddingPlannerCost;

  // Additional costs (typically 10-20% of main costs for miscellaneous expenses)
  const miscellaneousExpenses = {
    weddingPlanner: {
      amount: weddingPlannerCost,
      percentage:
        totalBudget > 0 ? (weddingPlannerCost / totalBudget) * 100 : 0,
    },
    transportationGuests: {
      amount: Math.round(guestCount * 200), // Estimated ₹200 per guest for local transport
      percentage:
        totalBudget > 0 ? ((guestCount * 200) / totalBudget) * 100 : 0,
    },
    emergencyBuffer: {
      amount: Math.round(totalBudget * 0.1), // 10% emergency buffer
      percentage: 10,
    },
    religiousCeremonies: {
      amount: Math.round(totalBudget * 0.05), // 5% for puja items, pandit fees, etc.
      percentage: 5,
    },
  };

  const totalMiscellaneous =
    miscellaneousExpenses.weddingPlanner.amount +
    miscellaneousExpenses.transportationGuests.amount +
    miscellaneousExpenses.emergencyBuffer.amount +
    miscellaneousExpenses.religiousCeremonies.amount;

  const grandTotal = totalAllocated + totalMiscellaneous;

  // Budget analysis
  const budgetStatus = {
    isOverBudget: grandTotal > totalBudget,
    difference: grandTotal - totalBudget,
    utilizationPercentage:
      totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0,
    remainingBudget: totalBudget - totalAllocated,
  };

  // Per guest analysis
  const perGuestAnalysis = {
    totalCostPerGuest: guestCount > 0 ? grandTotal / guestCount : 0,
    foodCostPerGuest: guestCount > 0 ? foodAmount / guestCount : 0,
    averageCostPerGuest: guestCount > 0 ? totalBudget / guestCount : 0,
  };

  // Category-wise analysis (sorted by amount)
  const categoryBreakdown = Object.entries(mainExpenses)
    .map(([key, value]) => ({
      category: key,
      amount: value.amount,
      percentage: value.percentage,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Budget recommendations based on Indian wedding standards
  const recommendations = {
    food: {
      recommended: totalBudget * 0.25, // 25% of budget
      current: foodAmount,
      status:
        foodAmount < totalBudget * 0.2
          ? "low"
          : foodAmount > totalBudget * 0.3
          ? "high"
          : "optimal",
    },
    venue: {
      recommended: totalBudget * 0.25, // 25% of budget
      current: venueAmount,
      status:
        venueAmount < totalBudget * 0.2
          ? "low"
          : venueAmount > totalBudget * 0.3
          ? "high"
          : "optimal",
    },
    decoration: {
      recommended: totalBudget * 0.12, // 12% of budget
      current: decorationAmount,
      status:
        decorationAmount < totalBudget * 0.08
          ? "low"
          : decorationAmount > totalBudget * 0.15
          ? "high"
          : "optimal",
    },
    photography: {
      recommended: totalBudget * 0.08, // 8% of budget
      current: photographyAmount,
      status:
        photographyAmount < totalBudget * 0.05
          ? "low"
          : photographyAmount > totalBudget * 0.12
          ? "high"
          : "optimal",
    },
    clothing: {
      recommended: totalBudget * 0.1, // 10% of budget
      current: clothingAmount,
      status:
        clothingAmount < totalBudget * 0.07
          ? "low"
          : clothingAmount > totalBudget * 0.15
          ? "high"
          : "optimal",
    },
  };

  // Cost optimization suggestions
  const optimizations = {
    potentialSavings: 0,
    suggestions: [],
  };

  // Generate optimization suggestions if over budget
  if (budgetStatus.isOverBudget) {
    let totalPotentialSavings = 0;

    // Venue optimization
    if (venueAmount > totalBudget * 0.3) {
      const venueSavings = venueAmount - totalBudget * 0.25;
      optimizations.suggestions.push({
        category: "venue",
        suggestion: "Consider a more budget-friendly venue or off-peak dates",
        savings: venueSavings,
      });
      totalPotentialSavings += venueSavings;
    }

    // Food optimization
    if (foodAmount > totalBudget * 0.3) {
      const foodSavings = foodAmount - totalBudget * 0.25;
      optimizations.suggestions.push({
        category: "food",
        suggestion: "Opt for simpler menu or reduce number of food counters",
        savings: foodSavings,
      });
      totalPotentialSavings += foodSavings;
    }

    // Decoration optimization
    if (decorationAmount > totalBudget * 0.15) {
      const decorationSavings = decorationAmount - totalBudget * 0.12;
      optimizations.suggestions.push({
        category: "decoration",
        suggestion: "Use seasonal flowers or DIY decorations",
        savings: decorationSavings,
      });
      totalPotentialSavings += decorationSavings;
    }

    // Photography optimization
    if (photographyAmount > totalBudget * 0.12) {
      const photographySavings = photographyAmount - totalBudget * 0.08;
      optimizations.suggestions.push({
        category: "photography",
        suggestion: "Book photographer for key ceremonies only",
        savings: photographySavings,
      });
      totalPotentialSavings += photographySavings;
    }

    optimizations.potentialSavings = totalPotentialSavings;
  }

  // Wedding details summary
  const weddingDetails = {
    totalBudget,
    guestCount,
    hasWeddingPlanner: weddingPlanner === "Yes",
    estimatedCeremonies: [
      "Engagement",
      "Mehendi",
      "Sangam",
      "Wedding",
      "Reception",
    ], // Typical Indian wedding ceremonies
  };

  // Final summary
  const summary = {
    totalAllocatedExpenses: totalAllocated,
    totalMiscellaneousExpenses: totalMiscellaneous,
    grandTotal,
    budgetUtilization: budgetStatus.utilizationPercentage,
    isOverBudget: budgetStatus.isOverBudget,
    budgetDifference: budgetStatus.difference,
    topExpenseCategory: categoryBreakdown[0]?.category || "none",
  };

  return {
    weddingDetails,
    mainExpenses,
    miscellaneousExpenses,
    totals: {
      totalAllocated,
      totalMiscellaneous,
      grandTotal,
      budgetDifference: budgetStatus.difference,
      remainingBudget: budgetStatus.remainingBudget,
    },
    budgetStatus,
    perGuestAnalysis,
    categoryBreakdown,
    recommendations,
    optimizations,
    summary,
  };
};
