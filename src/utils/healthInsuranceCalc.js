/**
 * Health Insurance Adequacy Calculator — Calculation Logic
 * Calibrated to 2026 Indian healthcare costs, IRDAI/tax rules.
 */

const MEDICAL_INFLATION = 0.14; // 14% p.a.
const INFLATION_YEARS = 5;

// City-tier base covers (Individual & Family Floater)
const BASE_COVERS = {
  individual: { metro: 1500000, "tier-2": 1000000, "tier-3": 500000 },
  floater: { metro: 2500000, "tier-2": 1500000, "tier-3": 1000000 },
};

const SENIOR_MIN = 2000000; // ₹20L senior override

function roundToLakh(val) {
  return Math.round(val / 100000) * 100000;
}

export function calculateHealthInsurance(inputs) {
  const {
    coverType,        // "individual" | "floater"
    cityTier,         // "metro" | "tier-2" | "tier-3"
    eldestAge,        // number
    numMembers,       // number (floater only)
    preExisting,      // "none" | "one" | "two+"
    lifestyleRisk,    // "low" | "moderate" | "high"
    familyHistory,    // boolean
    recentHospitalization, // boolean

    employerCover,    // number
    existingPersonalCover, // number
    hasSuperTopUp,    // boolean
    superTopUpSI,     // number (if hasSuperTopUp)
    superTopUpDeductible, // number (if hasSuperTopUp)

    annualIncome,     // number
    taxRegime,        // "old" | "new"
    taxSlab,          // 5 | 10 | 20 | 30 (%)
    parentsCoverage,  // "none" | "below60" | "senior"
    selfFamilyPremium, // number
    parentsPremium,   // number
  } = inputs;

  // ─── Step 1: City-Tier Base Cover ─────────────────────────────────────
  let base = BASE_COVERS[coverType]?.[cityTier] || 1500000;

  // Senior override
  if (eldestAge >= 60) {
    base = Math.max(base, SENIOR_MIN);
  }

  // ─── Step 2: Risk Adjustments ──────────────────────────────────────────
  let riskAdj = 0;

  // Pre-existing conditions
  if (preExisting === "one") riskAdj += 500000;
  else if (preExisting === "two+") riskAdj += 1000000;

  // Lifestyle risk
  if (lifestyleRisk === "moderate") riskAdj += 250000;
  else if (lifestyleRisk === "high") riskAdj += 500000;

  // Family history
  if (familyHistory) riskAdj += 500000;

  // Recent hospitalization
  if (recentHospitalization) riskAdj += 300000;

  // Extra members (floater, beyond 2)
  if (coverType === "floater" && numMembers > 2) {
    riskAdj += (numMembers - 2) * 200000;
  }

  // Age band booster
  if (eldestAge >= 70) riskAdj += 1500000;
  else if (eldestAge >= 60) riskAdj += 1000000;
  else if (eldestAge >= 45) riskAdj += 500000;

  // ─── Step 3: Recommended & Ideal Cover ────────────────────────────────
  let recommendedCover = roundToLakh(base + riskAdj);

  // Inflation-adjusted ideal cover
  const inflationFactor = Math.pow(1 + MEDICAL_INFLATION, INFLATION_YEARS);
  let idealCover = roundToLakh(recommendedCover * inflationFactor);

  // ─── Step 4: Income Rule-of-Thumb ─────────────────────────────────────
  const incomeMin = annualIncome * 0.5;
  const finalRecommended = Math.max(recommendedCover, roundToLakh(incomeMin));
  recommendedCover = finalRecommended;

  // ─── Step 5: Effective Personal Cover & Gap ───────────────────────────
  let superTopUpEffective = 0;
  if (hasSuperTopUp && superTopUpSI > 0) {
    superTopUpEffective = Math.max(0, superTopUpSI - superTopUpDeductible);
  }
  const effectivePersonalCover = existingPersonalCover + superTopUpEffective;

  const rawGap = recommendedCover - effectivePersonalCover;
  const coverageGap = Math.max(0, rawGap);

  // Gap status
  let gapStatus = "adequate"; // "adequate" | "minor" | "significant"
  if (rawGap > 0 && rawGap <= 1000000) gapStatus = "minor";
  else if (rawGap > 1000000) gapStatus = "significant";

  // ─── Step 6: Super Top-Up Suggestion ─────────────────────────────────
  let superTopUpSuggestion = null;
  if (!hasSuperTopUp && coverageGap > 0) {
    const suggestedCover = coverageGap + 500000; // gap + ₹5L buffer
    const deductible = existingPersonalCover || base;
    // Age-based premium rate
    let premiumRate = 0.004;
    if (eldestAge >= 60) premiumRate = 0.008;
    else if (eldestAge >= 45) premiumRate = 0.006;
    const estimatedPremium = Math.round(suggestedCover * premiumRate);
    superTopUpSuggestion = {
      suggestedCover,
      deductible,
      estimatedPremium,
    };
  }

  // ─── Step 7: Section 80D Tax Saving ──────────────────────────────────
  let selfDeduction = 0;
  let parentsDeduction = 0;
  let totalDeduction = 0;
  let taxSaved = 0;

  if (taxRegime === "old") {
    const selfLimit = eldestAge >= 60 ? 50000 : 25000;
    selfDeduction = Math.min(selfFamilyPremium, selfLimit);

    if (parentsCoverage === "below60") {
      parentsDeduction = Math.min(parentsPremium, 25000);
    } else if (parentsCoverage === "senior") {
      parentsDeduction = Math.min(parentsPremium, 50000);
    }

    totalDeduction = Math.min(selfDeduction + parentsDeduction, 100000);
    const rate = (taxSlab || 0) / 100;
    taxSaved = Math.round(totalDeduction * rate * 1.04); // with 4% cess
  }

  // ─── Adequacy Score ───────────────────────────────────────────────────
  const rawScore = recommendedCover > 0
    ? (effectivePersonalCover / recommendedCover) * 100
    : 0;
  const adequacyScore = Math.min(100, Math.round(rawScore));

  let scoreLabel = "Critical Gap";
  let scoreColor = "#EF4444"; // red
  if (adequacyScore >= 100) { scoreLabel = "Well Covered"; scoreColor = "#22C55E"; }
  else if (adequacyScore >= 71) { scoreLabel = "Nearly Adequate"; scoreColor = "#EAB308"; }
  else if (adequacyScore >= 41) { scoreLabel = "Undercovered"; scoreColor = "#F97316"; }

  // ─── Inflation Reality ────────────────────────────────────────────────
  const coverPVIn5Yrs = existingPersonalCover > 0
    ? Math.round(existingPersonalCover / inflationFactor / 100000) * 100000
    : 0;

  // ─── Flags ───────────────────────────────────────────────────────────
  const showCriticalIllnessFlag = familyHistory || eldestAge >= 50;
  const showRetirementNote = eldestAge >= 55;

  return {
    base,
    recommendedCover,
    idealCover,
    effectivePersonalCover,
    employerCover,
    coverageGap,
    rawGap,
    gapStatus,
    adequacyScore,
    scoreLabel,
    scoreColor,
    superTopUpSuggestion,
    section80D: {
      selfDeduction,
      parentsDeduction,
      totalDeduction,
      taxSaved,
    },
    coverPVIn5Yrs,
    showCriticalIllnessFlag,
    showRetirementNote,
    inflationFactor,
    taxRegime,
    eldestAge,
  };
}
