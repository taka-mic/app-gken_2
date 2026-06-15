import { Question } from "@/types";
import { aiQuestions } from "./questions-ai";
import { dlQuestions } from "./questions-dl";
import { mathQuestions } from "./questions-math";
import { mlQuestions } from "./questions-ml";
import { lawQuestions } from "./questions-law";

export const questions: Question[] = [
  ...aiQuestions,
  ...dlQuestions,
  ...mathQuestions,
  ...mlQuestions,
  ...lawQuestions,
];

export const questionsByCategory = questions.reduce(
  (acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  },
  {} as Record<string, Question[]>
);
