"use client";

import { useState, useEffect } from "react";
import { calculateRetirementCorpus } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import RetirementResult from "@/components/RetirementResult";
import RetirementGraph from "@/components/RetirementGraph";
import RetirementAssumptions from "@/components/RetirementAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RetirementCorpus() {
  // Section 1 — Personal Details
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(55);
  const [employmentType, setEmploymentType] = useState("salaried_private");

  // Section 2 — Monthly Expenses & Lifestyle
  const [currentExpenses, setCurrentExpenses] = useState(50000);
  const [inflationType, setInflationType] = useState("moderate"); // moderate, urban, custom
  const [customInflation, setCustomInflation] = useState(8);
  const [expectedRetirementExpenses, setExpectedRetirementExpenses] = useState(0); // prefilled
  const [fireVariant, setFireVariant] = useState("regular"); // lean, regular, fat

  // Section 3 — Current Savings & Investments
  const [epfBalance, setEpfBalance] = useState(0);
  const [epfMonthly, setEpfMonthly] = useState(0);
  const [npsBalance, setNpsBalance] = useState(0);
  const [npsMonthly, setNpsMonthly] = useState(0);
  const [equityBalance, setEquityBalance] = useState(0);
  const [equityMonthly, setEquityMonthly] = useState(0);
  const [ppfBalance, setPpfBalance] = useState(0);
  const [ppfMonthly, setPpfMonthly] = useState(0);
  const [debtBalance, setDebtBalance] = useState(0);

  // Section 4 — Return Rate Assumptions
  const [isReturnsExpanded, setIsReturnsExpanded] = useState(false);
  const [epfReturn, setEpfReturn] = useState(8.25);
  const [npsReturn, setNpsReturn] = useState(10);
  const [equityReturn, setEquityReturn] = useState(12);
  const [ppfReturn, setPpfReturn] = useState(7.1);
  const [debtReturn, setDebtReturn] = useState(7);
  const [postRetirementReturn, setPostRetirementReturn] = useState(7);

  // Section 5 — NPS & Post-Retirement Tax Details
  const [isTaxExpanded, setIsTaxExpanded] = useState(false);
  const [npsSubscriberType, setNpsSubscriberType] = useState("non-government");
  const [taxSlab, setTaxSlab] = useState(0);
  const [annuityRate, setAnnuityRate] = useState(5.5);

  const [result, setResult] = useState(null);

  // Pre-fill expected expectedRetirementExpenses when inputs change
  useEffect(() => {
    const yearsToRetirement = Math.max(0, targetAge - currentAge);
    let infRate = inflationType === "moderate" ? 6 : inflationType === "urban" ? 8 : customInflation;
    const futureExpenses = Math.round(currentExpenses * Math.pow(1 + infRate / 100, yearsToRetirement));
    setExpectedRetirementExpenses(futureExpenses);
  }, [currentAge, targetAge, currentExpenses, inflationType, customInflation]);

  useEffect(() => {
    performCalculations();
  }, [
    currentAge, targetAge, employmentType,
    currentExpenses, inflationType, customInflation, expectedRetirementExpenses, fireVariant,
    epfBalance, epfMonthly, npsBalance, npsMonthly, equityBalance, equityMonthly, ppfBalance, ppfMonthly, debtBalance,
    epfReturn, npsReturn, equityReturn, ppfReturn, debtReturn, postRetirementReturn,
    npsSubscriberType, taxSlab, annuityRate
  ]);

  const performCalculations = () => {
    let inflRate = inflationType === "moderate" ? 6 : inflationType === "urban" ? 8 : customInflation;
    
    // Implicit Target corpus multiple and SWR
    let multiplier = 33;
    let swr = 3;
    if (fireVariant === "lean") {
      multiplier = 25;
      swr = 4;
    } else if (fireVariant === "fat") {
      multiplier = 40;
      swr = 2.5;
    }

    const inputs = {
      currentAge,
      targetAge,
      employmentType,
      currentExpenses,
      inflationRate: inflRate,
      fireVariantMultiplier: multiplier,
      safeWithdrawalRate: swr,
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
      annuityRate
    };
    
    // Auto-sync employee type with NPS subscriber type
    if (employmentType === "salaried_govt" && npsSubscriberType !== "government") {
       setNpsSubscriberType("government");
    } else if (employmentType !== "salaried_govt" && npsSubscriberType === "government") {
       setNpsSubscriberType("non-government");
    }

    const res = calculateRetirementCorpus({
      ...inputs,
      // If user overrides the pre-filled expected expenses, we imply a different effective inflation rate for target.
      // But calculating that reverse infl rate is tricky, simpler is to just use the actual value if they edited it?
      // Wait, let's keep it simple and just use the inflation rate. But if they manually edited expectedRetirementExpenses,
      // we should use that to build target corpus.
      currentExpenses: expectedRetirementExpenses / Math.pow(1 + inflRate / 100, Math.max(0, targetAge - currentAge))
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto pb-10">
        <Heading
          header="Retirement Corpus & FIRE Calculator"
          desc="Calculate your target retirement corpus and CoastFIRE number using India-specific rules"
        />

        <div className="flex flex-col gap-2">
          {/* Section 1 — Personal Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Personal Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <SliderInput
                label="Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                min={18}
                max={65}
                step={1}
                tooltip="Your current age"
              />

              <div>
                 <SliderInput
                   label="Target Retirement Age"
                   value={targetAge}
                   onChange={setTargetAge}
                   min={30}
                   max={70}
                   step={1}
                   tooltip="Age when you plan to retire or achieve FIRE"
                 />
                 {targetAge > currentAge && (
                   <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block mt-2">
                     Years to Retirement: {targetAge - currentAge}
                   </span>
                 )}
                 {targetAge <= currentAge && (
                   <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full inline-block mt-2">
                     Must be greater than current age
                   </span>
                 )}
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Employment Type</label>
                <div className="flex flex-wrap gap-1 bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setEmploymentType("salaried_private")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employmentType === "salaried_private" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Salaried (Private)</button>
                  <button 
                    onClick={() => setEmploymentType("salaried_govt")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employmentType === "salaried_govt" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Salaried (Govt)</button>
                  <button 
                    onClick={() => setEmploymentType("self_employed")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employmentType === "self_employed" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Business</button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 — Monthly Expenses & Lifestyle */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. Monthly Expenses & Lifestyle</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">

              <SliderInput
                label="Current Monthly Expenses"
                value={currentExpenses}
                onChange={setCurrentExpenses}
                min={10000}
                max={500000}
                step={2500}
                showCurrency={true}
                tooltip="All household expenses — rent, food, utilities, EMIs, lifestyle, travel. Exclude savings & investments."
              />

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Lifestyle Inflation</label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setInflationType("moderate")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${inflationType === "moderate" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Moderate (6%)</button>
                  <button 
                    onClick={() => setInflationType("urban")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${inflationType === "urban" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Urban/Metro (8%)</button>
                  <button 
                    onClick={() => setInflationType("custom")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${inflationType === "custom" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Custom</button>
                </div>
              </div>

              {inflationType === "custom" && (
                <SliderInput
                  label="Custom Inflation Rate %"
                  value={customInflation}
                  onChange={setCustomInflation}
                  min={3}
                  max={12}
                  step={0.5}
                  tooltip="Urban Indians realistically face 8-10% expense inflation."
                />
              )}

              <SliderInput
                label="Expected Monthly Expenses at Retirement"
                value={expectedRetirementExpenses}
                onChange={setExpectedRetirementExpenses}
                min={10000}
                max={2000000}
                step={5000}
                showCurrency={true}
                tooltip="Auto-calculated from your current expenses and inflation. Edit if you expect a different lifestyle."
              />

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">FIRE Variant</label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setFireVariant("lean")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${fireVariant === "lean" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Lean FIRE</button>
                  <button 
                    onClick={() => setFireVariant("regular")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${fireVariant === "regular" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Regular FIRE</button>
                  <button 
                    onClick={() => setFireVariant("fat")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${fireVariant === "fat" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Fat FIRE</button>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic px-1">
                  {fireVariant === "lean" && "Lean: Minimalist lifestyle, tight budget, 4% withdrawal, 25x — riskier in India"}
                  {fireVariant === "regular" && "Regular: Comfortable middle-class life, 3% withdrawal, 33x — India-recommended"}
                  {fireVariant === "fat" && "Fat: Premium lifestyle, travel, private healthcare, 2.5% withdrawal, 40x — very conservative"}
                </p>
                <div className="bg-[#EFEDF4] rounded-xl p-3 border border-[#d0ccee] mt-3 mx-1">
                   <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A237E] mb-1">🏥 Medical Inflation Nudge</p>
                   <p className="text-xs text-[#1A237E]">Healthcare costs inflate at 14% p.a. in India. Your target corpus includes general lifestyle inflation only. Consider a separate ₹20–50L health corpus or a super top-up policy to ring-fence medical costs.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3 — Current Savings & Investments */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">3. Current Savings & Investments</h2>
            <div className="flex flex-col gap-6 mt-4 ml-1">

              <div className="bg-gray-50 p-4 rounded-xl border space-y-5">
                <SliderInput
                  label="EPF Current Balance"
                  value={epfBalance}
                  onChange={setEpfBalance}
                  min={0}
                  max={10000000}
                  step={25000}
                  showCurrency={true}
                  tooltip="Check your EPFO passbook or UAN portal for current EPF balance"
                />
                <SliderInput
                  label="Monthly EPF Contribution (Your share)"
                  value={epfMonthly}
                  onChange={setEpfMonthly}
                  min={0}
                  max={50000}
                  step={500}
                  showCurrency={true}
                  tooltip="Typically 12% of Basic salary. Your share only — not employer's."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border space-y-5">
                <SliderInput
                  label="NPS Current Balance"
                  value={npsBalance}
                  onChange={setNpsBalance}
                  min={0}
                  max={50000000}
                  step={25000}
                  showCurrency={true}
                />
                <SliderInput
                  label="Monthly NPS Contribution"
                  value={npsMonthly}
                  onChange={setNpsMonthly}
                  min={0}
                  max={100000}
                  step={500}
                  showCurrency={true}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border space-y-5">
                <SliderInput
                  label="Equity Mutual Funds / Stocks Value"
                  value={equityBalance}
                  onChange={setEquityBalance}
                  min={0}
                  max={100000000}
                  step={50000}
                  showCurrency={true}
                />
                <SliderInput
                  label="Monthly Equity SIP"
                  value={equityMonthly}
                  onChange={setEquityMonthly}
                  min={0}
                  max={200000}
                  step={1000}
                  showCurrency={true}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border space-y-5">
                <SliderInput
                  label="PPF Current Balance"
                  value={ppfBalance}
                  onChange={setPpfBalance}
                  min={0}
                  max={5000000}
                  step={10000}
                  showCurrency={true}
                  tooltip="Max PPF balance possible is ~₹1.5L/year."
                />
                <SliderInput
                  label="Monthly PPF Contribution"
                  value={ppfMonthly}
                  onChange={setPpfMonthly}
                  min={0}
                  max={12500}
                  step={500}
                  showCurrency={true}
                  tooltip="Max ₹1.5L per year = ₹12,500/month"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <SliderInput
                  label="Other Savings (FD, Debt Funds) Value"
                  value={debtBalance}
                  onChange={setDebtBalance}
                  min={0}
                  max={50000000}
                  step={25000}
                  showCurrency={true}
                />
              </div>
              
              <div className="text-center">
                 <p className="text-xs text-green-700 font-semibold bg-green-50 p-2 rounded-lg inline-block border border-green-200">
                    💡 Increasing your SIP by 10% every year (salary step-up) dramatically accelerates corpus growth.
                 </p>
              </div>

            </div>
          </div>

          {/* Section 4 — Return Rate Assumptions */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2"
               onClick={() => setIsReturnsExpanded(!isReturnsExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">4. Return Rate Assumptions</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isReturnsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isReturnsExpanded && (
               <p className="text-xs text-gray-500 italic mt-3" onClick={() => setIsReturnsExpanded(true)}>
                  Tap to expand return rate inputs (EPF at 8.25%, Equity at 12%, etc.)
               </p>
            )}

            {isReturnsExpanded && (
              <div className="flex flex-col gap-6 mt-5 ml-1">
                <SliderInput label="EPF Return Rate (%)" value={epfReturn} onChange={setEpfReturn} min={6} max={10} step={0.25} />
                <SliderInput label="NPS Return Rate (%)" value={npsReturn} onChange={setNpsReturn} min={7} max={15} step={0.25} />
                <SliderInput label="Equity / SIP Return Rate (%)" value={equityReturn} onChange={setEquityReturn} min={8} max={18} step={0.5} />
                <SliderInput label="PPF Return Rate (%)" value={ppfReturn} onChange={setPpfReturn} min={6} max={8} step={0.1} />
                <SliderInput label="Debt / FD Return Rate (%)" value={debtReturn} onChange={setDebtReturn} min={5} max={9} step={0.25} />
                <SliderInput 
                   label="Post-Retirement Withdrawal Return Rate (%)" 
                   value={postRetirementReturn} 
                   onChange={setPostRetirementReturn} 
                   min={5} max={10} step={0.25} 
                   tooltip="Expected return on your corpus after retirement. Use a conservative rate."
                />
              </div>
            )}
          </div>

          {/* Section 5 — NPS & Post-Retirement Tax Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2"
               onClick={() => setIsTaxExpanded(!isTaxExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">5. Tax & Annuity Details</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isTaxExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isTaxExpanded && (
               <p className="text-xs text-gray-500 italic mt-3" onClick={() => setIsTaxExpanded(true)}>
                  Tap to expand tax slab and annuity rate settings for retirement
               </p>
            )}

            {isTaxExpanded && (
              <div className="flex flex-col gap-5 mt-5 ml-1">
                <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">NPS Subscriber Type</label>
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                    <button 
                      onClick={() => setNpsSubscriberType("non-government")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${npsSubscriberType === "non-government" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >Non-Government</button>
                    <button 
                      onClick={() => setNpsSubscriberType("government")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${npsSubscriberType === "government" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >Government / PSU</button>
                  </div>
                </div>

                <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">Post-Retirement Income Tax Slab (%)</label>
                  <div className="flex flex-wrap gap-1 bg-[#EFEDF4] rounded-lg p-1">
                    {[0, 5, 10, 20, 30].map(slab => (
                      <button 
                        key={slab}
                        onClick={() => setTaxSlab(slab)}
                        className={`flex-1 text-xs py-2 rounded-md transition-all ${taxSlab === slab ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >{slab}%</button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic px-1">Used to estimate tax on NPS annuity income and SLW withdrawals</p>
                </div>

                <SliderInput 
                   label="Expected Annuity Rate (%)" 
                   value={annuityRate} 
                   onChange={setAnnuityRate} 
                   min={4} max={8} step={0.25} 
                   tooltip="Current annuity payout rates in India for NPS are ~5–6.5%. Use 5.5% as conservative."
                />
              </div>
            )}
          </div>

        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          CALCULATE
        </button>

        <RetirementResult result={result} />
        <RetirementGraph result={result} />
        <RetirementAssumptions />
        
      </div>
    </div>
  );
}
