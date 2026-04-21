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

export const calculateVacationBreakdown = (inputs) => {
  const {
    numAdults,
    numChildren,
    destination,
    tripDuration,
    transportMode,
    flightCost,
    airportTransferCost,
    trainTicketCost,
    stationTransferCost,
    roadVehicleType,
    distance,
    carMileage,
    fuelPrice,
    tollAndTaxes,
    overnightStayCost,
    rentalCostPerDay,
    fuelCostEstimate,
    securityDeposit,
    totalCabFare,
    totalBusFare,
    accommodationType,
    costPerNight,
    numberOfRooms,
    mealCostPerDay,
    activitiesBudget,
    shoppingBudget,
    localTransportType,
    publicTransportCostPerDay,
    taxiCostPerDay,
    localRentalCostPerDay,
    localRentalFuelCost,
    travelInsurance,
    travelInsuranceCost,
    visaRequired,
    visaCost,
  } = inputs;

  const totalPeople = numAdults + numChildren;

  // 1. Transportation Cost
  let transportationTotal = 0;
  const transportationBreakdown = {};

  if (transportMode === "Flight") {
    transportationTotal = flightCost + airportTransferCost;
    transportationBreakdown.flightTickets = flightCost;
    transportationBreakdown.airportTransfers = airportTransferCost;
  } else if (transportMode === "Train") {
    transportationTotal = trainTicketCost + stationTransferCost;
    transportationBreakdown.trainTickets = trainTicketCost;
    transportationBreakdown.stationTransfers = stationTransferCost;
  } else if (transportMode === "Road") {
    if (roadVehicleType === "Own Car") {
      const calculatedFuelCost =
        carMileage > 0 ? ((distance * 2) / carMileage) * fuelPrice : 0;
      transportationTotal =
        calculatedFuelCost + tollAndTaxes + overnightStayCost;
      transportationBreakdown.fuelCost = calculatedFuelCost;
      transportationBreakdown.tollsAndCharges = tollAndTaxes;
      transportationBreakdown.enrouteStay = overnightStayCost;
    } else if (roadVehicleType === "Rental Car") {
      const rentalTotal = rentalCostPerDay * tripDuration;
      transportationTotal = rentalTotal + fuelCostEstimate;
      transportationBreakdown.vehicleRental = rentalTotal;
      transportationBreakdown.fuelEstimate = fuelCostEstimate;
      transportationBreakdown.securityDeposit = securityDeposit; // Note: Not added to cost
    } else if (roadVehicleType === "Taxi/Cab") {
      transportationTotal = totalCabFare;
      transportationBreakdown.totalFare = totalCabFare;
    } else if (roadVehicleType === "Bus") {
      transportationTotal = totalBusFare;
      transportationBreakdown.totalFare = totalBusFare;
    }
  }

  // 2. Accommodation Cost
  let accommodationTotal = 0;
  if (accommodationType !== "Friends/Family") {
    accommodationTotal = costPerNight * numberOfRooms * tripDuration;
  }
  const accommodationBreakdown = {
    costPerNight,
    numberOfRooms,
    numberOfNights: tripDuration,
    total: accommodationTotal,
  };

  // 3. Meal Cost
  const mealsTotal = mealCostPerDay * tripDuration;

  // 4. Local Transport Cost
  let localTransportTotal = 0;
  if (localTransportType === "Public Transport") {
    localTransportTotal = publicTransportCostPerDay * tripDuration;
  } else if (localTransportType === "Taxi/Ride-sharing") {
    localTransportTotal = taxiCostPerDay * tripDuration;
  } else if (localTransportType === "Rental Car/Scooter") {
    localTransportTotal =
      localRentalCostPerDay * tripDuration + localRentalFuelCost;
  }

  // 5. Documentation & Insurance Cost
  let documentationTotal = 0;
  const documentationBreakdown = {};
  if (travelInsurance) {
    documentationTotal += travelInsuranceCost;
    documentationBreakdown.insuranceCost = travelInsuranceCost;
  }
  if (visaRequired && destination === "International") {
    documentationTotal += visaCost;
    documentationBreakdown.visaCost = visaCost;
  }

  // Aggregate all costs
  const baseTripCost =
    transportationTotal +
    accommodationTotal +
    mealsTotal +
    activitiesBudget +
    shoppingBudget +
    localTransportTotal +
    documentationTotal;

  const emergencyBuffer = baseTripCost * 0.1; // 10% buffer
  const totalCost = baseTripCost + emergencyBuffer;

  const getBudgetCategory = (total) => {
    const perPersonCost = total / Math.max(totalPeople, 1);
    if (perPersonCost < 10000) return "Ultra Budget";
    if (perPersonCost < 30000) return "Budget Trip";
    if (perPersonCost < 75000) return "Mid-range Trip";
    if (perPersonCost < 150000) return "Premium Trip";
    return "Luxury Trip";
  };

  return {
    tripDetails: {
      totalPeople,
      numAdults,
      numChildren,
      destination,
      tripDuration,
      transportMode,
      accommodationType,
      roadVehicleType,
      budgetCategory: getBudgetCategory(totalCost),
    },
    costs: {
      transportation: {
        total: transportationTotal,
        breakdown: transportationBreakdown,
      },
      accommodation: {
        total: accommodationTotal,
        type: accommodationType,
        breakdown: accommodationBreakdown,
      },
      meals: { total: mealsTotal, preference: "User Defined" },
      activities: { total: activitiesBudget },
      shopping: { total: shoppingBudget },
      localTransport: { total: localTransportTotal, type: localTransportType },
      documentation: {
        total: documentationTotal,
        breakdown: documentationBreakdown,
      },
    },
    totals: {
      baseTripCost,
      emergencyBuffer,
      totalCost,
    },
    perPersonAnalysis: {
      costPerPerson: totalCost / Math.max(totalPeople, 1),
      costPerDay: totalCost / Math.max(tripDuration, 1),
      costPerPersonPerDay:
        totalCost / (Math.max(totalPeople, 1) * Math.max(tripDuration, 1)),
    },
    // Optimizations are removed as they are no longer relevant
  };
};

// Wedding
// calculation.js

export const formatters = {
  formatIndianCurrency: (amount) => {
    if (amount == null || isNaN(amount)) return "0";
    return Math.round(amount).toLocaleString("en-IN");
  },
  formatShortIndianCurrency: (amount) => {
    if (amount == null || isNaN(amount)) return "0";
    const num = Math.round(amount);
    if (num >= 1e7) return `₹${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `₹${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  },
};

// Main calculation function
export const calculateWeddingBreakdown = ({
  events = [],
  sharedExpenses = {},
  weddingDays = 1,
}) => {
  // 1. Calculate cost for each event based on its unique structure
  const eventsBreakdown = events.map((event) => {
    let foodCost = 0;
    if (event.foodType === "hotel_banquet" || event.foodType === "catered") {
      foodCost = (event.foodCostPerPlate || 0) * (event.totalGuests || 0);
    } else if (event.foodType === "home_cooked") {
      foodCost = event.homeCookingCost || 0;
    }

    const venueCost = event.needsVenue === "Yes" ? event.venueCost || 0 : 0;

    const accommodationCost =
      event.needsVenue === "Yes" && event.stayingOver === "Yes"
        ? (event.roomsNeeded || 0) * (event.roomCostPerDay || 0) * weddingDays
        : 0;

    const eventTotal =
      venueCost +
      foodCost +
      accommodationCost +
      (event.decorationCost || 0) +
      (event.photographyCost || 0) +
      (event.makeupCost || 0) +
      (event.entertainmentCost || 0) +
      (event.otherEventCost || 0);

    return {
      id: event.id,
      name: event.name,
      totalGuests: event.totalGuests,
      totalCost: eventTotal,
      breakdown: {
        Venue: venueCost,
        Food: foodCost,
        Accommodation: accommodationCost,
        Decoration: event.decorationCost || 0,
        Photography: event.photographyCost || 0,
        Makeup: event.makeupCost || 0,
        Entertainment: event.entertainmentCost || 0,
        Other: event.otherEventCost || 0,
      },
    };
  });

  const totalEventsCost = eventsBreakdown.reduce(
    (sum, event) => sum + event.totalCost,
    0
  );

  // 2. Aggregate shared expenses
  const sharedExpensesList = [
    {
      name: "Bride's Attire & Jewelry",
      amount: sharedExpenses.brideAttireAmount || 0,
    },
    {
      name: "Groom's Attire & Accessories",
      amount: sharedExpenses.groomAttireAmount || 0,
    },
    {
      name: "Invitations & Gifts",
      amount: sharedExpenses.invitationAmount || 0,
    },
    { name: "Miscellaneous & Buffer", amount: sharedExpenses.miscAmount || 0 },
  ];

  const totalSharedCost = sharedExpensesList.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const grandTotal = totalEventsCost + totalSharedCost;

  const maxGuestCount = events.reduce(
    (max, event) => Math.max(max, event.totalGuests),
    0
  );

  return {
    weddingDetails: {
      guestCount: maxGuestCount,
      eventCount: events.length,
      weddingDays: weddingDays,
    },
    costs: {
      grandTotal,
      totalEventsCost,
      totalSharedCost,
      eventsBreakdown,
      sharedExpensesBreakdown: sharedExpensesList.filter(
        (item) => item.amount > 0
      ),
    },
    formattedTotals: {
      grandTotal: formatters.formatIndianCurrency(grandTotal),
      totalEventsCost: formatters.formatIndianCurrency(totalEventsCost),
      totalSharedCost: formatters.formatIndianCurrency(totalSharedCost),
      perGuestCost: formatters.formatIndianCurrency(
        maxGuestCount > 0 ? grandTotal / maxGuestCount : 0
      ),
    },
  };
};

// --- NEW CREDIT CARD CALCULATION LOGIC ---

export const calculateCreditCardPayoff = ({ inputs, calculationMode }) => {
  const {
    cardBalance,
    annualInterestRate,
    monthlyPayment,
    payoffTimeInMonths,
  } = inputs;

  const monthlyInterestRate = annualInterestRate / 100 / 12;

  if (calculationMode === "fixedPayment") {
    if (monthlyPayment <= cardBalance * monthlyInterestRate) {
      return {
        isError: true,
        title: "Payment Too Low",
        summaryText:
          "Your monthly payment must be higher than the interest charged each month to reduce your balance.",
      };
    }

    const months =
      -Math.log(1 - (cardBalance * monthlyInterestRate) / monthlyPayment) /
      Math.log(1 + monthlyInterestRate);
    const totalMonths = Math.ceil(months);
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    const totalPaid = totalMonths * monthlyPayment;
    const totalInterest = totalPaid - cardBalance;

    return {
      isError: false,
      title: "Payoff Timeline",
      mainResult: {
        value: totalMonths,
        label: "Payoff In",
        suffix: totalMonths > 1 ? "Months" : "Month",
      },
      summaryText: `It will take ${
        years > 0 ? `${years} years and ` : ""
      }${remainingMonths} months to be debt-free.`,
      breakdown: [
        {
          label: "Principal Balance",
          value: formatters.formatIndianCurrency(cardBalance),
        },
        {
          label: "Total Interest Paid",
          value: formatters.formatIndianCurrency(totalInterest),
        },
      ],
      analysis: [
        {
          label: "Your Monthly Payment",
          value: formatters.formatIndianCurrency(monthlyPayment),
        },
        {
          label: "Total Amount You'll Pay",
          value: formatters.formatIndianCurrency(totalPaid),
        },
      ],
    };
  } else if (calculationMode === "fixedTime") {
    if (payoffTimeInMonths <= 0) {
      return {
        isError: true,
        title: "Invalid Timeframe",
        summaryText: "Please enter a payoff time greater than zero months.",
      };
    }
    const requiredPayment =
      (cardBalance *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, payoffTimeInMonths)) /
      (Math.pow(1 + monthlyInterestRate, payoffTimeInMonths) - 1);
    const totalPaid = requiredPayment * payoffTimeInMonths;
    const totalInterest = totalPaid - cardBalance;

    return {
      isError: false,
      title: "Your Required Payment",
      mainResult: {
        value: requiredPayment,
        label: "Required Monthly Payment",
        isCurrency: true,
      },
      summaryText: `To be debt-free in ${payoffTimeInMonths} months, you'll need to make this payment.`,
      breakdown: [
        {
          label: "Principal Balance",
          value: formatters.formatIndianCurrency(cardBalance),
        },
        {
          label: "Total Interest You'll Pay",
          value: formatters.formatIndianCurrency(totalInterest),
        },
      ],
      analysis: [
        { label: "Desired Payoff Time", value: `${payoffTimeInMonths} Months` },
        {
          label: "Amount You'll Pay",
          value: formatters.formatIndianCurrency(totalPaid),
        },
      ],
    };
  }
  return null;
};

// --- NEW INVESTMENT CALCULATION LOGIC ---

// utils/calculation.js

// ... (keep formatters and other calculator functions as they are) ...

// --- UPDATED INVESTMENT CALCULATION LOGIC ---

/**
 * Calculates the future value of an investment with an optional annual step-up.
 * @param {object} params - The investment parameters.
 * @param {object} params.inputs - The user-provided values.
 * @returns {object} A result object for the InvestmentResult component.
 */
export const calculateInvestmentGrowth = ({ inputs }) => {
  const {
    initialAmount,
    monthlyContribution,
    annualRate,
    years,
    annualStepUp, // New input
  } = inputs;

  const monthlyRate = annualRate / 100 / 12;

  let currentBalance = initialAmount;
  let currentMonthlySip = monthlyContribution;
  let totalInvested = initialAmount;
  const yearlyData = [];

  // Loop through each year to apply the annual step-up
  for (let year = 1; year <= years; year++) {
    // Calculate the future value of the balance at the start of the year
    const fvOfCurrentBalance = currentBalance * Math.pow(1 + monthlyRate, 12);

    // Calculate the future value of this year's SIP contributions
    const fvOfSipForYear =
      currentMonthlySip * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate);

    // The balance at the end of this year
    currentBalance = fvOfCurrentBalance + fvOfSipForYear;

    // Track total amount invested so far
    totalInvested += currentMonthlySip * 12;

    const interestThisYear = currentBalance - totalInvested;

    yearlyData.push({
      year,
      endBalance: formatters.formatIndianCurrency(currentBalance),
      totalInvestment: formatters.formatIndianCurrency(totalInvested),
      interestEarned: formatters.formatIndianCurrency(interestThisYear),
    });

    // Apply the step-up for the next year
    currentMonthlySip *= 1 + annualStepUp / 100;
  }

  const totalCorpus = currentBalance;
  const wealthGained = totalCorpus - totalInvested;

  return {
    isError: false,
    title: "Your Projected Investment Growth",
    mainResult: {
      value: totalCorpus,
      label: "Total Corpus After " + years + " Years",
      isCurrency: true,
    },
    summaryText: `With consistent investment and a ${annualStepUp}% annual step-up.`,
    breakdown: [
      {
        label: "Total Amount Invested",
        value: formatters.formatIndianCurrency(totalInvested),
      },
      {
        label: "Wealth Gained (Interest)",
        value: formatters.formatIndianCurrency(wealthGained),
      },
    ],
    yearlyData: yearlyData,
  };
};

// --- NEW IN-HAND SALARY CALCULATION LOGIC ---

// utils/calculation.js

// ... (keep formatters)

export const calculateInHandSalary = ({ inputs, selectedRegime }) => {
  const {
    annualCTC,
    variablePay,
    monthlyPF,
    annualGratuity,
    standardDeduction,
    monthlyRent,
    custom80C,
    section80D,
  } = inputs;

  // --- Step 1: Employer-Side Deductions from CTC ---
  const employerPF = monthlyPF * 12; // Assume employer matches employee contribution
  const grossAnnualSalary = annualCTC - employerPF - annualGratuity;
  const monthlyGross = grossAnnualSalary / 12;

  // --- Step 2: Calculate Taxable Income ---
  let taxableIncome,
    hraExemption = 0,
    investments = 0;
  const employeePFAnnual = monthlyPF * 12;

  if (selectedRegime === "old") {
    const basicSalary = grossAnnualSalary * 0.4; // Needed for HRA calculation
    const hraReceived = basicSalary * 0.5;
    hraExemption = Math.max(
      0,
      Math.min(
        hraReceived,
        monthlyRent * 12 - basicSalary * 0.1,
        basicSalary * 0.5
      )
    );
    investments =
      Math.min(150000, employeePFAnnual + custom80C) +
      Math.min(25000, section80D);
    taxableIncome = Math.max(
      0,
      grossAnnualSalary - standardDeduction - hraExemption - investments
    );
  } else {
    // New Regime
    taxableIncome = Math.max(0, grossAnnualSalary - standardDeduction);
  }

  // --- Step 3: Calculate Tax on Taxable Income ---
  let tax = 0;
  if (selectedRegime === "old") {
    if (taxableIncome > 500000) {
      // Rebate handled by this check
      if (taxableIncome > 1000000)
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      else if (taxableIncome > 500000)
        tax = 12500 + (taxableIncome - 500000) * 0.2;
    }
  } else {
    if (taxableIncome > 700000) {
      // Rebate handled by this check
      if (taxableIncome > 1500000)
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      else if (taxableIncome > 1200000)
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      else if (taxableIncome > 900000)
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      else if (taxableIncome > 600000)
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      else if (taxableIncome > 300000) tax = (taxableIncome - 300000) * 0.05;
    }
  }
  const totalAnnualTax = tax * 1.04;
  const professionalTax = 2400;

  // --- Step 4: Final In-Hand Calculation ---
  const totalAnnualDeductions =
    totalAnnualTax + employeePFAnnual + professionalTax;
  const netAnnualTakeHome = grossAnnualSalary - totalAnnualDeductions;

  // --- Step 5: Structure the final breakdown object ---
  return {
    breakdown: {
      monthlyCTC: annualCTC / 12,
      epfEmployer: employerPF / 12,
      gratuity: annualGratuity / 12,
      grossSalary: monthlyGross,
      standardDeduction: standardDeduction / 12,
      hraExemption: hraExemption / 12,
      investments: investments / 12,
      taxableIncome: taxableIncome / 12,
      incomeTax: totalAnnualTax / 12,
      professionalTax: professionalTax / 12,
      epfEmployee: monthlyPF,
      monthlyInHand: netAnnualTakeHome / 12,
    },
    annualVariablePay: variablePay,
  };
};

// utils/calculation.js

// ... (keep formatters and other calculator functions)

// --- NEW SIP CALCULATION LOGIC ---

export const calculateSip = ({ inputs }) => {
  const { monthlyInvestment, annualRate, years } = inputs;

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;

  // Future Value of a Series formula: P * [({(1+i)^n}-1)/i] * (1+i)
  const totalValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

  const estimatedReturns = totalValue - totalInvested;

  return {
    investedAmount: totalInvested,
    estimatedReturns: estimatedReturns,
    totalValue: totalValue,
  };
};

// --- NEW CAR LEASE VS LOAN CALCULATION LOGIC ---

export const calculateCarLeaseVsLoanBreakdown = ({
  exShowroomPrice,
  gstSlabPercent,
  isEV,
  engineAbove1600cc,
  driverProvided,
  tenureYears,
  residualValuePercent,
  annualCTC,
  interestRate,
  monthlyMaintenance
}) => {
  const roadTaxPercent = 10;
  const initialInsurancePercent = 4;
  const tenureMonths = tenureYears * 12;

  // Ex-Showroom Price already INCLUDES the vehicle's GST initially. 
  // On-Road adds Road Tax and Insurance.
  const roadTaxAmount = exShowroomPrice * (roadTaxPercent / 100);
  const initialInsuranceAmount = exShowroomPrice * (initialInsurancePercent / 100);
  const onRoadPrice = exShowroomPrice + roadTaxAmount + initialInsuranceAmount;

  // Marginal Tax Rate (FY 2025-26 New Regime slabs simplified)
  let marginalTaxRate = 0;
  if (annualCTC > 2400000) marginalTaxRate = 0.312;
  else if (annualCTC > 2000000) marginalTaxRate = 0.26;
  else if (annualCTC > 1600000) marginalTaxRate = 0.208;
  else if (annualCTC > 1200000) marginalTaxRate = 0.156;
  else if (annualCTC > 800000) marginalTaxRate = 0.104;
  else if (annualCTC > 400000) marginalTaxRate = 0.052;
  else marginalTaxRate = 0;

  // Residual Value is typically a percentage of Ex-Showroom
  const residualValue = exShowroomPrice * (residualValuePercent / 100);
  const monthlyRate = (interestRate / 100) / 12;

  // ---------------------------------
  // LEASE CALCULATION
  // ---------------------------------
  // Lessor capitalizes Ex-showroom.
  // Principal = Ex-showroom - Residual (Plus road tax/insurance if included in lease capital)
  // Let's assume the full On-Road is financed to be fair against Loan.
  const leasePrincipalAmount = onRoadPrice - residualValue;
  
  const emiOnPrincipalLease = monthlyRate > 0 
    ? (leasePrincipalAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    : leasePrincipalAmount / tenureMonths;
  
  const interestOnRV = residualValue * monthlyRate;
  const preGstLeaseRental = emiOnPrincipalLease + interestOnRV;
  
  // Lease Rentals attract the car's GST slab
  const monthlyLeaseRental = preGstLeaseRental * (1 + (gstSlabPercent / 100));

  // Perquisite Valuation (Taxed purely on the perk value at marginal rate)
  let basePerk = 0;
  if (isEV) basePerk = 5000;
  else if (!engineAbove1600cc) basePerk = 5000;
  else basePerk = 7000;
  
  if (driverProvided) basePerk += 3000;
  const monthlyPerquisiteTax = basePerk * marginalTaxRate;

  // Tax Savings: Corporate Lease allows deducting (Lease Rental + Maintenance) from taxable CTC
  const monthlyTaxSavings = (monthlyLeaseRental + monthlyMaintenance) * marginalTaxRate;
  
  // Net Effective Cost of Leasing
  const netEffectiveMonthlyLeaseCost = (monthlyLeaseRental + monthlyMaintenance) - monthlyTaxSavings + monthlyPerquisiteTax;

  // End of Tenure Buyback Outflow (Paying the Residual + applicable GST on resale of used car, typically 18% or same as slab)
  const residualBuyback = residualValue * (1 + (gstSlabPercent / 100));
  
  const totalOutflowLease = (netEffectiveMonthlyLeaseCost * tenureMonths) + residualBuyback;

  // ---------------------------------
  // LOAN CALCULATION
  // ---------------------------------
  // Auto Loan typically finances up to 100% of On-Road Price.
  const loanEMI = monthlyRate > 0 
    ? (onRoadPrice * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    : onRoadPrice / tenureMonths;

  // You also pay maintenance and insurance out of pocket post-tax.
  const monthlyInsurance = initialInsuranceAmount / 12; // Assuming flat mapping over years
  const totalMonthlyOutflowLoan = loanEMI + monthlyMaintenance + monthlyInsurance;

  const totalOutflowLoan = totalMonthlyOutflowLoan * tenureMonths;

  return {
    onRoadPrice,
    monthlyLeaseRental,
    monthlyTaxSavings,
    netEffectiveMonthlyLeaseCost,
    residualBuyback,
    perquisiteValue: basePerk,
    monthlyPerquisiteTax,
    loanEMI,
    totalMonthlyOutflowLoan,
    totalOutflowLoan,
    totalOutflowLease,
    totalTaxSaved: monthlyTaxSavings * tenureMonths,
    betterOption: totalOutflowLease < totalOutflowLoan ? "Leasing" : "Loan",
    wealthDifference: Math.abs(totalOutflowLoan - totalOutflowLease),
    comparisonPeriod: tenureYears,
    tenureMonths,
    displayedTenure: tenureYears,
  };
};

// =====================================================
// INCOME TAX (OLD VS NEW REGIME) CALCULATION FUNCTIONS
// =====================================================

const formatCurrencyIT = (num) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

const getNewRegimeSlabs = () => [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.10 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.20 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.30 }
];

const getOldRegimeSlabs = (ageGroup) => {
  if (ageGroup === "super") {
    // 80+
    return [
      { limit: 500000, rate: 0 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  } else if (ageGroup === "senior") {
    // 60-79
    return [
      { limit: 300000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  } else {
    // < 60
    return [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  }
};

const calculateTaxBySlabs = (taxableIncome, slabs) => {
  let tax = 0;
  let previousLimit = 0;
  const breakdown = [];

  for (const slab of slabs) {
    if (taxableIncome > previousLimit) {
      const taxableAmountInSlab = Math.min(taxableIncome, slab.limit) - previousLimit;
      const taxForSlab = taxableAmountInSlab * slab.rate;
      if (taxForSlab > 0 || (slab.rate === 0 && taxableAmountInSlab > 0)) {
         breakdown.push({
          range: `₹${(previousLimit).toLocaleString('en-IN')} - ${slab.limit === Infinity ? 'Above' : '₹' + slab.limit.toLocaleString('en-IN')} (${slab.rate * 100}%)`,
          taxForSlab
         });
      }
      tax += taxForSlab;
      previousLimit = slab.limit;
    } else {
      break;
    }
  }
  return { tax, breakdown };
};

const calculateRebateAndMarginalRelief = (taxBeforeRebate, taxableIncome, regime) => {
  if (regime === "new") {
    if (taxableIncome <= 1200000) {
      return Math.min(taxBeforeRebate, 60000); // 100% rebate limit
    } else {
      const limit = 1200000;
      const incomeAboveLimit = taxableIncome - limit;
      if (taxBeforeRebate > incomeAboveLimit) {
        return taxBeforeRebate - incomeAboveLimit;
      }
    }
  } else {
    if (taxableIncome <= 500000) {
      return Math.min(taxBeforeRebate, 12500); // 100% rebate limit
    }
  }
  return 0;
};

const calculateSurchargeWithMarginalRelief = (taxableIncome, taxBeforeSurcharge, isNewRegime, slabs) => {
  const getThresholdAndRate = (income) => {
    if (income > 50000000) return { threshold: 50000000, rate: isNewRegime ? 0.25 : 0.37 };
    if (income > 20000000) return { threshold: 20000000, rate: 0.25 };
    if (income > 10000000) return { threshold: 10000000, rate: 0.15 };
    if (income > 5000000) return { threshold: 5000000, rate: 0.10 };
    return { threshold: 0, rate: 0 };
  };

  const { threshold, rate } = getThresholdAndRate(taxableIncome);
  if (rate === 0) return { surcharge: 0, marginalRelief: 0 };

  let surchargeAmount = taxBeforeSurcharge * rate;
  let totalWithSurcharge = taxBeforeSurcharge + surchargeAmount;

  // Calculate tax exactly on the boundary threshold to find relief
  const { tax: taxOnThreshold } = calculateTaxBySlabs(threshold, slabs);
  const thresholdRate = getThresholdAndRate(threshold).rate; 
  const surchargeOnThreshold = taxOnThreshold * thresholdRate;
  const totalOnThreshold = taxOnThreshold + surchargeOnThreshold;

  const extraIncome = taxableIncome - threshold;
  const extraTax = totalWithSurcharge - totalOnThreshold;

  let marginalRelief = 0;
  if (extraTax > extraIncome) {
    marginalRelief = extraTax - extraIncome;
    surchargeAmount -= marginalRelief;
  }

  return { surcharge: surchargeAmount, marginalRelief };
};

export const calculateIncomeTaxBreakdown = (inputs) => {
  const {
    grossIncome = 1200000,
    ageGroup = "below60",
    taxpayerType = "salaried",
    oldSection80C = 0,
    oldSection80D = 0,
    oldHRA = 0,
    oldHomeLoan = 0,
    oldNPS = 0,
    oldOther = 0,
    newEmployerNPS = 0,
    newAgniveer = 0
  } = inputs;

  // Old Regime Logic
  const oldStandardDeduction = taxpayerType === "salaried" ? 50000 : 0;
  const oldTotalDeductions = oldStandardDeduction + oldSection80C + oldSection80D + oldHRA + oldHomeLoan + oldNPS + oldOther;
  const oldTaxableIncome = Math.max(0, grossIncome - oldTotalDeductions);
  const oldSlabs = getOldRegimeSlabs(ageGroup);
  
  let { tax: oldTaxBeforeRebate, breakdown: oldBreakdown } = calculateTaxBySlabs(oldTaxableIncome, oldSlabs);
  const oldRebate = calculateRebateAndMarginalRelief(oldTaxBeforeRebate, oldTaxableIncome, "old");
  let oldTaxAfterRebate = Math.max(0, oldTaxBeforeRebate - oldRebate);
  
  const { surcharge: oldSurcharge, marginalRelief: oldSurchargeMR } = calculateSurchargeWithMarginalRelief(oldTaxableIncome, oldTaxAfterRebate, false, oldSlabs);
  const oldCess = (oldTaxAfterRebate + oldSurcharge) * 0.04;
  const oldTotalTax = oldTaxAfterRebate + oldSurcharge + oldCess;

  // New Regime Logic
  const newStandardDeduction = taxpayerType === "salaried" ? 75000 : 0;
  const newTotalDeductions = newStandardDeduction + newEmployerNPS + newAgniveer;
  const newTaxableIncome = Math.max(0, grossIncome - newTotalDeductions);
  const newSlabs = getNewRegimeSlabs();
  
  let { tax: newTaxBeforeRebate, breakdown: newBreakdown } = calculateTaxBySlabs(newTaxableIncome, newSlabs);
  const newRebate = calculateRebateAndMarginalRelief(newTaxBeforeRebate, newTaxableIncome, "new");
  let newTaxAfterRebate = Math.max(0, newTaxBeforeRebate - newRebate);
  
  const { surcharge: newSurcharge, marginalRelief: newSurchargeMR } = calculateSurchargeWithMarginalRelief(newTaxableIncome, newTaxAfterRebate, true, newSlabs);
  const newCess = (newTaxAfterRebate + newSurcharge) * 0.04;
  const newTotalTax = newTaxAfterRebate + newSurcharge + newCess;

  const winner = newTotalTax < oldTotalTax ? 'new' : (oldTotalTax < newTotalTax ? 'old' : 'tie');
  const savings = Math.abs(oldTotalTax - newTotalTax);

  return {
    grossIncome,
    oldRegime: {
      totalDeductions: oldTotalDeductions,
      taxableIncome: oldTaxableIncome,
      breakdown: oldBreakdown,
      taxBeforeCess: oldTaxAfterRebate,
      rebate: oldRebate,
      surcharge: oldSurcharge,
      surchargeMarginalRelief: oldSurchargeMR,
      cess: oldCess,
      totalTax: Math.round(oldTotalTax),
      effectiveTaxRate: grossIncome > 0 ? (oldTotalTax / grossIncome) * 100 : 0,
      monthlyOutflow: Math.round(oldTotalTax / 12),
      inHandAnnual: Math.round(grossIncome - oldTotalTax)
    },
    newRegime: {
      totalDeductions: newTotalDeductions,
      taxableIncome: newTaxableIncome,
      breakdown: newBreakdown,
      taxBeforeCess: newTaxAfterRebate,
      rebate: newRebate,
      surcharge: newSurcharge,
      surchargeMarginalRelief: newSurchargeMR,
      cess: newCess,
      totalTax: Math.round(newTotalTax),
      effectiveTaxRate: grossIncome > 0 ? (newTotalTax / grossIncome) * 100 : 0,
      monthlyOutflow: Math.round(newTotalTax / 12),
      inHandAnnual: Math.round(grossIncome - newTotalTax)
    },
    winner,
    savings: Math.round(savings)
  };
};

export const calculateGratuityBreakdown = (inputs) => {
  const {
    employmentType = "Private (Act Covered)",
    separationReason = "Retirement / Superannuation",
    yearsOfService = 5,
    additionalMonths = 0,
    basicSalary = 0,
    da = 0,
    retainingAllowance = 0,
    taxRegime = "New Regime",
    incomeTaxSlab = 0
  } = inputs;

  const wages = basicSalary + da + retainingAllowance;

  // Step 2 - Completed Years
  let completedYears = yearsOfService;
  if (employmentType === "Private (Act Covered)") {
    if (additionalMonths >= 6) {
      completedYears += 1;
    }
  }

  // Step 3 - Gratuity Formula
  let formulaUsed = "Act-Covered (÷26)";
  let grossGratuity = 0;
  if (employmentType === "Government / PSU" || employmentType === "Private (Act Covered)") {
    grossGratuity = (wages * 15 * completedYears) / 26;
  } else {
    formulaUsed = "Not-Covered (÷30)";
    grossGratuity = (wages * 15 * completedYears) / 30;
  }

  // Step 4 - Statutory Cap
  let statutoryCapApplied = null;
  if (employmentType === "Government / PSU") {
    if (grossGratuity > 2500000) statutoryCapApplied = 2500000;
  } else {
    if (grossGratuity > 2000000) statutoryCapApplied = 2000000;
  }

  let gratuityPayable = statutoryCapApplied !== null ? statutoryCapApplied : grossGratuity;

  // Step 5 - Eligibility Check
  let isEligible = true;
  if (separationReason !== "Death / Disability" && yearsOfService < 5) {
    isEligible = false;
    gratuityPayable = 0;
  }

  // Step 6 - Tax Calculation
  let exemptPortion = 0;
  if (!isEligible) {
    exemptPortion = 0;
  } else if (employmentType === "Government / PSU") {
    exemptPortion = gratuityPayable; // Fully exempt
  } else if (employmentType === "Private (Act Covered)") {
    exemptPortion = Math.min(gratuityPayable, (wages * 15 * completedYears) / 26, 2000000);
  } else if (employmentType === "Private (Not Covered)") {
    exemptPortion = Math.min(gratuityPayable, (wages / 2) * completedYears, 2000000);
  }

  let taxablePortion = Math.max(0, gratuityPayable - exemptPortion);
  let taxRatePercent = parseInt(incomeTaxSlab.replace("%", "")) || 0;
  let estimatedTax = taxablePortion * (taxRatePercent / 100);
  let netGratuity = gratuityPayable - estimatedTax;

  return {
    wages,
    effectiveYears: completedYears,
    formulaUsed,
    grossGratuity,
    statutoryCapApplied,
    isEligible,
    gratuityPayable,
    exemptPortion,
    taxablePortion,
    estimatedTax,
    netGratuity
  };
};

export const calculateESPPBreakdown = (inputs) => {
  const {
    shareType = "Foreign Listed (MNC)",
    lookback = true,
    fmv1 = 1000,
    fmv2 = 1200,
    discountPercent = 15,
    numberOfShares = 100,
    incomeTaxSlab = "30%",
    salePrice = 1500,
    holdingPeriodMonths = 25,
    isSTTpaid = false // Unused logically here but passed over
  } = inputs;

  const slabRate = parseInt(incomeTaxSlab.replace("%", "")) / 100 || 0;

  // Stage 1: Purchase Setup
  const basePrice = lookback ? Math.min(fmv1, fmv2) : fmv2;
  const purchasePrice = basePrice * (1 - (discountPercent / 100));
  
  const perquisitePerShare = Math.max(0, fmv2 - purchasePrice);
  const totalPerquisite = perquisitePerShare * numberOfShares;
  const perquisiteTaxBeforeCess = totalPerquisite * slabRate;
  const perquisiteTax = perquisiteTaxBeforeCess * 1.04;
  
  // Stage 2: Sale Setup
  const capitalGainPerShare = salePrice - fmv2; // Could be negative
  const totalCapitalGain = capitalGainPerShare * numberOfShares;
  
  let cgTaxBeforeCess = 0;
  let cgClassification = "";
  let ltcgExemptionApplied = 0;
  
  // Rule branching based on share type
  if (shareType === "Indian Listed Company") {
    if (holdingPeriodMonths <= 12) {
      cgClassification = "STCG";
      if (totalCapitalGain > 0) cgTaxBeforeCess = totalCapitalGain * 0.20; // 20%
    } else {
      cgClassification = "LTCG";
      if (totalCapitalGain > 0) {
         if (totalCapitalGain <= 125000) {
            ltcgExemptionApplied = totalCapitalGain;
         } else {
            ltcgExemptionApplied = 125000;
            cgTaxBeforeCess = (totalCapitalGain - 125000) * 0.125;
         }
      }
    }
  } else {
    // Foreign Listed (Unlisted mapping)
    if (holdingPeriodMonths <= 24) {
      cgClassification = "STCG";
      if (totalCapitalGain > 0) cgTaxBeforeCess = totalCapitalGain * slabRate;
    } else {
      cgClassification = "LTCG";
      if (totalCapitalGain > 0) cgTaxBeforeCess = totalCapitalGain * 0.125;
    }
  }

  const capitalGainsTax = cgTaxBeforeCess > 0 ? cgTaxBeforeCess * 1.04 : 0;
  
  // Totals
  const totalInvestment = purchasePrice * numberOfShares;
  const totalSaleProceeds = salePrice * numberOfShares;
  const grossProfit = totalSaleProceeds - totalInvestment;
  const totalTax = perquisiteTax + capitalGainsTax;
  const netProfitAfterAllTaxes = grossProfit - totalTax;
  const effectiveReturnPercent = totalInvestment > 0 ? (netProfitAfterAllTaxes / totalInvestment) * 100 : 0;
  
  // Lookback Savings
  const lookbackSavingsPerShare = (!lookback || fmv1 >= fmv2) ? 0 : ((fmv2 - fmv1) * (1 - (discountPercent / 100)));
  const totalLookbackSavings = lookbackSavingsPerShare * numberOfShares;

  return {
    basePrice,
    purchasePrice,
    discountBenefitPerShare: fmv2 - purchasePrice,
    totalPerquisite,
    perquisiteTax,
    capitalGainPerShare,
    totalCapitalGain,
    cgClassification,
    ltcgExemptionApplied,
    capitalGainsTax,
    totalInvestment,
    totalSaleProceeds,
    grossProfit,
    totalTax,
    netProfitAfterAllTaxes,
    effectiveReturnPercent,
    totalLookbackSavings,
    actualDiscountRate: fmv2 > 0 ? ((fmv2 - purchasePrice) / fmv2) * 100 : 0
  };
};

export const calculateRetirementCorpus = (inputs) => {
  const {
    currentAge,
    targetAge,
    employmentType,
    currentExpenses,
    inflationRate,
    fireVariantMultiplier, // 25, 33, 40
    safeWithdrawalRate, // 4, 3, 2.5
    epfBalance,
    epfMonthly,
    npsBalance,
    npsMonthly,
    equityBalance,
    equityMonthly,
    ppfBalance,
    ppfMonthly,
    debtBalance,
    
    epfReturn,
    npsReturn,
    equityReturn,
    ppfReturn,
    debtReturn,
    postRetirementReturn,
    
    npsSubscriberType,
    taxSlab,
    annuityRate,
    
    medicalInflationRate = 14
  } = inputs;

  const yearsToRetirement = Math.max(0, targetAge - currentAge);
  const monthsToRetirement = yearsToRetirement * 12;
  
  // Step 1: Target Corpus
  const futureMonthlyExpenses = currentExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const annualRetirementExpenses = futureMonthlyExpenses * 12;
  const targetCorpus = annualRetirementExpenses * fireVariantMultiplier;

  // Helper for FV of SIP
  const calculateFVofSIP = (monthlySip, rate, months) => {
    if (months <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return monthlySip * months;
    return monthlySip * ( (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate ) * (1 + monthlyRate);
  };

  const calculateFV = (presentValue, rate, years) => {
    return presentValue * Math.pow(1 + rate / 100, years);
  };

  // Step 2: Future Value for each asset
  const fvEpf = calculateFV(epfBalance, epfReturn, yearsToRetirement) + calculateFVofSIP(epfMonthly, epfReturn, monthsToRetirement);
  const fvNps = calculateFV(npsBalance, npsReturn, yearsToRetirement) + calculateFVofSIP(npsMonthly, npsReturn, monthsToRetirement);
  const fvEquity = calculateFV(equityBalance, equityReturn, yearsToRetirement) + calculateFVofSIP(equityMonthly, equityReturn, monthsToRetirement);
  const fvPpf = calculateFV(ppfBalance, ppfReturn, yearsToRetirement) + calculateFVofSIP(ppfMonthly, ppfReturn, monthsToRetirement);
  const fvDebt = calculateFV(debtBalance, debtReturn, yearsToRetirement);

  const totalProjectedCorpus = fvEpf + fvNps + fvEquity + fvPpf + fvDebt;

  // Step 3: NPS Corpus Split at Retirement (2026 Rules)
  let npsTaxFreeLumpSum = 0;
  let npsTaxableLumpSum = 0;
  let npsAnnuityCorpus = 0;

  if (npsSubscriberType === "government") {
    npsTaxFreeLumpSum = 0.60 * fvNps;
    npsTaxableLumpSum = 0;
    npsAnnuityCorpus = 0.40 * fvNps;
  } else {
    // non-government
    if (fvNps <= 800000) {
      npsTaxFreeLumpSum = 0.60 * fvNps;
      npsTaxableLumpSum = 0.40 * fvNps; // 100% lump sum, 60% tax-free
      npsAnnuityCorpus = 0;
    } else if (fvNps <= 1200000) {
      npsTaxFreeLumpSum = 600000;
      npsTaxableLumpSum = 0;
      npsAnnuityCorpus = Math.max(0, fvNps - 600000);
    } else {
      // > 12L => 80% lump sum (60% tax-free, 20% taxable), 20% annuity
      npsTaxFreeLumpSum = 0.60 * fvNps;
      npsTaxableLumpSum = 0.20 * fvNps;
      npsAnnuityCorpus = 0.20 * fvNps;
    }
  }

  const npsTaxableValue = npsTaxableLumpSum * (taxSlab / 100);
  const npsMonthlyAnnuity = (npsAnnuityCorpus * (annuityRate / 100)) / 12;
  const npsAnnuityTax = npsMonthlyAnnuity * (taxSlab / 100);

  // Step 4: Corpus Gap / Surplus
  const gap = targetCorpus - totalProjectedCorpus;

  // Step 5: Additional SIP (if gap > 0)
  let additionalSipNeeded = 0;
  if (gap > 0 && monthsToRetirement > 0) {
    const monthlyRate = equityReturn / 100 / 12;
    additionalSipNeeded = gap * monthlyRate / ( (Math.pow(1 + monthlyRate, monthsToRetirement) - 1) * (1 + monthlyRate) );
  }

  // Step 6: FIRE Age (if surplus)
  let fireAge = null;
  let fireAgeMonths = 0;
  if (gap <= 0) {
    let currentBalanceEpf = epfBalance;
    let currentBalanceNps = npsBalance;
    let currentBalanceEquity = equityBalance;
    let currentBalancePpf = ppfBalance;
    let currentBalanceDebt = debtBalance;

    for (let m = 1; m <= monthsToRetirement; m++) {
      currentBalanceEpf = currentBalanceEpf * Math.pow(1 + epfReturn/100, 1/12) + epfMonthly;
      currentBalanceNps = currentBalanceNps * Math.pow(1 + npsReturn/100, 1/12) + npsMonthly;
      currentBalanceEquity = currentBalanceEquity * Math.pow(1 + equityReturn/100, 1/12) + equityMonthly;
      currentBalancePpf = currentBalancePpf * Math.pow(1 + ppfReturn/100, 1/12) + ppfMonthly;
      currentBalanceDebt = currentBalanceDebt * Math.pow(1 + debtReturn/100, 1/12);
      
      const totalNow = currentBalanceEpf + currentBalanceNps + currentBalanceEquity + currentBalancePpf + currentBalanceDebt;
      
      const currentYears = m / 12;
      const targetNow = (currentExpenses * Math.pow(1 + inflationRate/100, currentYears) * 12) * fireVariantMultiplier;
      
      if (totalNow >= targetNow) {
        fireAge = currentAge + Math.floor(currentYears);
        fireAgeMonths = m;
        break;
      }
    }
  }

  // Step 7: CoastFIRE
  const coastFireNumber = targetCorpus / Math.pow(1 + equityReturn / 100, yearsToRetirement);
  const currentTotalCorpus = epfBalance + npsBalance + equityBalance + ppfBalance + debtBalance;

  // Step 8: Post-Retirement Sustainability
  let corpusSustainsYears = 0;
  let startingCorpus = totalProjectedCorpus;
  let currentAnnualExpense = annualRetirementExpenses;
  
  for (let y = 1; y <= 40; y++) {
    startingCorpus = startingCorpus * (1 + postRetirementReturn / 100) - currentAnnualExpense;
    if (startingCorpus < 0) {
      corpusSustainsYears = y;
      break;
    }
    currentAnnualExpense *= (1 + inflationRate / 100);
  }
  
  if (startingCorpus >= 0) {
    corpusSustainsYears = 40; // max out at 40 years for safety
  }

  const buildUpChartData = [];
  let balEpf = epfBalance;
  let balNps = npsBalance;
  let balEquity = equityBalance;
  let balPpf = ppfBalance;
  let balDebt = debtBalance;

  for (let year = 0; year <= yearsToRetirement; year++) {
    const expensesAtYear = currentExpenses * Math.pow(1 + inflationRate/100, year) * 12;
    const targetAtYear = expensesAtYear * fireVariantMultiplier;
    
    buildUpChartData.push({
      age: currentAge + year,
      EPF: Math.round(balEpf),
      NPS: Math.round(balNps),
      Equity: Math.round(balEquity),
      PPF: Math.round(balPpf),
      Debt: Math.round(balDebt),
      Total: Math.round(balEpf + balNps + balEquity + balPpf + balDebt),
      Target: Math.round(targetAtYear),
    });

    if (year < yearsToRetirement) {
      balEpf = calculateFV(balEpf, epfReturn, 1) + calculateFVofSIP(epfMonthly, epfReturn, 12);
      balNps = calculateFV(balNps, npsReturn, 1) + calculateFVofSIP(npsMonthly, npsReturn, 12);
      balEquity = calculateFV(balEquity, equityReturn, 1) + calculateFVofSIP(equityMonthly, equityReturn, 12);
      balPpf = calculateFV(balPpf, ppfReturn, 1) + calculateFVofSIP(ppfMonthly, ppfReturn, 12);
      balDebt = calculateFV(balDebt, debtReturn, 1);
    }
  }

  const depletionChartData = [];
  let postRetCorpus = totalProjectedCorpus;
  let postRetExpense = annualRetirementExpenses;
  
  for (let year = 0; year <= 30; year++) {
    depletionChartData.push({
      age: targetAge + year,
      CorpusVal: Math.max(0, Math.round(postRetCorpus)),
      Withdrawal: Math.round(postRetExpense)
    });
    
    if (postRetCorpus <= 0 && year > 0) {
       break; // Stop plotting once it's fully depleted, but show at least the point of depletion
    }

    postRetCorpus = postRetCorpus * (1 + postRetirementReturn / 100) - postRetExpense;
    postRetExpense *= (1 + inflationRate / 100);
  }

  return {
    yearsToRetirement,
    futureMonthlyExpenses,
    annualRetirementExpenses,
    targetCorpus,
    totalProjectedCorpus,
    
    fvEpf, fvNps, fvEquity, fvPpf, fvDebt,
    
    npsTaxFreeLumpSum,
    npsTaxableLumpSum,
    npsAnnuityCorpus,
    npsTaxableValue,
    npsMonthlyAnnuity,
    npsAnnuityTax,
    
    gap,
    additionalSipNeeded,
    fireAge,
    coastFireNumber,
    currentTotalCorpus,
    isCoastFire: currentTotalCorpus >= coastFireNumber,
    
    corpusSustainsYears,
    corpusDepletionAge: (corpusSustainsYears < 40) ? (targetAge + corpusSustainsYears) : null,
    
    buildUpChartData,
    depletionChartData,

    monthlySWRWithdrawal: (totalProjectedCorpus - fvNps) * (safeWithdrawalRate / 100) / 12,
  };
};
