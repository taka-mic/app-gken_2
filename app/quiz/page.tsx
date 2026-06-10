"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { QuizCard } from "@/components/QuizCard";

export default function QuizPage() {
  const { session } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  if (!session) return null;

  return <QuizCard />;
}
