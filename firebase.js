import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: 'whatsapp-2-ba702.firebaseapp.com',
  projectId: 'whatsapp-2-ba702',
  storageBucket: 'whatsapp-2-ba702.appspot.com',
  messagingSenderId: '1096524788593',
  appId: '1:1096524788593:web:90ca9f3ba7d0dd82423cd0',
};

let app;

if (app == null) {
  app = initializeApp(firebaseConfig);
} else {
  app = app();
}

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
