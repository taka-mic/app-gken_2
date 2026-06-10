"use client";

import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import { CATEGORY_LABELS, CATEGORY_COLORS, Category } from "@/types";
import { questionsByCategory } from "@/data/questions";
import { Badge } from "./ui/Badge";
import { clsx } from "clsx";
import { ArrowLeft, PlayCircle } from "lucide-react";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export function CategorySelector() {
  const { startSession } = useQuiz();
  const router = useRouter();

  const handleSelect = (cat: Category) => {
    startSession(cat);
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
                <Badge className={CATEGORY_COLORS[cat]}>{count}問</Badge>
              </div>
              <PlayCircle size={22} className="text-indigo-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
