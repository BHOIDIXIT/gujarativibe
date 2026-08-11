import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseAppletConfig from '../../firebase-applet-config.json';

interface FirebaseAppletConfig {
  projectId?: string;
  appId?: string;
  apiKey?: string;
  authDomain?: string;
  firestoreDatabaseId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
  oAuthClientId?: string;
  recaptchaSiteKey?: string;
}

const rawConfig: FirebaseAppletConfig = firebaseAppletConfig || {};

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || rawConfig.projectId || 'demo-app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawConfig.apiKey || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawConfig.authDomain || `${projectId}.firebaseapp.com`,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || `https://${projectId}-default-rtdb.firebaseio.com`,
  projectId: projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawConfig.storageBucket || `${projectId}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawConfig.messagingSenderId || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawConfig.appId || '1:1234567890:web:1234567890',
};

let app: FirebaseApp | null = null;
let db: Database | null = null;
let firestore: Firestore | null = null;
let auth: Auth | null = null;

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  db = getDatabase(app);
  firestore = rawConfig.firestoreDatabaseId
    ? getFirestore(app, rawConfig.firestoreDatabaseId)
    : getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase failed to initialize:', error);
}

export { app, db, firestore, auth };
