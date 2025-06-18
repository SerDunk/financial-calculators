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
export const calculateCarLoanDetails = ({
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  cashIncentive = 0,
  tradeInValue = 0,
  salesTaxPercent,
  otherFees = 0,
}) => {
  if (
    [
      vehiclePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      salesTaxPercent,
    ].some((val) => isNaN(val) || val < 0)
  ) {
    console.error("Invalid input detected in calculateCarLoanDetails");
    return null;
  }

  // Correct taxable amount (after incentive/trade-in)
  const taxableAmount = vehiclePrice - cashIncentive - tradeInValue;
  const salesTaxAmount = (taxableAmount * salesTaxPercent) / 100;

  // Down payment on original vehicle price
  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;

  // Net loan required
  const loanAmount = Math.max(
    0,
    taxableAmount + salesTaxAmount + otherFees - downPaymentAmount
  );

  // Monthly EMI
  const monthlyEMI =
    loanAmount > 0 ? calculateEMI(loanAmount, loanTerm, interestRate) : 0;

  // Loan totals
  const totalLoanPayments = monthlyEMI * loanTerm * 12;
  const totalInterest = totalLoanPayments - loanAmount;

  // Total upfront cost = Down payment + fees - incentives/trade + tax
  const totalUpfrontCost = downPaymentAmount + otherFees + salesTaxAmount;

  // Final total cost
  const totalCostOfOwnership = totalUpfrontCost + totalLoanPayments;

  return {
    vehiclePrice,
    downPaymentAmount,
    loanAmount,
    monthlyEMI,
    totalLoanPayments,
    totalInterest,
    salesTaxAmount,
    otherFees,
    cashIncentive,
    tradeInValue,
    totalUpfrontCost,
    totalCostOfOwnership,
    totalVehicleCost: vehiclePrice + salesTaxAmount + otherFees,
    loanTerm,
    interestRate,
    effectiveVehiclePrice: taxableAmount,
  };
};

// Generate car loan amortization schedule
export const generateCarLoanAmortization = (
  loanAmount,
  loanTerm,
  interestRate
) => {
  if (loanAmount <= 0) return [];
  return generateAmortizationSchedule(loanAmount, loanTerm, interestRate);
};

// Calculate comprehensive car purchase breakdown with monthly costs
export const calculateCarPurchaseBreakdown = ({
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  cashIncentive = 0,
  tradeInValue = 0,
  salesTaxPercent = 0.18,
  otherFees = 0,
}) => {
  const loanDetails = calculateCarLoanDetails({
    vehiclePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    cashIncentive,
    tradeInValue,
    salesTaxPercent,
    otherFees,
  });

  if (!loanDetails) return null;

  // Calculate monthly breakdown
  const monthlyTax = loanDetails.salesTaxAmount / (loanTerm * 12);
  const monthlyFees = otherFees / (loanTerm * 12);
  const monthlyIncentiveSavings = cashIncentive / (loanTerm * 12);
  const monthlyTradeInValue = tradeInValue / (loanTerm * 12);

  // Calculate savings from incentives and trade-in
  const totalSavings = cashIncentive + tradeInValue;
  const monthlySavings = totalSavings / (loanTerm * 12);

  return {
    ...loanDetails,
    monthlyTax,
    monthlyFees,
    monthlyIncentiveSavings,
    monthlyTradeInValue,
    monthlySavings,
    totalSavings,

    // Summary metrics
    loanToValueRatio: (loanDetails.loanAmount / vehiclePrice) * 100,
    effectiveInterestRate:
      loanDetails.loanAmount > 0
        ? (loanDetails.totalInterest / loanDetails.loanAmount / loanTerm) * 100
        : 0,

    // Payment breakdown
    paymentBreakdown: {
      principal: loanDetails.loanAmount,
      interest: loanDetails.totalInterest,
      downPayment: loanDetails.downPaymentAmount,
      tax: loanDetails.salesTaxAmount,
      fees: otherFees,
      savings: -totalSavings, // Negative because it reduces cost
    },
  };
};

// Calculate car affordability based on income and debt ratios
export const calculateCarAffordability = (
  monthlyIncome,
  existingMonthlyDebts = 0,
  maxDebtToIncomeRatio = 28, // 28% is conservative for car loans
  vehiclePrice,
  downPaymentPercent,
  interestRate,
  loanTerm
) => {
  const maxMonthlyPayment =
    (monthlyIncome * maxDebtToIncomeRatio) / 100 - existingMonthlyDebts;

  const carDetails = calculateCarLoanDetails({
    vehiclePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    cashIncentive: 0,
    tradeInValue: 0,
    salesTaxPercent: 0,
    otherFees: 0,
  });

  const isAffordable = carDetails
    ? carDetails.monthlyEMI <= maxMonthlyPayment
    : false;
  const monthlyDifference = carDetails
    ? maxMonthlyPayment - carDetails.monthlyEMI
    : 0;

  return {
    monthlyIncome,
    existingMonthlyDebts,
    maxMonthlyPayment,
    actualMonthlyPayment: carDetails?.monthlyEMI || 0,
    isAffordable,
    monthlyDifference,
    affordabilityPercentage: carDetails
      ? (carDetails.monthlyEMI / maxMonthlyPayment) * 100
      : 0,
    recommendedMaxVehiclePrice:
      maxMonthlyPayment > 0
        ? calculateMaxVehiclePrice(
            maxMonthlyPayment,
            downPaymentPercent,
            interestRate,
            loanTerm
          )
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
  const monthlyRate = interestRate / 100 / 12;
  const months = loanTerm * 12;

  // Calculate maximum loan amount based on monthly payment capacity
  const maxLoanAmount =
    monthlyRate > 0
      ? (maxMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, months))
      : maxMonthlyPayment * months;

  // Calculate maximum vehicle price considering down payment
  const maxVehiclePrice = maxLoanAmount / (1 - downPaymentPercent / 100);

  return Math.max(0, maxVehiclePrice);
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

//Home Investment Calculator
// Helper function to calculate EMI (Equated Monthly Installment)
const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 100 / 12;
  const months = tenure * 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
};

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

// Helper function to calculate net cash flow per year
const calculateNetCashFlow = (annualRent, emi, annualMaintenance) => {
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
const calculateROI = (currentValue, initialInvestment) => {
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
};

// Helper function to calculate future value of rental income with growth
const calculateFutureRentalValue = (monthlyRent, years, growthRate = 3) => {
  const annualRent = monthlyRent * 12;
  return calculateCompoundInterest(annualRent, growthRate, years);
};

// Main calculation function
export const calculateHomeInvestmentBreakdown = ({
  propertyPrice,
  downPaymentPercent,
  interestRate,
  loanTerm,
  annualMaintenance,
  propertyAppreciationRate,
  monthlyRentalIncome,
  registrationFees,
}) => {
  // Basic calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const totalInitialInvestment = downPaymentAmount + registrationFees;

  // EMI calculations
  const monthlyEMI = calculateEMI(loanAmount, interestRate, loanTerm);
  const totalInterestPaid = calculateTotalInterest(
    monthlyEMI,
    loanTerm,
    loanAmount
  );
  const totalAmountPaid = loanAmount + totalInterestPaid;

  // Rental calculations
  const annualRentalIncome = monthlyRentalIncome * 12;
  const rentalYield = calculateRentalYield(annualRentalIncome, propertyPrice);
  const netAnnualCashFlow = calculateNetCashFlow(
    annualRentalIncome,
    monthlyEMI,
    annualMaintenance
  );
  const monthlyNetCashFlow = netAnnualCashFlow / 12;

  // Property appreciation
  const propertyValueAfterLoanTerm = calculateCompoundInterest(
    propertyPrice,
    propertyAppreciationRate,
    loanTerm
  );

  // Break-even analysis
  const breakEvenPoint = calculateBreakEvenPoint(
    totalInitialInvestment,
    netAnnualCashFlow
  );

  // ROI calculations
  const totalEquityAfterLoanTerm = propertyValueAfterLoanTerm; // Assuming loan is fully paid
  const totalRentalIncomeOverTerm = annualRentalIncome * loanTerm;
  const totalMaintenanceOverTerm = annualMaintenance * loanTerm;
  const netRentalIncomeOverTerm =
    totalRentalIncomeOverTerm - totalMaintenanceOverTerm;

  // Total returns
  const capitalGains = propertyValueAfterLoanTerm - propertyPrice;
  const totalReturns = capitalGains + netRentalIncomeOverTerm;
  const totalInvested = totalInitialInvestment + totalAmountPaid;
  const overallROI = calculateROI(totalReturns + propertyPrice, totalInvested);

  // Annualized ROI
  const annualizedROI =
    (Math.pow(1 + overallROI / 100, 1 / loanTerm) - 1) * 100;

  // Year-wise breakdown for the first 10 years or loan term (whichever is less)
  const yearlyBreakdown = [];
  const analysisYears = Math.min(10, loanTerm);

  for (let year = 1; year <= analysisYears; year++) {
    const propertyValueThisYear = calculateCompoundInterest(
      propertyPrice,
      propertyAppreciationRate,
      year
    );
    const totalRentalToDate = annualRentalIncome * year;
    const totalMaintenanceToDate = annualMaintenance * year;
    const totalEMIPaidToDate = monthlyEMI * 12 * year;
    const netCashFlowToDate =
      totalRentalToDate - totalMaintenanceToDate - totalEMIPaidToDate;
    const equityBuilt =
      totalEMIPaidToDate - (totalInterestPaid * year) / loanTerm;

    yearlyBreakdown.push({
      year,
      propertyValue: propertyValueThisYear,
      totalRentalIncome: totalRentalToDate,
      totalMaintenance: totalMaintenanceToDate,
      totalEMIPaid: totalEMIPaidToDate,
      netCashFlow: netCashFlowToDate,
      equityBuilt: Math.max(0, equityBuilt),
      totalEquity: propertyValueThisYear,
    });
  }

  // Cash-on-cash return (first year)
  const cashOnCashReturn = (netAnnualCashFlow / totalInitialInvestment) * 100;

  // Loan-to-value ratio
  const loanToValue = (loanAmount / propertyPrice) * 100;

  return {
    // Basic Info
    propertyPrice,
    downPaymentAmount,
    loanAmount,
    registrationFees,
    totalInitialInvestment,
    loanToValue,

    // EMI Details
    monthlyEMI,
    totalInterestPaid,
    totalAmountPaid,

    // Rental Income
    monthlyRentalIncome,
    annualRentalIncome,
    rentalYield,
    monthlyNetCashFlow,
    netAnnualCashFlow,

    // Property Appreciation
    propertyValueAfterLoanTerm,
    capitalGains,

    // Returns Analysis
    overallROI,
    annualizedROI,
    cashOnCashReturn,
    breakEvenPoint,

    // Totals
    totalReturns,
    totalInvested,
    netRentalIncomeOverTerm,

    // Yearly Analysis
    yearlyBreakdown,

    // Additional Metrics
    totalCostOfOwnership:
      totalAmountPaid + totalInitialInvestment + annualMaintenance * loanTerm,

    // Investment summary
    summary: {
      isPositiveCashFlow: netAnnualCashFlow > 0,
      isProfitable: overallROI > 0,
      paybackPeriod: breakEvenPoint,
      recommendationScore: calculateRecommendationScore(
        overallROI,
        rentalYield,
        netAnnualCashFlow > 0 ? 1 : 0,
        propertyAppreciationRate
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

  // ROI component (30% weight)
  if (roi > 15) score += 15;
  else if (roi > 10) score += 10;
  else if (roi > 5) score += 5;
  else if (roi < 0) score -= 20;

  // Rental yield component (25% weight)
  if (rentalYield > 6) score += 12;
  else if (rentalYield > 4) score += 8;
  else if (rentalYield > 2) score += 4;
  else if (rentalYield < 1) score -= 10;

  // Cash flow component (25% weight)
  if (cashFlowPositive) score += 12;
  else score -= 15;

  // Appreciation component (20% weight)
  if (appreciationRate > 8) score += 10;
  else if (appreciationRate > 5) score += 6;
  else if (appreciationRate > 3) score += 3;
  else if (appreciationRate < 2) score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
};

// Export individual helper functions if needed elsewhere
export {
  calculateEMI,
  calculateCompoundInterest,
  calculateTotalInterest,
  calculateRentalYield,
  calculateNetCashFlow,
  calculateBreakEvenPoint,
  calculateROI,
  calculateFutureRentalValue,
};
