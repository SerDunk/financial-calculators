export default function Assumptions() {
  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        Assumptions & Formula
      </div>
      <div className="bg-white p-4 text-xs text-[#686868] space-y-2 rounded-lg">
        <div className="flex justify-between">
          <span>Home Price</span>
          <span className="text-[#2C178C]">₹ 80,00,000</span>
        </div>
        <div className="flex justify-between">
          <span>Down Payment</span>
          <span className="text-[#2C178C]">20%</span>
        </div>
        <div className="flex justify-between">
          <span>Loan Amount</span>
          <span className="text-[#2C178C]">₹ 64,00,000</span>
        </div>
        <div className="flex justify-between">
          <span>Interest Rate</span>
          <span className="text-[#2C178C]">8.5%</span>
        </div>
        <div className="flex justify-between">
          <span>Loan Tenure</span>
          <span className="text-[#2C178C]">20 yrs</span>
        </div>
        <div className="flex justify-between">
          <span>Property Taxes (Annual)</span>
          <span className="text-[#2C178C]">₹ 8,000</span>
        </div>
        <div className="flex justify-between">
          <span>Home Insurance (Annual)</span>
          <span className="text-[#2C178C]">₹ 3,000</span>
        </div>
        <div className="flex justify-between">
          <span>Other Costs (Monthly)</span>
          <span className="text-[#2C178C]">₹ 4000</span>
        </div>
        <div className="rounded-xl px-4 py-2 bg-[#F5F4F7] mt-3 flex justify-between items-center">
          <span className="text-sm text-[#323233]">Final Amount</span>
          <span
            className="font-semibold text-sm"
            style={{
              background: "linear-gradient(to right,#320992 30%,#F04393)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹ 1,45,09,765
          </span>
        </div>
        <div className="mt-4 p-3 bg-[#F5F4F7] rounded-xl text-xs text-[#323233]">
          Formula Used:{" "}
          <span className="text-[#F04393] font-medium">
            EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> – 1]
          </span>
          , where P is principal, r is monthly interest rate, and n is number of
          months.
        </div>
      </div>
    </div>
  );
}
