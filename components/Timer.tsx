"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { clsx } from "clsx";

const TIME_LIMIT = 30;

interface TimerProps {
  running: boolean;
  onTimeUp: () => void;
  onTick: (elapsed: number) => void;
}

export function Timer({ running, onTimeUp, onTick }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        onTick(next);
        if (next >= TIME_LIMIT) {
          onTimeUp();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onTimeUp, onTick]);

  const remaining = TIME_LIMIT - elapsed;
  const pct = (elapsed / TIME_LIMIT) * 100;
  const isUrgent = remaining <= 10;

  return (
    <div className="flex items-center gap-2">
      <Clock
        size={16}
        className={clsx(isUrgent ? "text-red-500 animate-pulse" : "text-gray-400")}
      />
      <div className="flex items-center gap-2 w-40">
        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={clsx(
              "h-2 rounded-full transition-all duration-1000",
              isUrgent ? "bg-red-500" : pct > 50 ? "bg-yellow-400" : "bg-green-500"
            )}
            style={{ width: `${100 - pct}%` }}
          />
        </div>
        <span
          className={clsx(
            "text-sm font-mono font-bold w-6 text-right",
            isUrgent ? "text-red-500" : "text-gray-600"
          )}
        >
          {remaining}
        </span>
      </div>
    </div>
  );
}
