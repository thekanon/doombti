'use server';
import { cookies } from 'next/headers'; // Removed 'headers' as it's not used in the provided code snippet
import { admin } from '@/firebase/firebaseAdmin';
import { getUserInfo } from '@/app/lib/data';
export async function loadAuth() {
  try {
    const cookieStore = cookies();
    const cookietoken = cookieStore.get('token');

    if (!cookietoken || cookietoken.value === '') {
      return;
    }

    const token = await admin.auth().verifyIdToken(cookietoken.value);
    const { uid } = token;

    const userInfo = await getUserInfo(uid);

    if (!userInfo || userInfo.length === 0) {
      return;
    }

    return userInfo[0];
  } catch (error) {
    console.error('Error loading authentication:', error);
    return null;
  }
}
