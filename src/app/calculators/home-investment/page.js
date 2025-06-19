"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import Heading from "@/components/Heading";
import { calculateHomeInvestmentBreakdown } from "@/utils/calculation";
import HomeInvestmentResult from "@/components/HomeInvestmentResult";
import HomeInvestmentAssumptions from "@/components/HomeInvestmentAssumptions";
// import HomeInvestmentGraph from "@/components/HomeInvestmentGraph";

const HomeInvestmentCalculator = () => {
  // States for inputs
  const [propertyPrice, setPropertyPrice] = useState(5000000); // ₹50,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [annualMaintenance, setAnnualMaintenance] = useState(50000);
  const [propertyAppreciationRate, setPropertyAppreciationRate] = useState(6);
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(25000);
  const [registrationFees, setRegistrationFees] = useState(300000);

  // Derived amounts
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);

  // Display strings
  const [propertyPriceInput, setPropertyPriceInput] = useState("50,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [loanTermInput, setLoanTermInput] = useState("20 yrs");
  const [annualMaintenanceInput, setAnnualMaintenanceInput] =
    useState("50,000");
  const [propertyAppreciationRateInput, setPropertyAppreciationRateInput] =
    useState("6%");
  const [monthlyRentalIncomeInput, setMonthlyRentalIncomeInput] =
    useState("25,000");
  const [registrationFeesInput, setRegistrationFeesInput] =
    useState("3,00,000");

  // Results
  const [result, setResult] = useState(null);

  // Formatters
  const formatIndianNumber = (num) => num.toLocaleString("en-IN");
  const formatShortIndianCurrency = (amt) => {
    const num = parseInt(amt);
    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };
  const parseFormattedNumber = (str) =>
    parseInt(str.replace(/[^\d]/g, "")) || 0;
  const parseAndSet = (setter, value, min, max) => {
    const num = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    setter(isNaN(num) ? min : Math.min(Math.max(num, min), max));
  };

  // Calculate derived loan/down-payment and trigger calculation
  useEffect(() => {
    const dpAmt = (propertyPrice * downPaymentPercent) / 100;
    const loanAmt = propertyPrice - dpAmt;
    setDownPaymentAmount(dpAmt);
    setLoanAmount(loanAmt);

    // Auto-calculate results when inputs change
    calculate();
  }, []);

  // Display updates
  useEffect(() => setLoanTermInput(`${loanTerm} yrs`), [loanTerm]);
  useEffect(() => setInterestRateInput(`${interestRate}%`), [interestRate]);
  useEffect(
    () => setDownPaymentPercentInput(`${downPaymentPercent}%`),
    [downPaymentPercent]
  );
  useEffect(
    () => setPropertyAppreciationRateInput(`${propertyAppreciationRate}%`),
    [propertyAppreciationRate]
  );

  // Initial trigger
  useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    const calculationResult = calculateHomeInvestmentBreakdown({
      propertyPrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      annualMaintenance,
      propertyAppreciationRate,
      monthlyRentalIncome,
      registrationFees,
    });

    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Home Investment Calculator"
          desc="Analyze your property investment returns and financing details"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          {/* Property Purchase Price */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Property Price</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Total purchase price of the property
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={propertyPriceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setPropertyPriceInput(raw ? formatIndianNumber(+raw) : "");
                    setPropertyPrice(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setPropertyPriceInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(propertyPriceInput);
                    const cons = Math.min(Math.max(val, 500000), 100000000);
                    setPropertyPrice(cons);
                    setPropertyPriceInput(formatIndianNumber(cons));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(propertyPrice.toString())}
            </div>
            <Slider
              value={propertyPrice}
              min={500000}
              max={100000000}
              step={100000}
              onChange={(e, val) => {
                setPropertyPrice(val);
                setPropertyPriceInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Down Payment % */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Down Payment %</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Percentage paid upfront for the property
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={downPaymentPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setDownPaymentPercentInput(raw);
                    setDownPaymentPercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setDownPaymentPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(
                      setDownPaymentPercent,
                      downPaymentPercentInput,
                      10,
                      100
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={downPaymentPercent}
              min={10}
              max={100}
              step={1}
              onChange={(e, val) => {
                setDownPaymentPercent(val);
                setDownPaymentPercentInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Loan Interest (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Annual home loan interest rate
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={interestRateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInterestRateInput(raw);
                    setInterestRate(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setInterestRateInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSet(setInterestRate, interestRateInput, 6, 18)
                  }
                />
              </div>
            </div>
            <Slider
              value={interestRate}
              min={6}
              max={18}
              step={0.1}
              onChange={(e, val) => {
                setInterestRate(val);
                setInterestRateInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Loan Term */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Loan Term (yrs)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Duration of home loan in years
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-20 text-center border-none outline-none focus:ring-0"
                  value={loanTermInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setLoanTermInput(raw);
                    setLoanTerm(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setLoanTermInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => parseAndSet(setLoanTerm, loanTermInput, 5, 30)}
                />
              </div>
            </div>
            <Slider
              value={loanTerm}
              min={5}
              max={30}
              step={1}
              onChange={(e, val) => {
                setLoanTerm(val);
                setLoanTermInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Annual Maintenance */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Annual Maintenance</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Yearly maintenance, repairs, and upkeep costs
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={annualMaintenanceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setAnnualMaintenanceInput(raw);
                    setAnnualMaintenance(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(annualMaintenanceInput);
                    setAnnualMaintenance(v);
                    setAnnualMaintenanceInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(annualMaintenance.toString())}
            </div>
            <Slider
              value={annualMaintenance}
              min={0}
              max={500000}
              step={5000}
              onChange={(e, val) => {
                setAnnualMaintenance(val);
                setAnnualMaintenanceInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Property Appreciation Rate */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label className="w-30">Property Appreciation (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Expected annual property value growth rate
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={propertyAppreciationRateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setPropertyAppreciationRateInput(raw);
                    setPropertyAppreciationRate(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setPropertyAppreciationRateInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(
                      setPropertyAppreciationRate,
                      propertyAppreciationRateInput,
                      0,
                      15
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={propertyAppreciationRate}
              min={0}
              max={15}
              step={0.1}
              onChange={(e, val) => {
                setPropertyAppreciationRate(val);
                setPropertyAppreciationRateInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Monthly Rental Income */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center">
                <label className="w-30">Monthly Rental Income</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Expected monthly rental income if renting out
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={monthlyRentalIncomeInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMonthlyRentalIncomeInput(raw);
                    setMonthlyRentalIncome(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(monthlyRentalIncomeInput);
                    setMonthlyRentalIncome(v);
                    setMonthlyRentalIncomeInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(monthlyRentalIncome.toString())}
            </div>
            <Slider
              value={monthlyRentalIncome}
              min={0}
              max={200000}
              step={1000}
              onChange={(e, val) => {
                setMonthlyRentalIncome(val);
                setMonthlyRentalIncomeInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Registration & Other Fees */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Registration & Fees</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Registration, stamp duty, legal fees, etc.
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={registrationFeesInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setRegistrationFeesInput(raw);
                    setRegistrationFees(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(registrationFeesInput);
                    setRegistrationFees(v);
                    setRegistrationFeesInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(registrationFees.toString())}
            </div>
            <Slider
              value={registrationFees}
              min={0}
              max={1000000}
              step={10000}
              onChange={(e, val) => {
                setRegistrationFees(val);
                setRegistrationFeesInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* <HomeInvestmentGraph result={result} /> */}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        <HomeInvestmentResult result={result} />
        <HomeInvestmentAssumptions />
      </div>
    </div>
  );
};

export default HomeInvestmentCalculator;
