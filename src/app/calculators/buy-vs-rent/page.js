"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { tipData, headingData } from "@/constants/displayData";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { calculateBuyVsRent } from "@/utils/calculation";
import { formatShortIndianCurrency } from "@/utils/formatting";
import Heading from "@/components/Heading";

const BuyVsRentCalculator = () => {
  // State for all calculator inputs
  const [homePrice, setHomePrice] = useState(8000000); // ₹80,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [loanTerm, setLoanTerm] = useState(20); // 20 years
  const [monthlyRent, setMonthlyRent] = useState(25000); // ₹25,000
  const [rentIncreasePercent, setRentIncreasePercent] = useState(5); // 5% annually
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(12); // 12% annually
  const [comparisonPeriod, setComparisonPeriod] = useState(10); // 10 years

  // Calculated values
  const [loanAmount, setLoanAmount] = useState(6400000); // 80% of 80L
  const [downPaymentAmount, setDownPaymentAmount] = useState(1600000);

  // Input display states
  const [homePriceInput, setHomePriceInput] = useState("80,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [loanTermInput, setLoanTermInput] = useState("20 yrs");
  const [monthlyRentInput, setMonthlyRentInput] = useState("25,000");
  const [rentIncreasePercentInput, setRentIncreasePercentInput] =
    useState("5%");
  const [investmentReturnPercentInput, setInvestmentReturnPercentInput] =
    useState("12%");
  const [comparisonPeriodInput, setComparisonPeriodInput] = useState("10 yrs");
  const [maintenancePercentInput, setMaintenancePercentInput] = useState("1%");
  const [propertyTaxPercentInput, setPropertyTaxPercentInput] =
    useState("0.1%");

  // Results - these will only update when Calculate is pressed
  const [result, setResult] = useState(null);

  // Initialize with default calculation on component mount
  useEffect(() => {
    // Calculate initial values with defaults
    const initialLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const initialDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(initialLoanAmount);
    setDownPaymentAmount(initialDownPayment);

    performCalculations();
  }, []); // Empty dependency array - only run once on mount

  // Update loan amount and down payment when home price or down payment percent changes
  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const calculatedDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
    setDownPaymentAmount(calculatedDownPayment);
  }, [homePrice, downPaymentPercent]);

  // Update input display when values change
  useEffect(() => {
    setLoanTermInput(`${loanTerm} yrs`);
  }, [loanTerm]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  useEffect(() => {
    setDownPaymentPercentInput(`${downPaymentPercent}%`);
  }, [downPaymentPercent]);

  useEffect(() => {
    setRentIncreasePercentInput(`${rentIncreasePercent}%`);
  }, [rentIncreasePercent]);

  useEffect(() => {
    setInvestmentReturnPercentInput(`${investmentReturnPercent}%`);
  }, [investmentReturnPercent]);

  useEffect(() => {
    setComparisonPeriodInput(`${comparisonPeriod} yrs`);
  }, [comparisonPeriod]);

  // Format number with Indian comma separation
  const formatIndianNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  // Parse formatted number back to numeric value
  const parseFormattedNumber = (str) => {
    return parseInt(str.replace(/[^\d]/g, "")) || 0;
  };

  const parseAndSetNumericValue = (setter, value, min, max) => {
    const numericValue = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    if (!isNaN(numericValue)) {
      const constrainedValue = Math.min(Math.max(numericValue, min), max);
      setter(constrainedValue);
    } else {
      setter(min);
    }
  };

  // Separate function to perform calculations
  const performCalculations = () => {
    const calculationResult = calculateBuyVsRent({
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      homeAppreciation: 7, // Assuming 7% appreciation
      sellingCostPercent: 2, // Assuming 2% selling cost
      monthlyRent,
      rentIncreasePercent,
      investmentReturnPercent,
      comparisonPeriod,
    });

    setResult(calculationResult);
  };

  // Handle Calculate button click
  const handleCalculate = () => {
    performCalculations();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Buy vs Rent Calculator"
          desc="Compare the financial impact of buying vs renting to make an informed decision"
        />
        <div
          className="rounded-2xl p-6 relative"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Home Price */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <div className="flex items-center gap-1.5">
                <p>Home Price</p>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    The total price of the home you're considering to buy
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={homePriceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setHomePriceInput(formatted);
                    setHomePrice(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomePriceInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(homePriceInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 500000),
                      50000000
                    );
                    setHomePrice(constrainedValue);
                    setHomePriceInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homePrice.toString())}
            </div>

            <Slider
              value={homePrice}
              min={500000}
              max={50000000}
              step={25000}
              onChange={(e, val) => {
                setHomePrice(val);
                setHomePriceInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#fff",
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
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Down Payment</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Percentage of home price you'll pay upfront
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={downPaymentPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setDownPaymentPercentInput(raw);
                    setDownPaymentPercent(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setDownPaymentPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setDownPaymentPercent,
                      downPaymentPercentInput,
                      5,
                      50
                    )
                  }
                />
              </div>
            </div>

            {/* Down Payment and Loan Amount Display */}
            <div className="flex justify-between items-center text-[10px] pt-2 px-2 mb-2">
              <div className="flex flex-col gap-2">
                <span className="text-white">Down Payment</span>
                <span className="font-medium bg-white text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(downPaymentAmount.toString())}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white">Loan Amount</span>
                <span className="font-medium bg-white text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(loanAmount.toString())}
                </span>
              </div>
            </div>

            <Slider
              value={downPaymentPercent}
              min={5}
              max={50}
              step={0.5}
              onChange={(e, val) => {
                setDownPaymentPercent(val);
                setDownPaymentPercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Housing Loan Interest</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Annual interest rate on your home loan
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={interestRateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInterestRateInput(raw);
                    setInterestRate(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setInterestRateInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setInterestRate,
                      interestRateInput,
                      1,
                      20
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={interestRate}
              min={1}
              max={20}
              step={0.05}
              onChange={(e, val) => {
                setInterestRate(val);
                setInterestRateInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Loan Tenure */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Loan Tenure</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Duration of your home loan in years
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={loanTermInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setLoanTermInput(raw);
                    setLoanTerm(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setLoanTermInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(setLoanTerm, loanTermInput, 1, 30)
                  }
                />
              </div>
            </div>
            <Slider
              value={loanTerm}
              min={1}
              max={30}
              step={0.5}
              onChange={(e, val) => {
                setLoanTerm(val);
                setLoanTermInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Monthly Rent */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Monthly Rent</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Current monthly rent for a similar property
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={monthlyRentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setMonthlyRentInput(formatted);
                    setMonthlyRent(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMonthlyRentInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(monthlyRentInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 1000),
                      200000
                    );
                    setMonthlyRent(constrainedValue);
                    setMonthlyRentInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(monthlyRent.toString())}
            </div>

            <Slider
              value={monthlyRent}
              min={1000}
              max={200000}
              step={1000}
              onChange={(e, val) => {
                setMonthlyRent(val);
                setMonthlyRentInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#fff",
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

          {/* Rent Increase % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Annual Rent Increase</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Expected annual percentage increase in rent
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={rentIncreasePercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setRentIncreasePercentInput(raw);
                    setRentIncreasePercent(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setRentIncreasePercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setRentIncreasePercent,
                      rentIncreasePercentInput,
                      0,
                      15
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={rentIncreasePercent}
              min={0}
              max={15}
              step={0.1}
              onChange={(e, val) => {
                setRentIncreasePercent(val);
                setRentIncreasePercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Investment Return % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Investment Return</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Expected annual return on investing your down payment
                    savings
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={investmentReturnPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInvestmentReturnPercentInput(raw);
                    setInvestmentReturnPercent(
                      raw === "" ? 0 : parseFloat(raw)
                    );
                  }}
                  onFocus={(e) =>
                    setInvestmentReturnPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setInvestmentReturnPercent,
                      investmentReturnPercentInput,
                      1,
                      25
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={investmentReturnPercent}
              min={1}
              max={25}
              step={0.1}
              onChange={(e, val) => {
                setInvestmentReturnPercent(val);
                setInvestmentReturnPercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Comparison Period */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Comparison Period</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Number of years to compare buying vs renting
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={comparisonPeriodInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setComparisonPeriodInput(raw);
                    setComparisonPeriod(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setComparisonPeriodInput(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setComparisonPeriod,
                      comparisonPeriodInput,
                      1,
                      50
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={comparisonPeriod}
              min={1}
              max={50}
              step={1}
              onChange={(e, val) => {
                setComparisonPeriod(val);
                setComparisonPeriodInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;
