"use client";

import { clsx } from "clsx";
import { CheckCircle, XCircle } from "lucide-react";

type ChoiceState = "idle" | "selected-correct" | "selected-wrong" | "correct-unselected";

interface ChoiceButtonProps {
  label: string;
  index: number;
  state: ChoiceState;
  disabled: boolean;
  onClick: () => void;
}

const LABELS = ["A", "B", "C", "D"];

export function ChoiceButton({ label, index, state, disabled, onClick }: ChoiceButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all duration-200",
        state === "idle" &&
          "border-gray-300 [background-color:#ffffff] [color:#111111] hover:border-indigo-500 hover:[background-color:#eef2ff] hover:[color:#1e1b4b]",
        state === "selected-correct" &&
          "border-green-500 [background-color:#f0fdf4] [color:#14532d]",
        state === "selected-wrong" &&
          "border-red-400 [background-color:#fff1f2] [color:#7f1d1d]",
        state === "correct-unselected" &&
          "border-green-400 [background-color:#f0fdf4] [color:#166534]",
        disabled && state === "idle" && "opacity-70 cursor-not-allowed"
      )}
    >
      <span
        className={clsx(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          state === "idle" && "[background-color:#e0e7ff] [color:#3730a3]",
          state === "selected-correct" && "bg-green-500 text-white",
          state === "selected-wrong" && "bg-red-400 text-white",
          state === "correct-unselected" && "bg-green-400 text-white"
        )}
      >
        {LABELS[index]}
      </span>
      <span className="flex-1 leading-snug">{label}</span>
      {state === "selected-correct" && <CheckCircle size={18} className="shrink-0 text-green-500" />}
      {state === "selected-wrong" && <XCircle size={18} className="shrink-0 text-red-400" />}
      {state === "correct-unselected" && <CheckCircle size={18} className="shrink-0 text-green-400" />}
    </button>
  );
}
