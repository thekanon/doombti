import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from './firebaseClient'; // 올바른 경로로 수정하세요

// Firebase 앱이 아직 초기화되지 않았다면 초기화합니다.
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
