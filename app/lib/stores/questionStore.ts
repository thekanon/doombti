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
  setSelectedQuestion: (id: number | null | Array<number>) => void;
  setAnswer: (newAnswer: IAnswerProps) => void;
  setAnswers: (newAnswers: IAnswerProps[]) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
  clearAnswer: () => void;
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

  if (options !== undefined) {
    // 선택된 답변이 있는 경우를 survey_id로 찾아서 user가 답변한 answer를 불러옴
    // 1. questionList에서 survey_id를 찾아서 index를 찾음
    const userAnswer = answer.find(
      (answer) =>
        answer.survey_id === state.questionList[newQuestionIndex].survey_id,
    );
    if (userAnswer !== undefined) {
      // 2. options에서
      selectedIndex = options.findIndex(
        (option) => option.id === userAnswer.id,
      );
    }
  }

  sessionStorage // save session storage
    .setItem('answerList', JSON.stringify(answer));

  return {
    questionIndex: newQuestionIndex,
    percentage: newPercentage,
    selectedQuestion: selectedIndex,
  };
};

const useQuestionStore = create<QuestionState>()(
  devtools(
    (set) => ({
      percentage: 0,
      questionIndex: 0,
      totalQuestions: 0,
      questionList: [],
      selectedQuestion: null,
      answerList: [],
      setPercentage: (percentage) =>
        set({ percentage: percentage }, false, 'setPercentage'),
      setQuestionIndex: (index) =>
        set({ questionIndex: index }, false, 'setQuestionIndex'),
      setQuestionList: (questions: Question[]) =>
        set({ questionList: questions }, false, 'setQuestionList'),
      setTotalQuestions: (total) =>
        set({ totalQuestions: total }, false, 'setTotalQuestions'),
      setAnswer: (newAnswer: IAnswerProps) =>
        set(
          (state) => {
            let newAnswerList = [...state.answerList];

            // question이면
            if (newAnswer.survey_id === undefined) {
              console.log("question's answer", newAnswerList);
              // 필요한 경우 배열 확장
              if (state.questionIndex >= newAnswerList.length) {
                newAnswerList = Array.from(
                  { length: state.questionIndex + 1 },
                  (v, i) => newAnswerList[i] || null,
                );
              }

              // 새 답변으로 업데이트
              newAnswerList[state.questionIndex] = newAnswer;
              console.log('newAnswerList1', newAnswerList);
            }
            // survey 이면
            else {
              // ID가 일치하는 답변을 찾아서 업데이트
              const existingAnswerIndex = newAnswerList.findIndex(
                (answer) => answer && answer.survey_id === newAnswer.survey_id,
              );

              console.log('existingAnswerIndex', existingAnswerIndex);

              if (existingAnswerIndex !== -1) {
                // ID가 일치하는 항목을 새 답변으로 교체
                newAnswerList[existingAnswerIndex] = newAnswer;
              } else {
                // 일치하는 항목이 없는 경우 새 항목을 리스트에 추가
                newAnswerList.push(newAnswer);
              }
            }
            console.log('newAnswerList2', newAnswerList);
            return {
              answerList: newAnswerList,
            };
          },
          false,
          'setAnswer',
        ),

      setAnswers: (newAnswers: IAnswerProps[]) =>
        set(
          (state) => {
            let newAnswerList = [...state.answerList];

            // 필요한 경우 배열 확장
            if (state.questionIndex >= newAnswerList.length) {
              newAnswerList = Array.from(
                { length: state.questionIndex + 1 },
                (v, i) => newAnswerList[i] || null,
              );
            }

            // 새 답변으로 업데이트
            newAnswerList = newAnswers;

            return {
              answerList: newAnswerList,
            };
          },
          false,
          'setAnswers',
        ),
      clearAnswer: () =>
        set(
          (state) => {
            return {
              answerList: [],
            };
          },
          false,
          'clearAnswer',
        ),

      handleNext: () =>
        set(
          (state) => {
            const newQuestionIndex = Math.min(
              state.questionIndex + 1,
              state.totalQuestions - 1,
            );
            return updateQuestionState(state, newQuestionIndex);
          },
          false,
          'handleNext',
        ),

      handleBack: () =>
        set(
          (state) => {
            const newQuestionIndex = Math.max(state.questionIndex - 1, 0);
            return updateQuestionState(state, newQuestionIndex);
          },
          false,
          'handleBack',
        ),

      handleSubmit: () =>
        set(
          (state) => {
            const newQuestionIndex = Math.min(
              state.questionIndex + 1,
              state.totalQuestions - 1,
            );
            return {
              ...updateQuestionState(state, newQuestionIndex),
              percentage: 100,
            };
          },
          false,
          'handleSubmit',
        ),
      setSelectedQuestion: (id) =>
        set({ selectedQuestion: id }, false, 'setSelectedQuestion'),
    }),
    {
      name: 'QuestionStore',
    },
  ),
);

export default useQuestionStore;
