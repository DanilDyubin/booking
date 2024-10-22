import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDqk3eus-ejkCFnhALvrr2sJKoiDEZ32io',
  authDomain: 'booking-1a4a5.firebaseapp.com',
  projectId: 'booking-1a4a5',
  storageBucket: 'booking-1a4a5.appspot.com',
  messagingSenderId: '711129949175',
  appId: '1:711129949175:web:0eb352d084bab29b1c84f2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
