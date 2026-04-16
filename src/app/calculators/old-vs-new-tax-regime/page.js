"use client";

import { useState, useEffect } from "react";
import { calculateIncomeTaxBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import IncomeTaxResult from "@/components/IncomeTaxResult";
import IncomeTaxGraph from "@/components/IncomeTaxGraph";
import IncomeTaxAssumptions from "@/components/IncomeTaxAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OldVsNewTaxRegime() {
  // Personal Details
  const [taxpayerType, setTaxpayerType] = useState("salaried");
  const [ageGroup, setAgeGroup] = useState("below60");
  const [grossIncome, setGrossIncome] = useState(1200000);

  // Old Regime Deductions
  const [isOldExpanded, setIsOldExpanded] = useState(false);
  const [oldSection80C, setOldSection80C] = useState(0);
  const [oldSection80D, setOldSection80D] = useState(0);
  const [oldHRA, setOldHRA] = useState(0);
  const [oldHomeLoan, setOldHomeLoan] = useState(0);
  const [oldNPS, setOldNPS] = useState(0);
  const [oldOther, setOldOther] = useState(0);

  // New Regime Deductions
  const [newEmployerNPS, setNewEmployerNPS] = useState(0);
  const [newAgniveer, setNewAgniveer] = useState(false);

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, []);

  const performCalculations = () => {
    const inputs = {
      grossIncome,
      ageGroup,
      taxpayerType,
      oldSection80C,
      oldSection80D,
      oldHRA,
      oldHomeLoan,
      oldNPS,
      oldOther,
      newEmployerNPS,
      newAgniveer: newAgniveer ? 50000 : 0
    };
    
    const breakdown = calculateIncomeTaxBreakdown(inputs);
    setResult(breakdown);
  };

  const oldStandardDeduction = taxpayerType === "salaried" ? 50000 : 0;
  const newStandardDeduction = taxpayerType === "salaried" ? 75000 : 0;

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Old vs New Tax Regime"
          desc="Find out which tax regime saves you more money"
        />

        <div className="flex flex-col gap-2">
          {/* Personal Details Form */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Personal Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Taxpayer Type</label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setTaxpayerType("salaried")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxpayerType === "salaried" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Salaried</button>
                  <button 
                    onClick={() => setTaxpayerType("self-employed")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxpayerType === "self-employed" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Self-Employed</button>
                  <button 
                    onClick={() => setTaxpayerType("business")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxpayerType === "business" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Business</button>
                </div>
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Age Group</label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setAgeGroup("below60")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${ageGroup === "below60" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Below 60</button>
                  <button 
                    onClick={() => setAgeGroup("senior")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${ageGroup === "senior" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Senior (60-79)</button>
                  <button 
                    onClick={() => setAgeGroup("super")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${ageGroup === "super" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Super Senior (80+)</button>
                </div>
              </div>

              <SliderInput
                label="Gross Annual Income"
                value={grossIncome}
                onChange={(val) => setGrossIncome(val)}
                min={100000}
                max={50000000}
                step={25000}
                tooltip="Your total gross income from all sources before any deductions"
                showCurrency={true}
              />

            </div>
          </div>

          {/* New Regime Deductions */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. New Regime Deductions</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-2 opacity-70">
                <label className="text-sm font-medium text-[#1A237E] flex justify-between">
                  <span>Standard Deduction (Auto)</span>
                  <span>₹{oldStandardDeduction.toLocaleString('en-IN')}</span>
                </label>
                <p className="text-xs text-gray-400 mt-1">Automatically applied for Salaried employees</p>
              </div>

              <SliderInput
                label="Employer NPS (80CCD(2))"
                value={newEmployerNPS}
                onChange={(val) => setNewEmployerNPS(val)}
                min={0}
                max={200000}
                step={5000}
                tooltip="Employer's contribution to NPS - allowed in new regime (14% of basic for govt, 10% for others)"
                showCurrency={true}
              />
              
              <div className="mt-2">
                 <label className="flex items-center text-sm font-medium text-[#1A237E]">
                    <input type="checkbox" className="mr-3 accent-[#020288] w-4 h-4 rounded" checked={newAgniveer} onChange={(e) => setNewAgniveer(e.target.checked)} />
                    Agniveer Corpus Fund (Sec 80CCH)
                 </label>
                 {newAgniveer && <p className="text-xs text-gray-500 mt-1 ml-7">Flat ₹50,000 deduction allowed.</p>}
                 <p className="text-xs text-gray-400 mt-1 ml-7 italic">Only applicable to Agniveers enrolled on/after 01-Nov-2022</p>
              </div>

            </div>
          </div>

          {/* Old Regime Deductions */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsOldExpanded(!isOldExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">3. Old Regime Deductions</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isOldExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isOldExpanded && (
               <p className="text-xs text-gray-500 italic mt-2" onClick={() => setIsOldExpanded(true)}>
                  Tap to securely expand the detailed Old Regime deductions (80C, 80D, HRA, etc.)
               </p>
            )}

            {isOldExpanded && (
              <div className="flex flex-col gap-6 mt-4 ml-1">
                
                <div className="mb-2 opacity-70">
                  <label className="text-sm font-medium text-[#1A237E] flex justify-between">
                    <span>Standard Deduction (Auto)</span>
                    <span>₹{oldStandardDeduction.toLocaleString('en-IN')}</span>
                  </label>
                  <p className="text-xs text-gray-400 mt-1">Automatically applied for Salaried employees</p>
                </div>

                <SliderInput
                  label="Section 80C"
                  value={oldSection80C}
                  onChange={(val) => setOldSection80C(val)}
                  min={0}
                  max={150000}
                  step={5000}
                  tooltip="PPF, ELSS, LIC, EPF, tuition fees, home loan principal, NSC, SCSS, etc. (Max ₹1.5L)"
                  showCurrency={true}
                />

                <SliderInput
                  label="Health Insurance (Sec 80D)"
                  value={oldSection80D}
                  onChange={(val) => setOldSection80D(val)}
                  min={0}
                  max={100000}
                  step={5000}
                  tooltip="₹25k self+family; ₹50k if self is senior; additional ₹25k/₹50k for parents"
                  showCurrency={true}
                />
                 
                <SliderInput
                  label="HRA Exemption"
                  value={oldHRA}
                  onChange={(val) => setOldHRA(val)}
                  min={0}
                  max={500000}
                  step={5000}
                  tooltip="Min of: actual HRA, rent minus 10% basic, 50%/40% basic (metro/non). Enter 0 if not app."
                  showCurrency={true}
                />

                <SliderInput
                  label="Home Loan Interest (Sec 24b)"
                  value={oldHomeLoan}
                  onChange={(val) => setOldHomeLoan(val)}
                  min={0}
                  max={200000}
                  step={5000}
                  tooltip="Max ₹2L deduction for self-occupied property under old regime."
                  showCurrency={true}
                />

                <SliderInput
                  label="NPS - Sec 80CCD(1B)"
                  value={oldNPS}
                  onChange={(val) => setOldNPS(val)}
                  min={0}
                  max={500000} // Capped strictly at 50,000 for tax deductions
                  step={5000}
                  tooltip="Additional NPS contribution over and above 80C limit (Max ₹50,000)."
                  showCurrency={true}
                />

                <SliderInput
                  label="Other Deductions (80E, 80G, 80TTA)"
                  value={oldOther}
                  onChange={(val) => setOldOther(val)}
                  min={0}
                  max={200000}
                  step={5000}
                  tooltip="Education loan interest, donations, savings interest (₹10,000 cap), etc."
                  showCurrency={true}
                />

              </div>
            )}
          </div>
        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          CALCULATE TAX
        </button>

        <IncomeTaxResult result={result} />
        <IncomeTaxGraph result={result} />
        <IncomeTaxAssumptions />
        
      </div>
    </div>
  );
}
