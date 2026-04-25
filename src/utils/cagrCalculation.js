export const BENCHMARKS = [
  { rankId: 1, name: "Nifty Smallcap 250", cagr: 18, type: "Equity" },
  { rankId: 2, name: "Nifty Midcap 150", cagr: 15, type: "Equity" },
  { rankId: 3, name: "Nifty 50", cagr: 12, type: "Equity" },
  { rankId: 4, name: "Gold (INR)", cagr: 11.5, type: "Gold" },
  { rankId: 5, name: "NPS Equity", cagr: 10, type: "Equity" }, // Using Equity taxation for NPS lump sum for simplicity, or we can use special NPS rules if needed. We'll use EEE for 60% and slab for rest, but actually let's just use Debt/Slab for conservative, or just "Custom" logic. Wait, requirement says: NPS Lumpsum (60%): Tax-free. Annuity income taxable at slab. Let's use 'NPS' type.
  { rankId: 6, name: "EPF", cagr: 8.25, type: "PPF / EPF (EEE)" },
  { rankId: 7, name: "PPF", cagr: 7.1, type: "PPF / EPF (EEE)" },
  { rankId: 8, name: "Bank FD", cagr: 7.0, type: "Debt / FD" }
];

export const calculateTax = (gain, durationYears, assetClass, taxSlab) => {
  const isSTCG = (assetClass === 'Equity' || assetClass === 'Equity MF' || assetClass === 'NPS') ? durationYears <= 1 : durationYears <= 2;
  const isLTCG = !isSTCG;
  const slabRate = taxSlab / 100;
  
  let tax = 0;

  if (assetClass === 'PPF / EPF (EEE)') {
    tax = 0;
  } else if (assetClass === 'Equity' || assetClass === 'Equity MF') {
    if (isLTCG) {
      const taxableGain = Math.max(0, gain - 125000);
      tax = taxableGain * 0.125 * 1.04;
    } else {
      tax = gain * 0.20 * 1.04;
    }
  } else if (assetClass === 'NPS') {
     // Simplifying NPS: 60% tax-free, 40% annuity taxed at slab
     tax = (gain * 0.40) * slabRate * 1.04; 
  } else if (assetClass === 'Debt / FD' || assetClass === 'Debt') {
    tax = gain * slabRate * 1.04;
  } else if (assetClass === 'Gold' || assetClass === 'Real Estate') {
    if (isLTCG) {
      tax = gain * 0.125 * 1.04;
    } else {
      tax = gain * slabRate * 1.04;
    }
  } else if (assetClass === 'Custom') {
    // We expect the custom tax rate to be passed as taxSlab
    tax = gain * slabRate * 1.04;
  } else {
     // default
     tax = gain * slabRate * 1.04;
  }

  return tax;
};

export const calculateCAGR = (inputs) => {
  const {
    mode, // "Reverse", "Lumpsum", "SIP"
    initialValue = 0,
    finalValue = 0,
    principal = 0,
    expectedReturn = 0,
    monthlySip = 0,
    years = 1,
    months = 0,
    stepUp = 0,
    assetClass = 'Equity MF',
    taxSlab = 30, // 0 to 30
    inflation = 6,
    customTaxRate = 0
  } = inputs;

  let durationInYears = years + (months / 12);
  if (mode !== "Reverse") durationInYears = years; // forward uses pure years as per inputs

  let result = {
    cagr: 0,
    futureValue: 0,
    totalInvested: 0,
    totalGain: 0,
    absoluteReturn: 0,
    postTaxCorpus: 0,
    taxAmount: 0,
    realCagr: 0,
    realPostTaxCagr: 0,
    wealthMultiplier: 0,
    timeline: [], // for chart
    benchmarks: [], // for comparison
    ruleOf72: 0,
    doublingCount: 0,
    isRealLoss: false
  };

  const r = expectedReturn / 100;
  const inf = inflation / 100;
  const timelineData = [];

  if (mode === "Reverse") {
    result.totalInvested = initialValue;
    result.futureValue = finalValue;
    result.totalGain = finalValue - initialValue;
    result.absoluteReturn = (result.totalGain / initialValue) * 100;
    if (durationInYears > 0 && initialValue > 0) {
      result.cagr = (Math.pow(finalValue / initialValue, 1 / durationInYears) - 1) * 100;
    }
    
    // For timeline, just do straight compounding from initial to final over duration
    for (let i = 0; i <= Math.ceil(durationInYears); i++) {
       const yr = Math.min(i, durationInYears);
       const val = initialValue * Math.pow(1 + result.cagr / 100, yr);
       const infVal = initialValue * Math.pow(1 + inf, yr);
       const fdVal = initialValue * Math.pow(1 + 0.07, yr);
       timelineData.push({ year: i, corpus: Math.round(val), inflationAdjusted: Math.round(infVal), fdBenchmark: Math.round(fdVal) });
    }

  } else if (mode === "Lumpsum") {
    result.totalInvested = principal;
    result.futureValue = principal * Math.pow(1 + r, durationInYears);
    result.totalGain = result.futureValue - principal;
    result.absoluteReturn = (result.totalGain / principal) * 100;
    result.cagr = expectedReturn;

    for (let i = 0; i <= durationInYears; i++) {
       const val = principal * Math.pow(1 + r, i);
       const infVal = principal * Math.pow(1 + inf, i);
       const fdVal = principal * Math.pow(1 + 0.07, i);
       timelineData.push({ year: i, corpus: Math.round(val), inflationAdjusted: Math.round(infVal), fdBenchmark: Math.round(fdVal) });
    }

  } else if (mode === "SIP") {
    let totalCorpus = 0;
    let totalInvested = 0;
    let currentMonthlySip = monthlySip;
    
    // Monthly rate
    const r_m = r / 12;

    for (let y = 1; y <= durationInYears; y++) {
      let yearStartCorpus = totalCorpus;
      let yearEndCorpus = yearStartCorpus * Math.pow(1 + r_m, 12);
      
      // Contributions for this year
      let thisYearContributionsFV = currentMonthlySip * ((Math.pow(1 + r_m, 12) - 1) / r_m) * (1 + r_m);
      totalCorpus = yearEndCorpus + thisYearContributionsFV;
      totalInvested += currentMonthlySip * 12;

      const infVal = totalInvested; // Simplified: just show nominal invested vs real value, or actually let's calculate exact FD comparison
      // Compute FD equivalent for the same SIP
      let fdCorpus = 0;
      let currentFdSip = monthlySip;
      for (let fy = 1; fy <= y; fy++) {
        let yrStartCorpusFd = fdCorpus;
        let yrEndCorpusFd = yrStartCorpusFd * Math.pow(1 + 0.07/12, 12);
        let fdContFV = currentFdSip * ((Math.pow(1 + 0.07/12, 12) - 1) / (0.07/12)) * (1 + 0.07/12);
        fdCorpus = yrEndCorpusFd + fdContFV;
        currentFdSip = currentFdSip * (1 + (stepUp / 100));
      }

      timelineData.push({ 
        year: y, 
        corpus: Math.round(totalCorpus), 
        inflationAdjusted: Math.round(totalInvested * Math.pow(1 + inf, y)), // Rough approximation for inflation line
        fdBenchmark: Math.round(fdCorpus) 
      });

      // Increase SIP for next year
      currentMonthlySip = currentMonthlySip * (1 + (stepUp / 100));
    }
    
    // Add year 0
    timelineData.unshift({ year: 0, corpus: 0, inflationAdjusted: 0, fdBenchmark: 0 });

    result.futureValue = totalCorpus;
    result.totalInvested = totalInvested;
    result.totalGain = result.futureValue - result.totalInvested;
    result.absoluteReturn = (result.totalGain / result.totalInvested) * 100;
    result.cagr = expectedReturn; // Entered expected return
  }

  result.timeline = timelineData;

  // Real CAGR
  result.realCagr = ((1 + result.cagr / 100) / (1 + inf) - 1) * 100;

  // Post-Tax
  const activeTaxRate = assetClass === 'Custom' ? customTaxRate : taxSlab;
  result.taxAmount = calculateTax(result.totalGain, durationInYears, assetClass, activeTaxRate);
  result.postTaxCorpus = result.futureValue - result.taxAmount;
  
  if (mode === "SIP") {
      // Approximate post tax CAGR for SIP based on final corpus
      // Solving for r in complex equation is hard, let's use an approximation based on ratio
      const ratio = result.postTaxCorpus / result.totalInvested;
      result.postTaxCagr = result.cagr * (result.postTaxCorpus - result.totalInvested) / result.totalGain; // Simple approximation
      if(result.totalGain <= 0) result.postTaxCagr = result.cagr;
  } else {
      if (result.totalInvested > 0 && durationInYears > 0) {
        result.postTaxCagr = (Math.pow(result.postTaxCorpus / result.totalInvested, 1 / durationInYears) - 1) * 100;
      } else {
        result.postTaxCagr = 0;
      }
  }

  result.realPostTaxCagr = ((1 + (result.postTaxCagr || 0) / 100) / (1 + inf) - 1) * 100;
  result.wealthMultiplier = result.totalInvested > 0 ? result.futureValue / result.totalInvested : 0;
  
  if (result.cagr > 0) {
    result.ruleOf72 = 72 / result.cagr;
    result.doublingCount = durationInYears / result.ruleOf72;
  }

  result.isRealLoss = result.realPostTaxCagr < 0;

  // Benchmarks
  BENCHMARKS.forEach(b => {
    let bInvested = result.totalInvested;
    let bFV = 0;
    let bGain = 0;

    if (mode === "Reverse" || mode === "Lumpsum") {
      bFV = result.totalInvested * Math.pow(1 + b.cagr / 100, durationInYears);
    } else {
      let tempCorpus = 0;
      let currSip = monthlySip;
      const b_rm = (b.cagr / 100) / 12;
      for (let y = 1; y <= durationInYears; y++) {
        let yrEnd = tempCorpus * Math.pow(1 + b_rm, 12);
        let cont = currSip * ((Math.pow(1 + b_rm, 12) - 1) / b_rm) * (1 + b_rm);
        tempCorpus = yrEnd + cont;
        currSip = currSip * (1 + (stepUp / 100));
      }
      bFV = tempCorpus;
    }

    bGain = bFV - bInvested;
    let bTax = calculateTax(bGain, durationInYears, b.type, taxSlab); // using user's tax slab for debt/slab-rate assets
    let bPostTaxCorpus = bFV - bTax;
    
    let bPostTaxCagr = 0;
    if (mode === "SIP") {
      bPostTaxCagr = b.cagr * (bPostTaxCorpus - bInvested) / (bGain || 1); 
    } else {
      if (bInvested > 0 && durationInYears > 0) {
        bPostTaxCagr = (Math.pow(bPostTaxCorpus / bInvested, 1 / durationInYears) - 1) * 100;
      }
    }
    
    let bRealPostTaxCagr = ((1 + bPostTaxCagr / 100) / (1 + inf) - 1) * 100;

    result.benchmarks.push({
      ...b,
      futureValue: bFV,
      postTaxCorpus: bPostTaxCorpus,
      realPostTaxCagr: bRealPostTaxCagr
    });
  });

  // Add User to benchmarks
  result.benchmarks.push({
    rankId: 0,
    name: "Your Investment",
    cagr: result.cagr,
    type: assetClass,
    futureValue: result.futureValue,
    postTaxCorpus: result.postTaxCorpus,
    realPostTaxCagr: result.realPostTaxCagr,
    isUser: true
  });

  // Sort benchmarks by PostTaxCorpus descending
  result.benchmarks.sort((a, b) => b.postTaxCorpus - a.postTaxCorpus);
  
  // Re-assign ranks
  result.benchmarks.forEach((b, index) => {
    b.currentRank = index + 1;
  });

  return result;
};
