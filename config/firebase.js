// This config is safe to keep in source control — Firebase's web config
// (apiKey, projectId, etc.) is not a secret. Access is controlled by the
// project's Firestore security rules, not by hiding this object.
// This points at a shared SoloDevMeet PRACTICE project, separate from any
// real app's production data — everything here lives under the top-level
// "practice" collection.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCASrYVdUS328TdEYfAdsbw-s7hJY3c-10',
  authDomain: 'chat-app-72058.firebaseapp.com',
  projectId: 'chat-app-72058',
  storageBucket: 'chat-app-72058.firebasestorage.app',
  messagingSenderId: '354665074600',
  appId: '1:354665074600:web:9eb152856cb6dd07be179d',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
