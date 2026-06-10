"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Question, AnswerRecord, QuizSession } from "@/types";
import { questions as allQuestions } from "@/data/questions";

interface Stats {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
}

interface QuizContextValue {
  session: QuizSession | null;
  stats: Stats;
  startSession: (categoryFilter?: string) => void;
  submitAnswer: (selectedIndex: number, timeSpent: number) => void;
  nextQuestion: () => void;
  endSession: () => void;
  currentQuestion: Question | null;
  currentAnswer: AnswerRecord | null;
  isSessionComplete: boolean;
}

const QuizContext = createContext<QuizContextValue | null>(null);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function calcStats(answers: AnswerRecord[]): Stats {
  const totalAnswered = answers.length;
  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  return {
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100),
  };
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [allAnswers, setAllAnswers] = useState<AnswerRecord[]>([]);

  const startSession = useCallback((categoryFilter?: string) => {
    const pool =
      categoryFilter
        ? allQuestions.filter((q) => q.category === categoryFilter)
        : allQuestions;
    const questions = shuffle(pool);
    setSession({
      questions,
      currentIndex: 0,
      answers: [],
      startedAt: Date.now(),
    });
  }, []);

  const submitAnswer = useCallback(
    (selectedIndex: number, timeSpent: number) => {
      if (!session) return;
      const question = session.questions[session.currentIndex];
      const record: AnswerRecord = {
        questionId: question.id,
        selectedIndex,
        isCorrect: selectedIndex === question.correctIndex,
        timeSpent,
      };
      const updatedAnswers = [...session.answers, record];
      setSession((s) => s && { ...s, answers: updatedAnswers });
      setAllAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== question.id);
        return [...filtered, record];
      });
    },
    [session]
  );

  const nextQuestion = useCallback(() => {
    setSession((s) => s && { ...s, currentIndex: s.currentIndex + 1 });
  }, []);

  const endSession = useCallback(() => {
    setSession(null);
  }, []);

  const currentQuestion = session
    ? session.questions[session.currentIndex] ?? null
    : null;

  const currentAnswer =
    session
      ? session.answers.find(
          (a) => a.questionId === session.questions[session.currentIndex]?.id
        ) ?? null
      : null;

  const isSessionComplete = session
    ? session.currentIndex >= session.questions.length
    : false;

  const stats = calcStats(allAnswers);

  return (
    <QuizContext.Provider
      value={{
        session,
        stats,
        startSession,
        submitAnswer,
        nextQuestion,
        endSession,
        currentQuestion,
        currentAnswer,
        isSessionComplete,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}
