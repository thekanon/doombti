'use server';
import { cookies, headers } from 'next/headers';
import { admin } from '@/firebase/firebaseAdmin';
import { getUserInfo } from '@/app/lib/data';
export async function loadAuth() {
  try {
    const cookieStore = cookies();
    const cookietoken = cookieStore.get('token');

    if (!cookietoken || cookietoken?.value === '') {
      return;
    }
    const token = await admin.auth().verifyIdToken(cookietoken.value);
    const { uid, email } = token;
    const userInfo = await getUserInfo(uid);

    // console.log(userInfo[0]);

    return userInfo[0];
  } catch (error) {
    console.log('error', error);
  }
}
