export type Category =
  | "ai-basics"
  | "machine-learning"
  | "deep-learning"
  | "social-implementation"
  | "math-statistics";

export const CATEGORY_LABELS: Record<Category, string> = {
  "ai-basics": "AIの定義・歴史",
  "machine-learning": "機械学習",
  "deep-learning": "ディープラーニング",
  "social-implementation": "社会実装・法律・倫理",
  "math-statistics": "数学・統計",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  "ai-basics": "bg-blue-100 text-blue-800 border-blue-200",
  "machine-learning": "bg-green-100 text-green-800 border-green-200",
  "deep-learning": "bg-purple-100 text-purple-800 border-purple-200",
  "social-implementation": "bg-orange-100 text-orange-800 border-orange-200",
  "math-statistics": "bg-rose-100 text-rose-800 border-rose-200",
};

export interface Question {
  id: string;
  category: Category;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizSession {
  questions: Question[];
  currentIndex: number;
  answers: AnswerRecord[];
  startedAt: number;
}
