import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  solvedQuestionList: string[];
  setUserData: (user: any) => void;
  setSolvedQuestionList: (solvedQuestionList: string[]) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: '',
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    solvedQuestionList: [],
    setSolvedQuestionList: (solvedQuestionList: string[]) =>
      set((state) => ({ solvedQuestionList })),
    setUserData: (user: any) => set((state) => ({ ...user })),
  })),
);

export default useUserStore;
