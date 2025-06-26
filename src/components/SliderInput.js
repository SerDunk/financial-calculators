import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const SliderInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 5000,
  tooltip,
  sliderColor = "#020288",
  showCurrency = true,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Format Indian number with commas
  const formatIndianNumber = (num) => {
    if (num == null || isNaN(num)) return "0";
    return Number(num).toLocaleString("en-IN");
  };

  // Format currency in short form (K, L, Cr)
  const formatShortIndianCurrency = (amt) => {
    if (amt == null) return "0";
    const num = parseInt(amt);
    if (isNaN(num)) return "0";
    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };

  // Parse formatted number string to get raw number
  const parseFormattedNumber = (str) => {
    if (!str) return 0;
    const parsed = parseInt(str.replace(/[^\d]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  // Initialize input value when component mounts or value changes externally
  useEffect(() => {
    if (showCurrency) {
      setInputValue(formatIndianNumber(value));
    } else {
      setInputValue(value.toString());
    }
  }, [value, showCurrency]);

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
    if (showCurrency) {
      setInputValue(formatIndianNumber(newValue));
    } else {
      setInputValue(newValue.toString());
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (showCurrency) {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      setInputValue(raw ? formatIndianNumber(+raw) : "");
      onChange(raw ? +raw : 0);
    } else {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      setInputValue(raw);
      onChange(raw ? +raw : 0);
    }
  };

  // Handle input focus
  const handleInputFocus = (e) => {
    if (showCurrency) {
      setInputValue(e.target.value.replace(/[^0-9]/g, ""));
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    if (showCurrency) {
      const val = parseFormattedNumber(inputValue);
      const constrainedValue = Math.min(Math.max(val, min), max);
      onChange(constrainedValue);
      setInputValue(formatIndianNumber(constrainedValue));
    } else {
      const val = parseInt(inputValue) || 0;
      const constrainedValue = Math.min(Math.max(val, min), max);
      onChange(constrainedValue);
      setInputValue(constrainedValue.toString());
    }
  };

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
        <div className="flex items-center gap-1.5">
          <label>{label}</label>
          {tooltip && (
            <Popover>
              <PopoverTrigger>
                <Info width={15} />
              </PopoverTrigger>
              <PopoverContent className="text-xs border-[#666666] max-w-xs">
                {tooltip}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
          {showCurrency && <span className="text-[#020288] text-xs">₹</span>}
          <input
            type="text"
            className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0 bg-transparent"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </div>

      {/* Show shorthand amount below the input */}
      {showCurrency && (
        <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
          {formatShortIndianCurrency(value.toString())}
        </div>
      )}

      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        sx={{
          color: sliderColor,
          height: 6,
          "& .MuiSlider-thumb": {
            backgroundImage: "url('/slider.svg')",
            backgroundPosition: "center",
            width: 18,
            height: 18,
            transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
  );
};

export default SliderInput;
