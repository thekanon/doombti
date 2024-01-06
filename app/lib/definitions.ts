// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

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
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
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

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
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
  question_id: string;
  category?: string;
  text: string;
};
export type Question = {
  question_id: string;
  title: string;
  category: string;
  createdat: string;
  icon: string;
  answerid: string;
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
  answerText: string;
  answerId: string;
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

export interface User {
  uid?: string; // UUID
  job_id: string; // UUID, 외래 키 참조
  set_goal: number; // 숫자로 표현된 목표
  name: string;
  email: string;
  job_description: string;
  continuous_goal_achievement: boolean; // 목표 달성을 연속으로 했는지 여부
  liked_technology: string;
  careeryearnumber: string;
  mbti: string;
}
