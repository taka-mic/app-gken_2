"use client";

import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import { ProgressBar } from "./ui/ProgressBar";
import { questions } from "@/data/questions";
import { Brain, Target, PlayCircle, BookOpen } from "lucide-react";

export function Dashboard() {
  const { stats, startSession } = useQuiz();
  const router = useRouter();

  const handleStart = () => {
    startSession();
    router.push("/quiz");
  };

  const total = questions.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Brain size={22} />
          <span className="font-bold text-lg">G検定 対策アプリ</span>
        </div>
        <p className="text-indigo-100 text-sm">JDLA G検定シラバス準拠の四択一問一答</p>
        <button
          onClick={handleStart}
          className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors shadow"
        >
          <PlayCircle size={18} />
          学習を始める（全問ランダム）
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Target size={20} className="text-indigo-500" />}
          label="総合正解率"
          value={`${stats.accuracy}%`}
          sub={`${stats.totalCorrect} / ${stats.totalAnswered} 問正解`}
        />
        <StatCard
          icon={<BookOpen size={20} className="text-purple-500" />}
          label="回答済み"
          value={`${stats.totalAnswered}`}
          sub={`全 ${total} 問`}
        />
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-3">
        <h2 className="font-semibold text-gray-700 text-sm">学習進捗</h2>
        <div className="flex justify-between text-xs text-gray-500 mb-0.5">
          <span>回答済み</span>
          <span>{stats.totalAnswered} / {total}</span>
        </div>
        <ProgressBar value={stats.totalAnswered} max={total} colorClass="bg-indigo-500" />

        <div className="flex justify-between text-xs text-gray-500 mb-0.5 mt-2">
          <span>正解率</span>
          <span>{stats.accuracy}%</span>
        </div>
        <ProgressBar
          value={stats.accuracy}
          max={100}
          colorClass={
            stats.accuracy >= 70
              ? "bg-green-500"
              : stats.accuracy >= 40
              ? "bg-yellow-400"
              : "bg-red-400"
          }
        />
      </div>

      {/* Category quiz links */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-700 text-sm mb-3">カテゴリ別で学ぶ</h2>
        <button
          onClick={() => router.push("/categories")}
          className="w-full rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          カテゴリを選択する →
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <span className="text-xs text-gray-400">{sub}</span>
    </div>
  );
}
