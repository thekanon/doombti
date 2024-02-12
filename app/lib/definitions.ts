export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export interface IIConQuestion {
  title: string;
  description: string;
  questions: QuestionOption[];
  onClick: (id: number) => void;
  selectedQuestion: number | null | Array<number>;
}

export type QuestionOption = {
  id: string;
  question_id?: string; //client에서 추가
  category?: string; //client에서 추가
  text: string;
};
export type Question = {
  question_id: string;
  title: string;
  category: string;
  createdat: string;
  icon: string;
  answerid: string;
  answer_description?: string;
  survey_id?: string;
  options: QuestionOption[];
  multiflag: boolean;
};

export type IQuestionContainerProps = {
  questions: Question[];
};

export interface IAnswerProps {
  id: string;
  title: string;
  text: string;
  isCorrect: boolean;
  survey_id?: string;
  answerText: string;
  answerId: string;
  answerDescription?: string;
}

export interface IAnswerListProps {
  answers: IAnswerProps[];
}

export interface IConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

/*
  uid: '55a638f1-fc3c-4920-be17-7d90dfb46a23',
  fb_uid: 'S1x8u81VZiXNgOHpIosNF0PqDpD3',
  name: '여의도웹 개발자',
  email: 'dlengjs123@gmail.com',
  job_description: '프론트엔드',
  continuous_goal_achievement: false,
  set_goal: 5,
  liked_technology: '트렌디한 프론트엔드 기술에 관심이 많아요.',
  careeryearnumber: '3년 이상 5년 미만',
  mbti: 'INTJ',
  liked_skills: [ 'jQuery', 'Webpack', 'React' ]
*/
export interface User {
  uid?: string; // UUID
  fb_uid: string; // Firebase UID
  name: string; // 이름
  email: string; // 이메일
  job_description: string; // 직무
  continuous_goal_achievement: boolean; // 지속적인 목표 달성
  set_goal: number; // 목표 설정
  liked_technology: string; // 선호 기술
  careeryearnumber: string; // 경력
  mbti: string; // MBTI
  liked_skills: string[]; // 선호 스킬
}
