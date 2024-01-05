// store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Question } from '@/app/lib/definitions';
import { IAnswerProps } from '@/app/lib/definitions';

interface QuestionState {
  questionList: Question[];
  percentage: number;
  questionIndex: number;
  totalQuestions: number;
  selectedQuestion: number | null | Array<number>;
  answerList: IAnswerProps[];
  setPercentage: (percentage: number) => void;
  setQuestionIndex: (index: number) => void;
  setTotalQuestions: (total: number) => void;
  setQuestionList: (questions: Question[]) => void;
  setSelectedQuestion: (id: number) => void;
  setAnswer: (newAnswer: IAnswerProps) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

// 공통 기능을 처리하는 함수
const updateQuestionState = (
  state: QuestionState,
  newQuestionIndex: number,
) => {
  const newPercentage = (newQuestionIndex / state.totalQuestions) * 100;
  const answer = state.answerList;
  const options = state.questionList[newQuestionIndex]?.options;
  let selectedIndex = null;

  if (options !== undefined && answer[newQuestionIndex]) {
    selectedIndex = options.findIndex(
      (option) => option.id === answer[newQuestionIndex].id,
    );
  }

  // save session storage
  sessionStorage.setItem('answerList', JSON.stringify(answer));

  return {
    questionIndex: newQuestionIndex,
    percentage: newPercentage,
    selectedQuestion: selectedIndex,
  };
};

const useQuestionStore = create<QuestionState>()(
  devtools((set) => ({
    percentage: 0,
    questionIndex: 0,
    totalQuestions: 0,
    questionList: [],
    selectedQuestion: null,
    answerList: [],
    setPercentage: (percentage) => set({ percentage: percentage }),
    setQuestionIndex: (index) => set({ questionIndex: index }),
    setQuestionList: (questions: Question[]) =>
      set({ questionList: questions }),
    setTotalQuestions: (total) => set({ totalQuestions: total }),
    setAnswer: (newAnswer: IAnswerProps) =>
      set((state) => {
        let newAnswerList = [...state.answerList];

        // 필요한 경우 배열 확장
        if (state.questionIndex >= newAnswerList.length) {
          newAnswerList = Array.from(
            { length: state.questionIndex + 1 },
            (v, i) => newAnswerList[i] || null,
          );
        }

        // 새 답변으로 업데이트
        newAnswerList[state.questionIndex] = newAnswer;

        return {
          answerList: newAnswerList,
        };
      }),

    handleNext: () =>
      set((state) => {
        const newQuestionIndex = Math.min(
          state.questionIndex + 1,
          state.totalQuestions - 1,
        );
        return updateQuestionState(state, newQuestionIndex);
      }),

    handleBack: () =>
      set((state) => {
        const newQuestionIndex = Math.max(state.questionIndex - 1, 0);
        return updateQuestionState(state, newQuestionIndex);
      }),

    handleSubmit: () =>
      set((state) => {
        const newQuestionIndex = Math.min(
          state.questionIndex + 1,
          state.totalQuestions - 1,
        );
        return {
          ...updateQuestionState(state, newQuestionIndex),
          percentage: 100,
        };
      }),
    setSelectedQuestion: (id) => set({ selectedQuestion: id }),
  })),
);

export default useQuestionStore;
