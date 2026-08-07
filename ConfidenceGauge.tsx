import { confidenceTier } from "@/lib/utils";

const TIER_COLOR = {
  high: "#1B998B",
  medium: "#B45309",
  low: "#B91C1C",
};

export function ConfidenceGauge({ score }: { score: number }) {
  const tier = confidenceTier(score);
  const color = TIER_COLOR[tier];
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-[76px] w-[76px]">
        <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
          <circle cx="38" cy="38" r={radius} fill="none" stroke="#E1E7EB" strokeWidth="7" />
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-semibold text-clinical-ink">{score}%</span>
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wide text-clinical-muted">
        Evidence
      </span>
    </div>
  );
}
