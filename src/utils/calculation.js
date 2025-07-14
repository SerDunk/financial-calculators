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
