import { fetchUserData } from '@/app/api/users';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
// firebase logout
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

interface UserState {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  set_goal: number;
  name: string;
  job_description: string;
  liked_technology: string;
  careeryearnumber: string;
  mbti: string;
  fb_uid: string;

  solvedQuestionList: string[];
  setUserData: (user: any) => void;
  setSolvedQuestionList: (solvedQuestionList: string[]) => void;
  logout: () => void;
  me: () => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    uid: '',
    fb_uid: '',
    displayName: '',
    name: '',
    job_id: '',
    set_goal: 0,
    job_description: '',
    liked_technology: '',
    careeryearnumber: '',
    mbti: '',
    email: '',
    photoURL: '',
    solvedQuestionList: [],
    setSolvedQuestionList: (solvedQuestionList: string[]) =>
      set((state) => ({ solvedQuestionList })),
    setUserData: (user: any) => set((state) => ({ ...user })),
    logout: () =>
      set((state) => {
        const auth = getAuth();
        signOut(auth);
        return {
          uid: '',
          fb_uid: '',
          displayName: '',
          name: '',
          job_id: '',
          set_goal: 0,
          job_description: '',
          liked_technology: '',
          careeryearnumber: '',
          mbti: '',
          email: '',
          photoURL: '',
          solvedQuestionList: [],
        };
      }),
    me: async () => {
      console.log('me');
      if (!getAuth().currentUser) return;
      const user = getAuth().currentUser;
      console.log(user);

      const result = await fetchUserData(user?.uid);
      const userData = result[0];
      set((state) => ({ ...userData }));
    },
  })),
);

export default useUserStore;
