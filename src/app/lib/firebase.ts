// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Função para verificar se estamos no lado do cliente
const isClient = typeof window !== 'undefined';

// Função para obter configuração do Firebase de forma segura
const getFirebaseConfig = () => {
  // Verifica se as variáveis de ambiente estão disponíveis
  if (!isClient && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    // Durante o build no servidor, retorna configuração vazia
    return {
      apiKey: "dummy-key",
      authDomain: "dummy-domain",
      projectId: "dummy-project",
      storageBucket: "dummy-bucket",
      messagingSenderId: "dummy-sender",
      appId: "dummy-app",
    };
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
};

// Inicializa o Firebase apenas no lado do cliente ou quando as variáveis estão disponíveis
let app = null;
let auth = null;
let db = null;

if (isClient || process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  const firebaseConfig = getFirebaseConfig();

  // Inicializa o Firebase apenas uma vez
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  // Inicializa Authentication com persistência local apenas no cliente
  if (isClient) {
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Erro ao configurar persistência:", error);
    });
  } else {
    auth = getAuth(app);
  }

  db = getFirestore(app);
}

export { app, auth, db };