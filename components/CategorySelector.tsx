"use client";

import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import { CATEGORY_LABELS, CATEGORY_COLORS, Category } from "@/types";
import { questionsByCategory } from "@/data/questions";
import { Badge } from "./ui/Badge";
import { clsx } from "clsx";
import { ArrowLeft, PlayCircle } from "lucide-react";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const LIMITS = [
  { label: "20問", value: 20 },
  { label: "50問", value: 50 },
  { label: "全問", value: 0 },
];

export function CategorySelector() {
  const { startSession } = useQuiz();
  const router = useRouter();
  const [limit, setLimit] = useState(20);

  const handleSelect = (cat: Category) => {
    startSession(cat, limit === 0 ? undefined : limit);
    router.push("/quiz");
  };

  const handleSelectAll = () => {
    startSession(undefined, limit === 0 ? undefined : limit);
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors w-fit"
      >
        <ArrowLeft size={15} />
        ダッシュボードに戻る
      </button>

      <h1 className="text-lg font-bold text-gray-800">カテゴリを選択</h1>
      <p className="text-sm text-gray-500 -mt-2">
        G検定シラバスに準拠したカテゴリから学習できます
      </p>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-gray-500">1セットの問題数</p>
        <div className="flex gap-2">
          {LIMITS.map((l) => (
            <button
              key={l.value}
              onClick={() => setLimit(l.value)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all",
                limit === l.value
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSelectAll}
        className="flex items-center justify-between rounded-2xl border-2 bg-indigo-50 px-5 py-4 text-left transition-all hover:shadow-md border-indigo-200 hover:border-indigo-400"
      >
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-indigo-800 text-sm">全カテゴリまとめて</span>
          <Badge className="bg-indigo-100 text-indigo-700">
            {limit === 0 ? "全問" : `ランダム${limit}問`}
          </Badge>
        </div>
        <PlayCircle size={22} className="text-indigo-500 shrink-0" />
      </button>

      <div className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => {
          const count = questionsByCategory[cat]?.length ?? 0;
          return (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={clsx(
                "flex items-center justify-between rounded-2xl border-2 bg-white px-5 py-4 text-left transition-all hover:shadow-md",
                "border-gray-200 hover:border-indigo-300"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800 text-sm">
                  {CATEGORY_LABELS[cat]}
                </span>
                <Badge className={CATEGORY_COLORS[cat]}>
                  {limit === 0 ? `全${count}問` : `ランダム${Math.min(limit, count)}問 / ${count}問`}
                </Badge>
              </div>
              <PlayCircle size={22} className="text-indigo-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
