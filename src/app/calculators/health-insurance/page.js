"use client";

import { useState, useEffect } from "react";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import HealthInsuranceResult from "@/components/HealthInsuranceResult";
import HealthInsuranceGraph from "@/components/HealthInsuranceGraph";
import HealthInsuranceAssumptions from "@/components/HealthInsuranceAssumptions";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { calculateHealthInsurance } from "@/utils/healthInsuranceCalc";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

// ──────────────────────────────────────────────
// Small helper: Segmented Toggle
// ──────────────────────────────────────────────
function SegmentToggle({ label, options, value, onChange, cols, tooltip }) {
  return (
    <div className="mb-1">
      <div className="flex items-center gap-1.5 mb-2">
        <label className="text-sm font-medium text-[#1A237E]">{label}</label>
        {tooltip && (
          <Popover>
            <PopoverTrigger>
              <Info width={14} className="text-gray-400 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="text-xs border-[#666666] max-w-xs">
              {tooltip}
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div
        className="grid bg-[#EFEDF4] rounded-lg p-1 gap-1"
        style={{ gridTemplateColumns: `repeat(${cols || options.length}, 1fr)` }}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-xs py-2 px-1 rounded-md transition-all text-center ${
              value === opt.value
                ? "bg-white shadow-sm font-semibold text-[#020288]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Checkbox
// ──────────────────────────────────────────────
function CheckboxField({ label, checked, onChange, tooltip }) {
  return (
    <div className="mb-1">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="accent-[#020288] w-4 h-4 rounded shrink-0 cursor-pointer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-[#1A237E] cursor-pointer" onClick={() => onChange(!checked)}>
            {label}
          </span>
          {tooltip && (
            <Popover>
              <PopoverTrigger>
                <Info width={14} className="text-gray-400 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="text-xs border-[#666666] max-w-xs">
                {tooltip}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function HealthInsuranceCalculator() {
  // ── Section 1: Profile ───────────────────────
  const [coverType, setCoverType] = useState("individual");
  const [cityTier, setCityTier] = useState("metro");
  const [eldestAge, setEldestAge] = useState(35);
  const [numMembers, setNumMembers] = useState(2);

  // ── Section 2: Health & Risk ─────────────────
  const [preExisting, setPreExisting] = useState("none");
  const [lifestyleRisk, setLifestyleRisk] = useState("low");
  const [familyHistory, setFamilyHistory] = useState(false);
  const [recentHospitalization, setRecentHospitalization] = useState(false);

  // ── Section 3: Existing Coverage ─────────────
  const [employerCover, setEmployerCover] = useState(500000);
  const [existingPersonalCover, setExistingPersonalCover] = useState(500000);
  const [hasSuperTopUp, setHasSuperTopUp] = useState(false);
  const [superTopUpSI, setSuperTopUpSI] = useState(2000000);
  const [superTopUpDeductible, setSuperTopUpDeductible] = useState(500000);

  // ── Section 4: Financial & Tax (collapsible) ──
  const [isTaxExpanded, setIsTaxExpanded] = useState(false);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [taxRegime, setTaxRegime] = useState("new");
  const [taxSlab, setTaxSlab] = useState(20);
  const [parentsCoverage, setParentsCoverage] = useState("none");
  const [selfFamilyPremium, setSelfFamilyPremium] = useState(15000);
  const [parentsPremium, setParentsPremium] = useState(0);

  const [result, setResult] = useState(null);

  // ── Auto-calculate on every state change ──────
  useEffect(() => {
    const inputs = {
      coverType,
      cityTier,
      eldestAge,
      numMembers,
      preExisting,
      lifestyleRisk,
      familyHistory,
      recentHospitalization,
      employerCover,
      existingPersonalCover,
      hasSuperTopUp,
      superTopUpSI,
      superTopUpDeductible,
      annualIncome,
      taxRegime,
      taxSlab,
      parentsCoverage,
      selfFamilyPremium,
      parentsPremium,
    };
    setResult(calculateHealthInsurance(inputs));
  }, [
    coverType, cityTier, eldestAge, numMembers,
    preExisting, lifestyleRisk, familyHistory, recentHospitalization,
    employerCover, existingPersonalCover, hasSuperTopUp, superTopUpSI, superTopUpDeductible,
    annualIncome, taxRegime, taxSlab, parentsCoverage, selfFamilyPremium, parentsPremium,
  ]);

  const performCalculations = () => {
    const inputs = {
      coverType, cityTier, eldestAge, numMembers,
      preExisting, lifestyleRisk, familyHistory, recentHospitalization,
      employerCover, existingPersonalCover, hasSuperTopUp, superTopUpSI, superTopUpDeductible,
      annualIncome, taxRegime, taxSlab, parentsCoverage, selfFamilyPremium, parentsPremium,
    };
    setResult(calculateHealthInsurance(inputs));
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Health Insurance Adequacy"
          desc="Find out if your health cover is enough for 2026 — calibrated to medical inflation & IRDAI guidelines"
        />

        <div className="flex flex-col gap-2">

          {/* ── Section 1: Profile Details ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
              1. Profile Details
            </h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">

              <SegmentToggle
                label="Cover Type"
                value={coverType}
                onChange={setCoverType}
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "floater", label: "Family Floater" },
                ]}
              />

              <SegmentToggle
                label="City Tier"
                value={cityTier}
                onChange={setCityTier}
                options={[
                  { value: "metro", label: "Metro" },
                  { value: "tier-2", label: "Tier-2 City" },
                  { value: "tier-3", label: "Tier-3 / Town" },
                ]}
                cols={3}
                tooltip="Metro = Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata. Tier-2 = Jaipur, Ahmedabad, Lucknow, Surat etc."
              />

              <SliderInput
                label="Eldest Member Age (years)"
                value={eldestAge}
                onChange={setEldestAge}
                min={18}
                max={85}
                step={1}
                tooltip="Use the age of the oldest person to be covered — determines risk profile and recommended cover"
                showCurrency={false}
              />

              {coverType === "floater" && (
                <SliderInput
                  label="Number of Members to Cover"
                  value={numMembers}
                  onChange={setNumMembers}
                  min={1}
                  max={6}
                  step={1}
                  tooltip="Total family members under the floater policy"
                  showCurrency={false}
                />
              )}
            </div>
          </div>

          {/* ── Section 2: Health & Risk Profile ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
              2. Health & Risk Profile
            </h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">

              <SegmentToggle
                label="Pre-existing Conditions"
                value={preExisting}
                onChange={setPreExisting}
                options={[
                  { value: "none", label: "None" },
                  { value: "one", label: "1 Condition" },
                  { value: "two+", label: "2+ Conditions" },
                ]}
                cols={3}
                tooltip="Diabetes, hypertension, thyroid, asthma, heart disease etc. Each adds hospitalization risk."
              />

              <SegmentToggle
                label="Lifestyle Risk"
                value={lifestyleRisk}
                onChange={setLifestyleRisk}
                options={[
                  { value: "low", label: "Low" },
                  { value: "moderate", label: "Moderate" },
                  { value: "high", label: "High" },
                ]}
                tooltip="Low = non-smoker, active, no alcohol. Moderate = sedentary desk job, occasional stress. High = smoker, high stress, sedentary + urban pollution."
              />

              <CheckboxField
                label="Family History of Critical Illness?"
                checked={familyHistory}
                onChange={setFamilyHistory}
                tooltip="Cancer, heart disease, kidney failure, stroke in immediate family — increases recommended cover."
              />

              <CheckboxField
                label="Hospitalised in Last 3 Years?"
                checked={recentHospitalization}
                onChange={setRecentHospitalization}
                tooltip="Recent hospitalization indicates higher-than-average utilization risk."
              />
            </div>
          </div>

          {/* ── Section 3: Existing Coverage ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
              3. Existing Coverage
            </h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">

              <SliderInput
                label="Employer Group Cover"
                value={employerCover}
                onChange={setEmployerCover}
                min={0}
                max={2000000}
                step={50000}
                tooltip="Group insurance from your employer. NOT portable — does not count toward your personal adequacy baseline"
                showCurrency={true}
              />

              <SliderInput
                label="Existing Personal Health Cover"
                value={existingPersonalCover}
                onChange={setExistingPersonalCover}
                min={0}
                max={5000000}
                step={50000}
                tooltip="Your own retail policy sum insured (individual or floater)"
                showCurrency={true}
              />

              <CheckboxField
                label="Do you have a Super Top-Up?"
                checked={hasSuperTopUp}
                onChange={setHasSuperTopUp}
                tooltip="A super top-up plan activates only after your deductible (= your base cover) is exhausted in a year — the most cost-efficient way to significantly increase your total cover."
              />

              {hasSuperTopUp && (
                <>
                  <SliderInput
                    label="Super Top-Up Sum Insured"
                    value={superTopUpSI}
                    onChange={setSuperTopUpSI}
                    min={0}
                    max={10000000}
                    step={100000}
                    tooltip="Total sum insured of your super top-up plan"
                    showCurrency={true}
                  />
                  <SliderInput
                    label="Super Top-Up Deductible"
                    value={superTopUpDeductible}
                    onChange={setSuperTopUpDeductible}
                    min={0}
                    max={2000000}
                    step={50000}
                    tooltip="The deductible (usually = your base cover) before the super top-up kicks in"
                    showCurrency={true}
                  />
                </>
              )}
            </div>
          </div>

          {/* ── Section 4: Financial & Tax (Collapsible) ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div
              className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
              onClick={() => setIsTaxExpanded(!isTaxExpanded)}
            >
              <h2 className="text-[#020288] text-base font-semibold">
                4. Financial & Tax Details{" "}
                <span className="text-[10px] font-normal text-gray-400">(Optional)</span>
              </h2>
              <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                {isTaxExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {!isTaxExpanded && (
              <p
                className="text-xs text-gray-500 italic mt-2 cursor-pointer"
                onClick={() => setIsTaxExpanded(true)}
              >
                Tap to expand for Section 80D tax saving calculation
              </p>
            )}

            {isTaxExpanded && (
              <div className="flex flex-col gap-5 mt-3 ml-1">

                <SliderInput
                  label="Annual Income"
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  min={200000}
                  max={10000000}
                  step={50000}
                  tooltip="Used to check the 50%-of-income rule-of-thumb alongside cost-based recommendations"
                  showCurrency={true}
                />

                <SegmentToggle
                  label="Tax Regime"
                  value={taxRegime}
                  onChange={setTaxRegime}
                  options={[
                    { value: "old", label: "Old Regime" },
                    { value: "new", label: "New Regime" },
                  ]}
                  tooltip="Section 80D health insurance deduction is only available under the Old Tax Regime."
                />

                {taxRegime === "old" && (
                  <div className="mb-1">
                    <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                      Income Tax Slab (%)
                    </label>
                    <div className="grid grid-cols-4 gap-1 bg-[#EFEDF4] p-1 rounded-lg">
                      {[5, 10, 20, 30].map((slab) => (
                        <button
                          key={slab}
                          onClick={() => setTaxSlab(slab)}
                          className={`text-xs py-2 rounded-md transition-all ${
                            taxSlab === slab
                              ? "bg-white shadow-sm font-semibold text-[#020288]"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {slab}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <SegmentToggle
                  label="Parents Covered Under Your Policy?"
                  value={parentsCoverage}
                  onChange={setParentsCoverage}
                  options={[
                    { value: "none", label: "Not Covered" },
                    { value: "below60", label: "Parents < 60" },
                    { value: "senior", label: "Parents ≥ 60" },
                  ]}
                  cols={3}
                />

                <SliderInput
                  label="Annual Premium — Self / Family"
                  value={selfFamilyPremium}
                  onChange={setSelfFamilyPremium}
                  min={0}
                  max={100000}
                  step={500}
                  tooltip="Current annual premium paid for self and family health policy"
                  showCurrency={true}
                />

                {parentsCoverage !== "none" && (
                  <SliderInput
                    label="Annual Premium — Parents"
                    value={parentsPremium}
                    onChange={setParentsPremium}
                    min={0}
                    max={100000}
                    step={500}
                    tooltip="Current annual premium paid for parents' health policy"
                    showCurrency={true}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          CALCULATE ADEQUACY
        </button>

        <HealthInsuranceResult result={result} />
        <HealthInsuranceGraph result={result} />
        <HealthInsuranceAssumptions />
      </div>
    </div>
  );
}
