interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

export function ProgressBar({
  value,
  max,
  colorClass = "bg-indigo-500",
}: ProgressBarProps) {
  const pct = max === 0 ? 0 : Math.min(100, (value / max) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
