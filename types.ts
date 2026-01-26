export enum UserRole {
  ASPIRANT = 'ASPIRANT',
  ADMIN = 'ADMIN'
}

export enum QuestionDifficulty {
  EASY = 'Fácil',
  MEDIUM = 'Medio',
  HARD = 'Difícil'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  targetRole?: 'Asistencial' | 'Técnico' | 'Profesional';
  progress: number;
  avatarUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
  category: string;
  difficulty: QuestionDifficulty;
}

export interface QuizResult {
  id: string;
  date: string; // ISO string
  score: number;
  totalQuestions: number;
  passed: boolean;
  type: 'Simulacro' | 'Quiz Rápido';
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content: string; // HTML or Markdown
  isLocked: boolean;
  isCompleted: boolean;
  category: string;
  duration: string;
}

export interface StatData {
  date: string;
  score: number;
}