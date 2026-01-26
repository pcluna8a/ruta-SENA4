import { User, Question, QuizResult, LearningModule } from '../types';
import { MOCK_USERS, MOCK_QUESTIONS, MOCK_MODULES, MOCK_RESULTS } from '../data/mockData';

const DELAY = 500;

export const api = {
  login: async (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, DELAY);
    });
  },

  getCurrentUser: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      const stored = localStorage.getItem('currentUser');
      resolve(stored ? JSON.parse(stored) : null);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.removeItem('currentUser');
      resolve();
    });
  },

  getModules: async (): Promise<LearningModule[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_MODULES), DELAY);
    });
  },

  getQuestions: async (limit: number = 10): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Shuffle and slice
        const shuffled = [...MOCK_QUESTIONS].sort(() => 0.5 - Math.random());
        resolve(shuffled.slice(0, limit));
      }, DELAY);
    });
  },

  getHistory: async (): Promise<QuizResult[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESULTS), DELAY);
    });
  },
  
  saveResult: async (result: QuizResult): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, we would push to DB. Here we just log.
            console.log("Result saved:", result);
            resolve();
        }, DELAY)
    })
  }
};