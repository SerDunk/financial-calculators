"use client";
import { Shield, AlertTriangle, TrendingUp, Star } from "lucide-react";

const fmt = (val) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val || 0);

const fmtL = (val) => {
  if (!val) return "₹0";
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(1)}Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(1)}L`;
  return `₹${fmt(val)}`;
};

// ──────────────────────────────────────────────
// Semicircular Gauge
// ──────────────────────────────────────────────
function AdequacyGauge({ score, scoreLabel, scoreColor }) {
  // Arc from 180° → 0° (left to right), radius = 80
  const R = 80;
  const cx = 100;
  const cy = 95;
  // Full arc stroke
  const angle = Math.PI * (1 - score / 100); // maps 0%→π, 100%→0
  const x = cx + R * Math.cos(angle);
  const y = cy - R * Math.sin(angle);
  const largeArc = score > 50 ? 1 : 0;

  const trackPath = `M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`;
  const filledPath =
    score === 0
      ? ""
      : `M ${cx - R} ${cy} A ${R} ${R} 0 ${largeArc} 1 ${x} ${y}`;

  return (
    <div className="flex flex-col items-center pt-2 pb-0">
      <svg width="200" height="105" viewBox="0 0 200 105">
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        {score > 0 && (
          <path
            d={filledPath}
            fill="none"
            stroke={scoreColor}
            strokeWidth="16"
            strokeLinecap="round"
          />
        )}
        {/* Score text */}
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fontSize="26"
          fontWeight="bold"
          fill={scoreColor}
          fontFamily="Lexend, sans-serif"
        >
          {score}%
        </text>
        {/* Label text */}
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize="10"
          fill="#6B7280"
          fontFamily="Lexend, sans-serif"
        >
          {scoreLabel}
        </text>
        {/* 0% label */}
        <text x={cx - R - 4} y={cy + 18} textAnchor="middle" fontSize="9" fill="#9CA3AF">
          0%
        </text>
        {/* 100% label */}
        <text x={cx + R + 4} y={cy + 18} textAnchor="middle" fontSize="9" fill="#9CA3AF">
          100%
        </text>
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────
// Row component for result cards
// ──────────────────────────────────────────────
function Row({ label, value, valueClass = "text-gray-800", bold = false }) {
  return (
    <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className={`font-semibold ${valueClass} ${bold ? "text-sm" : ""}`}>
        {value}
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function HealthInsuranceResult({ result }) {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Shield className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Calculation…
          </h3>
          <p className="text-sm">
            Your Health Insurance Adequacy report will appear here.
          </p>
        </div>
      </div>
    );
  }

  const {
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
    section80D,
    coverPVIn5Yrs,
    showCriticalIllnessFlag,
    showRetirementNote,
    taxRegime,
    eldestAge,
  } = result;

  const gapColor =
    gapStatus === "adequate"
      ? "text-green-600"
      : gapStatus === "minor"
      ? "text-orange-500"
      : "text-red-600";

  const gapBg =
    gapStatus === "adequate"
      ? "bg-green-50 border-green-200"
      : gapStatus === "minor"
      ? "bg-orange-50 border-orange-200"
      : "bg-red-50 border-red-200";

  return (
    <div className="sm:mt-2 mt-4 flex flex-col gap-4">

      {/* ── Card 1: Adequacy Score Gauge ── */}
      <div className="bg-white rounded-2xl px-5 pt-5 pb-4 shadow-lg">
        <div className="text-center mb-2">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 shadow"
            style={{
              background: `linear-gradient(135deg, ${scoreColor}33, ${scoreColor}88)`,
            }}
          >
            <Shield size={22} style={{ color: scoreColor }} />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            Your Adequacy Score
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Based on your profile, city, and risk factors
          </p>
        </div>

        <AdequacyGauge
          score={adequacyScore}
          scoreLabel={scoreLabel}
          scoreColor={scoreColor}
        />

        {/* Status pill */}
        <div
          className={`mt-3 mx-auto max-w-xs rounded-xl px-4 py-2 border text-center text-xs font-medium ${gapBg} ${gapColor}`}
        >
          {gapStatus === "adequate" && "✅ Your cover is adequate for your current profile."}
          {gapStatus === "minor" && "⚠️ Minor gap — consider upgrading your cover."}
          {gapStatus === "significant" && "🚨 Significant gap — action required urgently."}
        </div>

        {/* Employer warning */}
        {employerCover > 0 && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
              <span>
                Your employer's <strong>{fmtL(employerCover)}</strong> group cover is{" "}
                <strong>NOT counted</strong> in your adequacy score. It cannot be ported
                if you resign, are laid off, or retire. Build personal cover independent
                of your employer.
              </span>
            </div>
          </div>
        )}

        {/* Inflation Reality */}
        {coverPVIn5Yrs > 0 && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
            <div className="flex items-start gap-2">
              <TrendingUp size={14} className="mt-0.5 shrink-0 text-blue-500" />
              <span>
                At 14% medical inflation, your{" "}
                <strong>{fmtL(effectivePersonalCover)}</strong> cover today will be
                worth only <strong>~{fmtL(coverPVIn5Yrs)}</strong> in real terms in 5
                years. The ideal cover of <strong>{fmtL(idealCover)}</strong> accounts
                for this.
              </span>
            </div>
          </div>
        )}

        {/* Critical Illness Flag */}
        {showCriticalIllnessFlag && (
          <div className="mt-3 bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-800">
            <div className="flex items-start gap-2">
              <Star size={14} className="mt-0.5 shrink-0 text-purple-500" />
              <span>
                Consider a separate <strong>Critical Illness rider</strong> or standalone
                CI plan — standard hospitalisation covers may have sublimits that don't
                fully cover cancer/cardiac/organ transplant costs of ₹20–₹50 lakh.
              </span>
            </div>
          </div>
        )}

        {/* Retirement note */}
        {showRetirementNote && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
              <span>
                Buying health insurance after 60 attracts significantly higher premiums,
                waiting periods for PEDs, and loading. If you haven't secured personal
                cover yet, <strong>act before 60</strong>.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Card 2: Coverage Breakdown ── */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
        <h3 className="text-[#020288] text-sm font-semibold mb-3 border-b pb-2">
          Coverage Breakdown
        </h3>
        <div className="space-y-0">
          <Row label="Recommended Cover (2026)" value={`₹${fmt(recommendedCover)}`} />
          <Row label="Ideal Cover (5-yr inflation-adjusted)" value={`₹${fmt(idealCover)}`} valueClass="text-[#2C178C]" />
          <Row label="Your Effective Personal Cover" value={`₹${fmt(effectivePersonalCover)}`} />
          {employerCover > 0 && (
            <Row label="Employer Group Cover (non-portable)" value={`₹${fmt(employerCover)}`} valueClass="text-gray-400" />
          )}
          <div className="flex justify-between items-center text-xs py-2 mt-1 border-t border-gray-200">
            <span className="font-semibold text-[#2C178C]">Coverage Gap</span>
            <span
              className={`font-bold text-sm ${
                gapStatus === "adequate" ? "text-green-600" : "text-red-600"
              }`}
            >
              {gapStatus === "adequate"
                ? "✓ No Gap"
                : `₹${fmt(coverageGap)}`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Card 3: Super Top-Up Suggestion ── */}
      {superTopUpSuggestion && (
        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-[#020288] text-sm font-semibold mb-1 border-b pb-2">
            Super Top-Up Suggestion
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            A super top-up activates only after your deductible (= your base cover) is
            exhausted in a year — the most cost-efficient way to boost total cover.
          </p>
          <div className="space-y-0">
            <Row
              label="Suggested Super Top-Up Cover"
              value={`₹${fmt(superTopUpSuggestion.suggestedCover)}`}
              valueClass="text-[#2C178C]"
            />
            <Row
              label="Recommended Deductible"
              value={`₹${fmt(superTopUpSuggestion.deductible)}`}
            />
            <div className="flex justify-between items-center text-xs py-2 mt-1 border-t border-gray-200">
              <span className="font-semibold text-[#2C178C]">Est. Annual Premium</span>
              <span className="font-bold text-sm text-green-600">
                ~₹{fmt(superTopUpSuggestion.estimatedPremium)}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 italic">
            * Indicative ~0.4% of cover; actual varies by age, insurer, and deductible.
          </p>
        </div>
      )}

      {/* ── Card 4: Section 80D Tax Saving ── */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
        <h3 className="text-[#020288] text-sm font-semibold mb-3 border-b pb-2">
          Section 80D Tax Saving
        </h3>
        {taxRegime === "new" ? (
          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 text-center">
            80D deduction is <strong>not available</strong> under the New Tax Regime.
          </div>
        ) : (
          <div className="space-y-0">
            <Row
              label="Self/Family 80D Deduction"
              value={`₹${fmt(section80D.selfDeduction)}`}
            />
            <Row
              label="Parents 80D Deduction"
              value={`₹${fmt(section80D.parentsDeduction)}`}
            />
            <Row
              label="Total 80D Deduction"
              value={`₹${fmt(section80D.totalDeduction)}`}
              valueClass="text-[#2C178C]"
            />
            <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-3 flex justify-between items-center">
              <span className="text-xs font-medium text-green-700">
                Estimated Tax Saved (incl. 4% cess)
              </span>
              <span className="text-sm font-bold text-green-700">
                ₹{fmt(section80D.taxSaved)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
