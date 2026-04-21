import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCrm-dyIq-PD1KGC3zuf4x1SrviJCfw34U",
  authDomain: "mobileprogramming-32f6e.firebaseapp.com",
  databaseURL: "https://mobileprogramming-32f6e-default-rtdb.firebaseio.com",
  projectId: "mobileprogramming-32f6e",
  storageBucket: "mobileprogramming-32f6e.firebasestorage.app",
  messagingSenderId: "901517173209",
  appId: "1:901517173209:web:f93a62c4470366747239c8",
};

// Prevent re-initializing Firebase on hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export default app;