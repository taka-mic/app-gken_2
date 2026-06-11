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
          "border-gray-300 bg-white !text-gray-900 hover:border-indigo-500 hover:bg-indigo-50 hover:!text-indigo-900",
        state === "selected-correct" &&
          "border-green-500 bg-green-50 !text-green-900",
        state === "selected-wrong" &&
          "border-red-400 bg-red-50 !text-red-900",
        state === "correct-unselected" &&
          "border-green-400 bg-green-50 !text-green-800",
        disabled && state === "idle" && "opacity-70 cursor-not-allowed"
      )}
    >
      <span
        className={clsx(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          state === "idle" && "bg-indigo-100 text-indigo-700",
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
