// store.ts
import { create } from 'zustand';
import { Question } from '@/app/lib/definitions';

interface QuestionState {
  questionList: Question[];
  percentage: number;
  questionIndex: number;
  totalQuestions: number;
  setPercentage: (percentage: number) => void;
  setQuestionIndex: (index: number) => void;
  setTotalQuestions: (total: number) => void;
  setQuestionList: (questions: Question[]) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const useQuestionStore = create<QuestionState>()((set) => ({
  percentage: 0,
  questionIndex: 0,
  totalQuestions: 0,
  questionList: [],
  setPercentage: (percentage) => set({ percentage: percentage }),
  setQuestionIndex: (index) => set({ questionIndex: index }),
  setQuestionList: (questions: Question[]) => set({ questionList: questions }),
  setTotalQuestions: (total) => set({ totalQuestions: total }),
  handleNext: () =>
    set((state) => {
      const newQuestionIndex = state.questionIndex + 1;
      const newPercentage = (newQuestionIndex / state.totalQuestions) * 100;
      return {
        questionIndex: newQuestionIndex,
        percentage: newPercentage,
      };
    }),
  handleBack: () =>
    set((state) => {
      const newQuestionIndex =
        state.questionIndex - 1 > 0 ? state.questionIndex - 1 : 0;
      const newPercentage = (newQuestionIndex / state.totalQuestions) * 100;
      return {
        questionIndex: newQuestionIndex,
        percentage: newPercentage,
      };
    }),
  handleSubmit: () => set({ percentage: 100 }),
}));

export default useQuestionStore;
