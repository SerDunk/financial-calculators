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
// import { calculateWeddingBreakdown } from "@/utils/calculation";
// import WeddingResult from "@/components/WeddingResult";
// import WeddingAssumptions from "@/components/AssumptionsWedding";
// import WeddingGraph from "@/components/WeddingGraph";

const WeddingCalculator = () => {
  // States for inputs
  const [totalBudget, setTotalBudget] = useState(1500000); // ₹15,00,000
  const [guestCount, setGuestCount] = useState(200);
  const [venuePercent, setVenuePercent] = useState(40);
  const [cateringPercent, setCateringPercent] = useState(30);
  const [photographyPercent, setPhotographyPercent] = useState(8);
  const [decorationPercent, setDecorationPercent] = useState(10);
  const [attirePercent, setAttirePercent] = useState(7);
  const [miscellaneousPercent, setMiscellaneousPercent] = useState(5);

  // Derived amounts
  const [venueAmount, setVenueAmount] = useState(0);
  const [cateringAmount, setCateringAmount] = useState(0);
  const [photographyAmount, setPhotographyAmount] = useState(0);
  const [decorationAmount, setDecorationAmount] = useState(0);
  const [attireAmount, setAttireAmount] = useState(0);
  const [miscellaneousAmount, setMiscellaneousAmount] = useState(0);

  // Display strings
  const [totalBudgetInput, setTotalBudgetInput] = useState("15,00,000");
  const [guestCountInput, setGuestCountInput] = useState("200");
  const [venuePercentInput, setVenuePercentInput] = useState("40%");
  const [cateringPercentInput, setCateringPercentInput] = useState("30%");
  const [photographyPercentInput, setPhotographyPercentInput] = useState("8%");
  const [decorationPercentInput, setDecorationPercentInput] = useState("10%");
  const [attirePercentInput, setAttirePercentInput] = useState("7%");
  const [miscellaneousPercentInput, setMiscellaneousPercentInput] =
    useState("5%");

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
    const num = parseFloat(value.replace(/[₹,%\s]/g, ""));
    setter(isNaN(num) ? min : Math.min(Math.max(num, min), max));
  };

  // Calculate derived amounts and trigger calculation
  useEffect(() => {
    const venue = (totalBudget * venuePercent) / 100;
    const catering = (totalBudget * cateringPercent) / 100;
    const photography = (totalBudget * photographyPercent) / 100;
    const decoration = (totalBudget * decorationPercent) / 100;
    const attire = (totalBudget * attirePercent) / 100;
    const miscellaneous = (totalBudget * miscellaneousPercent) / 100;

    setVenueAmount(venue);
    setCateringAmount(catering);
    setPhotographyAmount(photography);
    setDecorationAmount(decoration);
    setAttireAmount(attire);
    setMiscellaneousAmount(miscellaneous);

    // Auto-calculate results when inputs change
    calculate();
  }, [
    totalBudget,
    venuePercent,
    cateringPercent,
    photographyPercent,
    decorationPercent,
    attirePercent,
    miscellaneousPercent,
    guestCount,
  ]);

  // Display updates
  useEffect(() => setVenuePercentInput(`${venuePercent}%`), [venuePercent]);
  useEffect(
    () => setCateringPercentInput(`${cateringPercent}%`),
    [cateringPercent]
  );
  useEffect(
    () => setPhotographyPercentInput(`${photographyPercent}%`),
    [photographyPercent]
  );
  useEffect(
    () => setDecorationPercentInput(`${decorationPercent}%`),
    [decorationPercent]
  );
  useEffect(() => setAttirePercentInput(`${attirePercent}%`), [attirePercent]);
  useEffect(
    () => setMiscellaneousPercentInput(`${miscellaneousPercent}%`),
    [miscellaneousPercent]
  );

  // Initial trigger
  useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    // const calculationResult = calculateWeddingBreakdown({
    //   totalBudget,
    //   guestCount,
    //   venuePercent,
    //   cateringPercent,
    //   photographyPercent,
    //   decorationPercent,
    //   attirePercent,
    //   miscellaneousPercent,
    // });
    // setResult(calculationResult);
  };

  // Ensure percentages add up to 100%
  const totalPercentage =
    venuePercent +
    cateringPercent +
    photographyPercent +
    decorationPercent +
    attirePercent +
    miscellaneousPercent;

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Wedding Budget Calculator"
          desc="Plan and allocate your wedding budget across different categories"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          {/* Total Budget */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Total Wedding Budget</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Total amount you plan to spend on the wedding
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={totalBudgetInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setTotalBudgetInput(raw ? formatIndianNumber(+raw) : "");
                    setTotalBudget(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setTotalBudgetInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(totalBudgetInput);
                    const cons = Math.min(Math.max(val, 500000), 50000000);
                    setTotalBudget(cons);
                    setTotalBudgetInput(formatIndianNumber(cons));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(totalBudget.toString())}
            </div>

            <Slider
              value={totalBudget}
              min={500000}
              max={20000000}
              step={100000}
              onChange={(e, val) => {
                setTotalBudget(val);
                setTotalBudgetInput(formatIndianNumber(val));
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

          {/* Guest Count */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Number of Guests</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Expected number of wedding guests
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={guestCountInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setGuestCountInput(raw);
                    setGuestCount(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setGuestCountInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(guestCountInput);
                    const cons = Math.min(Math.max(val, 50), 2000);
                    setGuestCount(cons);
                    setGuestCountInput(cons.toString());
                  }}
                />
              </div>
            </div>
            <Slider
              value={guestCount}
              min={50}
              max={1000}
              step={10}
              onChange={(e, val) => {
                setGuestCount(val);
                setGuestCountInput(val.toString());
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

          {/* Venue Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Venue (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Wedding venue booking and rental costs
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={venuePercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setVenuePercentInput(raw);
                    setVenuePercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setVenuePercentInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSet(setVenuePercent, venuePercentInput, 0, 80)
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(venueAmount.toString())}
            </div>
            <Slider
              value={venuePercent}
              min={0}
              max={80}
              step={1}
              onChange={(e, val) => {
                setVenuePercent(val);
                setVenuePercentInput(`${val}`);
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

          {/* Catering Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Catering (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Food and beverage expenses
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={cateringPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setCateringPercentInput(raw);
                    setCateringPercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setCateringPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(setCateringPercent, cateringPercentInput, 0, 60)
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(cateringAmount.toString())}
            </div>
            <Slider
              value={cateringPercent}
              min={0}
              max={60}
              step={1}
              onChange={(e, val) => {
                setCateringPercent(val);
                setCateringPercentInput(`${val}`);
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

          {/* Photography Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Photography (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Photography and videography services
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={photographyPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setPhotographyPercentInput(raw);
                    setPhotographyPercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setPhotographyPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(
                      setPhotographyPercent,
                      photographyPercentInput,
                      0,
                      20
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(photographyAmount.toString())}
            </div>
            <Slider
              value={photographyPercent}
              min={0}
              max={20}
              step={0.5}
              onChange={(e, val) => {
                setPhotographyPercent(val);
                setPhotographyPercentInput(`${val}`);
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

          {/* Decoration Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Decoration (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Flowers, lighting, and decoration costs
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={decorationPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setDecorationPercentInput(raw);
                    setDecorationPercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setDecorationPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(
                      setDecorationPercent,
                      decorationPercentInput,
                      0,
                      25
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(decorationAmount.toString())}
            </div>
            <Slider
              value={decorationPercent}
              min={0}
              max={25}
              step={0.5}
              onChange={(e, val) => {
                setDecorationPercent(val);
                setDecorationPercentInput(`${val}`);
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

          {/* Attire Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Attire & Jewelry (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Wedding outfits and jewelry expenses
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={attirePercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setAttirePercentInput(raw);
                    setAttirePercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setAttirePercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(setAttirePercent, attirePercentInput, 0, 20)
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(attireAmount.toString())}
            </div>
            <Slider
              value={attirePercent}
              min={0}
              max={20}
              step={0.5}
              onChange={(e, val) => {
                setAttirePercent(val);
                setAttirePercentInput(`${val}`);
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

          {/* Miscellaneous Allocation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Miscellaneous (%)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Music, transport, gifts, and other expenses
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0"
                  value={miscellaneousPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setMiscellaneousPercentInput(raw);
                    setMiscellaneousPercent(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setMiscellaneousPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSet(
                      setMiscellaneousPercent,
                      miscellaneousPercentInput,
                      0,
                      20
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              ₹{formatShortIndianCurrency(miscellaneousAmount.toString())}
            </div>
            <Slider
              value={miscellaneousPercent}
              min={0}
              max={20}
              step={0.5}
              onChange={(e, val) => {
                setMiscellaneousPercent(val);
                setMiscellaneousPercentInput(`${val}`);
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

          {/* Budget Allocation Summary */}
          <div className="mt-4 p-3 bg-[#F8F7FF] rounded-lg">
            <div className="text-xs text-[#323233] font-medium mb-2">
              Budget Allocation Summary
            </div>
            <div className="text-[10px] text-[#666666] space-y-1">
              <div className="flex justify-between">
                <span>Venue:</span>
                <span>
                  ₹{formatShortIndianCurrency(venueAmount.toString())} (
                  {venuePercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Catering:</span>
                <span>
                  ₹{formatShortIndianCurrency(cateringAmount.toString())} (
                  {cateringPercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Photography:</span>
                <span>
                  ₹{formatShortIndianCurrency(photographyAmount.toString())} (
                  {photographyPercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Decoration:</span>
                <span>
                  ₹{formatShortIndianCurrency(decorationAmount.toString())} (
                  {decorationPercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Attire & Jewelry:</span>
                <span>
                  ₹{formatShortIndianCurrency(attireAmount.toString())} (
                  {attirePercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Miscellaneous:</span>
                <span>
                  ₹{formatShortIndianCurrency(miscellaneousAmount.toString())} (
                  {miscellaneousPercent}%)
                </span>
              </div>
              <div className="flex justify-between border-t pt-1 mt-2 font-medium text-[#323233]">
                <span>Total:</span>
                <span
                  className={
                    totalPercentage === 100 ? "text-green-600" : "text-red-600"
                  }
                >
                  {totalPercentage}%
                </span>
              </div>
            </div>
            {totalPercentage !== 100 && (
              <div className="text-[10px] text-red-600 mt-2">
                Note: Percentages should add up to 100%
              </div>
            )}
          </div>

          {/* Cost per Guest */}
          <div className="mt-4 p-3 bg-[#F0F8FF] rounded-lg">
            <div className="text-xs text-[#323233] font-medium mb-2">
              Cost Analysis
            </div>
            <div className="text-[10px] text-[#666666] space-y-1">
              <div className="flex justify-between">
                <span>Cost per Guest:</span>
                <span>
                  ₹{formatIndianNumber(Math.round(totalBudget / guestCount))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Catering per Guest:</span>
                <span>
                  ₹{formatIndianNumber(Math.round(cateringAmount / guestCount))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* <WeddingResult result={result} />
        <WeddingAssumptions /> */}
      </div>
    </div>
  );
};

export default WeddingCalculator;
