"use client";

import { useState, useCallback } from "react";
import { useQuiz } from "@/context/QuizContext";
import { Timer } from "./Timer";
import { ChoiceButton } from "./ChoiceButton";
import { Badge } from "./ui/Badge";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types";
import { clsx } from "clsx";
import { ChevronRight, LayoutDashboard, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuizCard() {
  const { session, currentQuestion, currentAnswer, submitAnswer, nextQuestion, endSession, isSessionComplete } = useQuiz();
  const [elapsed, setElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const router = useRouter();

  const handleSelect = useCallback(
    (idx: number) => {
      if (currentAnswer) return;
      setTimerRunning(false);
      submitAnswer(idx, elapsed);
    },
    [currentAnswer, elapsed, submitAnswer]
  );

  const handleTimeUp = useCallback(() => {
    if (currentAnswer) return;
    setTimerRunning(false);
    submitAnswer(-1, 30);
  }, [currentAnswer, submitAnswer]);

  const handleNext = useCallback(() => {
    setElapsed(0);
    setTimerRunning(true);
    nextQuestion();
  }, [nextQuestion]);

  const handleDashboard = useCallback(() => {
    endSession();
    router.push("/");
  }, [endSession, router]);

  if (!session || !currentQuestion || isSessionComplete) {
    const correct = session?.answers.filter((a) => a.isCorrect).length ?? 0;
    const total = session?.answers.length ?? 0;
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="text-5xl font-bold text-indigo-600">{correct}/{total}</div>
        <p className="text-gray-600 text-lg">セッション終了！お疲れさまでした。</p>
        <button
          onClick={handleDashboard}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          <LayoutDashboard size={18} />
          ダッシュボードに戻る
        </button>
      </div>
    );
  }

  const qIdx = session.currentIndex;
  const total = session.questions.length;
  const answered = !!currentAnswer;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge className={CATEGORY_COLORS[currentQuestion.category]}>
          {CATEGORY_LABELS[currentQuestion.category]}
        </Badge>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-mono">
            {qIdx + 1} / {total}
          </span>
          <Timer
            running={timerRunning && !answered}
            onTimeUp={handleTimeUp}
            onTick={setElapsed}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((qIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-5">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {currentQuestion.text}
        </p>
      </div>

      {/* Choices */}
      <div className="flex flex-col gap-2.5">
        {currentQuestion.choices.map((choice, idx) => {
          let state: "idle" | "selected-correct" | "selected-wrong" | "correct-unselected" = "idle";
          if (answered) {
            if (idx === currentQuestion.correctIndex) {
              state = currentAnswer.selectedIndex === idx ? "selected-correct" : "correct-unselected";
            } else if (idx === currentAnswer.selectedIndex) {
              state = "selected-wrong";
            }
          }
          return (
            <ChoiceButton
              key={idx}
              label={choice}
              index={idx}
              state={state}
              disabled={answered}
              onClick={() => handleSelect(idx)}
            />
          );
        })}
      </div>

      {/* Timeout notice */}
      {answered && currentAnswer.selectedIndex === -1 && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-2.5 text-sm text-yellow-800">
          時間切れです。
        </div>
      )}

      {/* Explanation */}
      {answered && (
        <div
          className={clsx(
            "rounded-2xl border p-4 text-sm leading-relaxed",
            currentAnswer.isCorrect
              ? "border-green-200 bg-green-50 text-green-900"
              : "border-red-200 bg-red-50 text-red-900"
          )}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1.5">
            <Lightbulb size={15} />
            {currentAnswer.isCorrect ? "正解！" : "不正解"}
          </div>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Action buttons */}
      {answered && (
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleDashboard}
            className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard size={15} />
            ダッシュボード
          </button>
          <button
            onClick={handleNext}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            次の問題へ
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
