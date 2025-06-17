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
import { calculateCarPurchaseBreakdown } from "@/utils/calculation";
import CarPurchaseResult from "@/components/CarPurchaseResult";
// import CarPurchaseAssumptions from "@/components/AssumptionsCar";
// import CarPurchaseGraph from "@/components/CarPurchaseGraph";

const CarPurchaseCalculator = () => {
  // States for inputs
  const [vehiclePrice, setVehiclePrice] = useState(1000000); // ₹10,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTerm, setLoanTerm] = useState(5);
  const [cashIncentive, setCashIncentive] = useState(0);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [salesTaxPercent, setSalesTaxPercent] = useState(18);
  const [otherFees, setOtherFees] = useState(50000);

  // Derived amounts
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);

  // Display strings
  const [vehiclePriceInput, setVehiclePriceInput] = useState("10,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("9%");
  const [loanTermInput, setLoanTermInput] = useState("5 yrs");
  const [cashIncentiveInput, setCashIncentiveInput] = useState("0");
  const [tradeInValueInput, setTradeInValueInput] = useState("0");
  const [salesTaxPercentInput, setSalesTaxPercentInput] = useState("18%");
  const [otherFeesInput, setOtherFeesInput] = useState("50,000");

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
    const dpAmt = (vehiclePrice * downPaymentPercent) / 100;
    const loanAmt = vehiclePrice - dpAmt - cashIncentive - tradeInValue;
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
    () => setSalesTaxPercentInput(`${salesTaxPercent}%`),
    [salesTaxPercent]
  );

  // Initial trigger
  useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    const calculationResult = calculateCarPurchaseBreakdown({
      vehiclePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      cashIncentive,
      tradeInValue,
      salesTaxPercent,
      otherFees,
    });

    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Car Purchase Calculator"
          desc="Understand your financing details for buying a car"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          {/* Vehicle Price */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Vehicle Price</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Ex-showroom price of the vehicle
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={vehiclePriceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setVehiclePriceInput(raw ? formatIndianNumber(+raw) : "");
                    setVehiclePrice(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setVehiclePriceInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(vehiclePriceInput);
                    const cons = Math.min(Math.max(val, 100000), 50000000);
                    setVehiclePrice(cons);
                    setVehiclePriceInput(formatIndianNumber(cons));
                  }}
                />
              </div>
            </div>
            <Slider
              value={vehiclePrice}
              min={100000}
              max={50000000}
              step={50000}
              onChange={(e, val) => {
                setVehiclePrice(val);
                setVehiclePriceInput(formatIndianNumber(val));
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
                    Percentage paid upfront
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
                      0,
                      100
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={downPaymentPercent}
              min={0}
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
                    Annual loan interest rate
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
                    parseAndSet(setInterestRate, interestRateInput, 0, 20)
                  }
                />
              </div>
            </div>
            <Slider
              value={interestRate}
              min={0}
              max={20}
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
                    Duration of car loan
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
                  onBlur={() => parseAndSet(setLoanTerm, loanTermInput, 1, 10)}
                />
              </div>
            </div>
            <Slider
              value={loanTerm}
              min={1}
              max={10}
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

          {/* Cash Incentive */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Cash Incentive</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Discount or dealer incentive on the car
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={cashIncentiveInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setCashIncentiveInput(raw);
                    setCashIncentive(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(cashIncentiveInput);
                    setCashIncentive(v);
                    setCashIncentiveInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <Slider
              value={cashIncentive}
              min={0}
              max={500000}
              step={1000}
              onChange={(e, val) => {
                setCashIncentive(val);
                setCashIncentiveInput(`${val}`);
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

          {/* Trade‑in Value */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Trade‑in Value</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Value of old car you exchange
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={tradeInValueInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setTradeInValueInput(raw);
                    setTradeInValue(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(tradeInValueInput);
                    setTradeInValue(v);
                    setTradeInValueInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <Slider
              value={tradeInValue}
              min={0}
              max={3000000}
              step={1000}
              onChange={(e, val) => {
                setTradeInValue(val);
                setTradeInValueInput(`${val}`);
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

          {/* Sales Tax % */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Sales Tax %</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    GST on the car
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={salesTaxPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setSalesTaxPercentInput(raw);
                    setSalesTaxPercent(raw ? +raw : 0);
                  }}
                  onBlur={() =>
                    parseAndSet(setSalesTaxPercent, salesTaxPercentInput, 0, 50)
                  }
                />
              </div>
            </div>
            <Slider
              value={salesTaxPercent}
              min={0}
              max={50}
              step={1}
              onChange={(e, val) => {
                setSalesTaxPercent(val);
                setSalesTaxPercentInput(`${val}`);
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

          {/* Other Fees */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Other Fees</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Registration, insurance, etc.
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={otherFeesInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setOtherFeesInput(raw);
                    setOtherFees(raw ? +raw : 0);
                  }}
                  onBlur={() => {
                    const v = parseFormattedNumber(otherFeesInput);
                    setOtherFees(v);
                    setOtherFeesInput(formatIndianNumber(v));
                  }}
                />
              </div>
            </div>
            <Slider
              value={otherFees}
              min={0}
              max={200000}
              step={1000}
              onChange={(e, val) => {
                setOtherFees(val);
                setOtherFeesInput(`${val}`);
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

          {/* <CarPurchaseGraph result={result} />
          <CarPurchaseAssumptions /> */}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        <CarPurchaseResult result={result} />
      </div>
    </div>
  );
};

export default CarPurchaseCalculator;
