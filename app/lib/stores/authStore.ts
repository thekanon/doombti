import create from 'zustand';
import { devtools } from 'zustand/middleware';
// firebase logout
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

interface UserState {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  solvedQuestionList: string[];
  setUserData: (user: any) => void;
  setSolvedQuestionList: (solvedQuestionList: string[]) => void;
  logout: () => void;
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
    logout: () =>
      set((state) => {
        const auth = getAuth();
        signOut(auth);
        return {
          displayName: '',
          email: '',
          photoURL: '',
          uid: '',
          solvedQuestionList: [],
        };
      }),
  })),
);

export default useUserStore;
